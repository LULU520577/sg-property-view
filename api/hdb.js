/**
 * api/hdb.js - Data.gov.sg HDB Resale Transactions API handler
 * Accepts postal_code or town query parameter
 */
import { resolvePostalToTown } from './data/singaporeGeo.js';
import { calculatePsf, formatFloorAreaSqft, calculateSummaryMetrics } from './utils/psf.js';

const DATA_GOV_HDB_RESOURCE_ID = 'd_8b84c4ee58e3cfc0ece0d773c8ca6abc';

export default async function handler(req, res) {
  // Set required Cache-Control headers
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
  }

  const queryParams = req.method === 'GET' ? req.query : req.body || {};
  const postalCode = (queryParams.postal_code || queryParams.postal || '').toString().trim();
  const rawTown = (queryParams.town || '').toString().trim();

  if (!postalCode && !rawTown) {
    return res.status(400).json({
      error: 'Please provide a postal_code (e.g., 560421) or town (e.g., ANG MO KIO).'
    });
  }

  try {
    let resolvedAddress = null;
    let targetTown = rawTown.toUpperCase();
    let targetBlock = queryParams.block || '';
    let targetStreet = queryParams.street || '';

    // If postal_code is provided, resolve block, street, and coordinates via OneMap public elastic search
    if (postalCode) {
      try {
        const omRes = await fetch(
          `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(
            postalCode
          )}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
          { headers: { 'User-Agent': 'aistudio-build' } }
        );

        if (omRes.ok) {
          const omData = await omRes.json();
          if (omData && omData.results && omData.results.length > 0) {
            const top = omData.results[0];
            resolvedAddress = {
              postal: postalCode,
              block: top.BLK_NO || '',
              street_name: top.ROAD_NAME || '',
              building: top.BUILDING || '',
              full_address: top.ADDRESS || '',
              latitude: Number(top.LATITUDE) || null,
              longitude: Number(top.LONGITUDE) || null
            };
            if (top.BLK_NO) targetBlock = top.BLK_NO;
            if (top.ROAD_NAME) targetStreet = top.ROAD_NAME;
          }
        }
      } catch (err) {
        console.warn('OneMap geocoding fallback in HDB handler:', err.message);
      }

      if (!targetTown) {
        targetTown = resolvePostalToTown(postalCode);
      }
      if (resolvedAddress) {
        resolvedAddress.town = targetTown;
      }
    }

    // Prepare queries to Data.gov.sg
    const filters = {};
    if (targetTown) filters.town = targetTown;
    if (targetBlock) filters.block = targetBlock;

    let apiUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=${DATA_GOV_HDB_RESOURCE_ID}&sort=_id desc&limit=60`;
    if (Object.keys(filters).length > 0) {
      apiUrl += `&filters=${encodeURIComponent(JSON.stringify(filters))}`;
    }

    const upstreamResponse = await fetch(apiUrl, {
      headers: { 'User-Agent': 'aistudio-build' }
    });

    // Post-flight check
    if (!upstreamResponse.ok) {
      return res.status(200).json({
        warning: `Upstream Data.gov.sg returned HTTP ${upstreamResponse.status}`,
        search_postal: postalCode || null,
        town: targetTown,
        hdb_transactions: [],
        metrics: calculateSummaryMetrics([])
      });
    }

    const data = await upstreamResponse.json();
    let records = data.result?.records || [];

    // If block-specific search yielded 0 records, fall back to town-level recent transactions
    if (records.length === 0 && targetBlock && targetTown) {
      const fallbackUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=${DATA_GOV_HDB_RESOURCE_ID}&filters=${encodeURIComponent(
        JSON.stringify({ town: targetTown })
      )}&sort=_id desc&limit=40`;
      const fallbackRes = await fetch(fallbackUrl, {
        headers: { 'User-Agent': 'aistudio-build' }
      });
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        records = fallbackData.result?.records || [];
      }
    }

    // Format transactions safely
    const formattedTransactions = records.map((r) => {
      const price = Number(r.resale_price) || 0;
      const areaSqm = Number(r.floor_area_sqm) || 0;
      const psf = calculatePsf(price, areaSqm);

      return {
        month: r.month || 'N/A',
        town: r.town || targetTown || 'N/A',
        flat_type: r.flat_type || 'N/A',
        block: r.block || 'N/A',
        street_name: r.street_name || 'N/A',
        storey_range: r.storey_range || 'N/A',
        floor_area_sqm: areaSqm || 'N/A',
        floor_area_sqft: formatFloorAreaSqft(areaSqm),
        flat_model: r.flat_model || 'N/A',
        lease_commence_date: r.lease_commence_date ? Number(r.lease_commence_date) : 'N/A',
        remaining_lease: r.remaining_lease || 'N/A',
        resale_price: price || 'N/A',
        psf: psf
      };
    });

    const metrics = calculateSummaryMetrics(formattedTransactions);

    return res.status(200).json({
      status: 'success',
      search_postal: postalCode || null,
      town: targetTown || null,
      resolved_address: resolvedAddress,
      hdb_transactions: formattedTransactions,
      metrics
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to process HDB resale query: ' + error.message,
      hdb_transactions: [],
      metrics: calculateSummaryMetrics([])
    });
  }
}

export { handler as hdbHandler };
