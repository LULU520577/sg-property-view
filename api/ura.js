/**
 * api/ura.js - URA Space API service for private residential caveats and rental transactions
 * Accepts postal_code or project_name parameter
 */
import { calculatePsf, formatFloorAreaSqft, calculateSummaryMetrics } from './utils/psf.js';

let cachedToken = null;
let tokenExpiry = 0;

export default async function handler(req, res) {
  // Set required Cache-Control headers
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
  }

  // Pre-flight Check: verify URA_ACCESS_KEY
  const uraAccessKey = process.env.URA_ACCESS_KEY;
  if (!uraAccessKey || !uraAccessKey.trim()) {
    return res.status(503).json({
      error: 'URA_ACCESS_KEY is missing. Set it in Vercel/Secrets and redeploy.'
    });
  }

  const queryParams = req.method === 'GET' ? req.query : req.body || {};
  const postalCode = (queryParams.postal_code || queryParams.postal || '').toString().trim();
  const projectName = (queryParams.project_name || queryParams.project || '').toString().trim();
  const streetName = (queryParams.street || '').toString().trim();

  try {
    // Acquire or reuse valid daily URA Space token
    let token = cachedToken;
    const now = Date.now();
    if (!token || now > tokenExpiry) {
      const tokenUrl = 'https://www.ura.gov.sg/uraDataService/insertNewToken.action';
      const tokenRes = await fetch(tokenUrl, {
        method: 'GET',
        headers: {
          AccessKey: uraAccessKey,
          'User-Agent': 'aistudio-build'
        }
      });

      // Post-flight Check on token endpoint
      if (!tokenRes.ok) {
        return res.status(200).json({
          status: 'error',
          upstreamStatus: tokenRes.status,
          error: `URA token authentication returned HTTP ${tokenRes.status}`,
          ura_transactions: [],
          metrics: calculateSummaryMetrics([])
        });
      }

      const tokenData = await tokenRes.json();
      if (tokenData && tokenData.status === 'Success' && tokenData.result) {
        token = tokenData.result;
        cachedToken = token;
        tokenExpiry = now + 12 * 60 * 60 * 1000; // URA tokens are typically valid for 24h
      } else {
        return res.status(200).json({
          status: 'error',
          upstreamStatus: tokenRes.status,
          error: tokenData.message || 'Failed to obtain valid URA session token.',
          ura_transactions: [],
          metrics: calculateSummaryMetrics([])
        });
      }
    }

    // Call URA Space service for private residential caveats
    const uraApiUrl = 'https://www.ura.gov.sg/uraDataService/invokeUraDS?service=PMI_Resi_Transaction';
    const upstreamRes = await fetch(uraApiUrl, {
      method: 'GET',
      headers: {
        AccessKey: uraAccessKey,
        Token: token,
        'User-Agent': 'aistudio-build'
      }
    });

    // Post-flight Check on transaction endpoint
    if (!upstreamRes.ok) {
      return res.status(200).json({
        status: 'error',
        upstreamStatus: upstreamRes.status,
        error: `URA Space API returned HTTP ${upstreamRes.status}`,
        ura_transactions: [],
        metrics: calculateSummaryMetrics([])
      });
    }

    const uraData = await upstreamRes.json();
    const rawResults = uraData.Result || [];

    // Filter by project_name, postal_code, or street
    const searchTarget = (projectName || streetName || postalCode).toUpperCase();
    const matchedTransactions = [];

    for (const project of rawResults) {
      const projName = (project.project || '').toUpperCase();
      const projStreet = (project.street || '').toUpperCase();

      const isMatch =
        !searchTarget ||
        projName.includes(searchTarget) ||
        projStreet.includes(searchTarget);

      if (isMatch && Array.isArray(project.transaction)) {
        for (const t of project.transaction) {
          const price = Number(t.price) || 0;
          const areaSqm = Number(t.area) || 0;
          const psf = calculatePsf(price, areaSqm);

          matchedTransactions.push({
            project: project.project || 'Private Residential',
            street: project.street || 'N/A',
            marketSegment: project.marketSegment || 'OCR',
            price: price || 'N/A',
            area_sqm: areaSqm || 'N/A',
            area_sqft: formatFloorAreaSqft(areaSqm),
            contractDate: t.contractDate || 'N/A',
            propertyType: t.propertyType || project.propertyType || 'Condominium',
            tenure: t.tenure || 'N/A',
            typeOfSale: t.typeOfSale || 'Resale',
            psf: psf
          });
        }
      }
    }

    // Sort by latest contract date if available
    matchedTransactions.sort((a, b) => String(b.contractDate).localeCompare(String(a.contractDate)));
    const finalTransactions = matchedTransactions.slice(0, 50);

    const metrics = calculateSummaryMetrics(finalTransactions, 'price', 'area_sqm');

    return res.status(200).json({
      status: 'success',
      search_query: { postal_code: postalCode, project_name: projectName },
      total_found: finalTransactions.length,
      message:
        finalTransactions.length === 0
          ? 'No transaction history or amenities found for this criteria'
          : undefined,
      ura_transactions: finalTransactions,
      metrics
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Failed to query URA Space API: ' + error.message,
      ura_transactions: [],
      metrics: calculateSummaryMetrics([])
    });
  }
}

export { handler as uraHandler };
