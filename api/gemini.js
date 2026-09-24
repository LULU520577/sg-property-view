/**
 * api/gemini.js - Google Gemini Property Valuation & Intelligence Report
 * Accepts aggregated data payload (HDB/URA transactions + OneMap amenities)
 */
import { GoogleGenAI } from '@google/genai';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST with aggregated property payload.' });
  }

  // Pre-flight Check: verify GEMINI_API_KEY
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey || !geminiApiKey.trim()) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is missing. Set it in Vercel/Secrets and redeploy.'
    });
  }

  try {
    const payload = req.body || {};
    const {
      search_postal = 'N/A',
      search_town = 'Singapore',
      resolved_address,
      hdb_transactions = [],
      ura_transactions = [],
      onemap_amenities = {},
      buyer_profile = 'Young Homebuyers and Renters'
    } = payload;

    // Summarize the data for Gemini prompt
    const hdbCount = hdb_transactions.length;
    const uraCount = ura_transactions.length;

    const sampleHdb = hdb_transactions.slice(0, 8).map((t) => ({
      flat_type: t.flat_type,
      block: t.block,
      street: t.street_name,
      storey: t.storey_range,
      area_sqm: t.floor_area_sqm,
      remaining_lease: t.remaining_lease,
      price: t.resale_price,
      psf: t.psf
    }));

    const sampleUra = ura_transactions.slice(0, 6).map((t) => ({
      project: t.project,
      street: t.street,
      segment: t.marketSegment,
      propertyType: t.propertyType,
      contractDate: t.contractDate,
      price: t.price,
      psf: t.psf
    }));

    const mrtInfo = (onemap_amenities.mrt_stations || [])
      .slice(0, 3)
      .map((m) => `${m.name} (${m.distance_meters}m)`)
      .join(', ') || 'No immediate MRT stations recorded within 1km';

    const schools1km = (onemap_amenities.primary_schools_1km || [])
      .map((s) => `${s.name} (${s.distance_meters}m)`)
      .join(', ') || 'None within 1km';

    const schools2km = (onemap_amenities.primary_schools_2km || [])
      .slice(0, 4)
      .map((s) => `${s.name} (${s.distance_meters}m)`)
      .join(', ') || 'None listed within 2km';

    const hawkers = (onemap_amenities.hawker_centers || [])
      .slice(0, 2)
      .map((h) => `${h.name} (${h.distance_meters}m)`)
      .join(', ') || 'Local food centers available in vicinity';

    const supermarkets = (onemap_amenities.supermarkets || [])
      .slice(0, 2)
      .map((s) => `${s.name} (${s.distance_meters}m)`)
      .join(', ') || 'Heartland groceries';

    const promptText = `
You are an expert Singapore Real Estate Market Analyst and Housing Valuation Economist.
Analyze the following localized property dataset for Singapore Postal Code / Area: "${search_postal}" (${search_town}).

### PROPERTY & TRANSACTION SUMMARY:
- Target Location: ${search_postal} | Town: ${search_town}
- Resolved Address: ${resolved_address?.full_address || resolved_address?.building || 'Heartland precinct'}
- Recent HDB Resale Transactions (${hdbCount} records):
${JSON.stringify(sampleHdb, null, 2)}

- Recent URA Private Residential Transactions (${uraCount} records):
${JSON.stringify(sampleUra, null, 2)}

- OneMap Amenities Proximity:
  * Nearest MRT Stations: ${mrtInfo}
  * Primary Schools within 1km (MOE Phase 2C priority): ${schools1km}
  * Primary Schools within 1km-2km: ${schools2km}
  * Food & Hawker Centres: ${hawkers}
  * Supermarkets & Daily Essentials: ${supermarkets}

- Target Audience Profile: ${buyer_profile}

Generate a concise, structured, and insightful natural language report organized into these distinct sections:

1. **Executive Valuation & Pricing Benchmark**:
   - Compare transacted HDB resale prices and PSF against broader estate medians.
   - Mention condo/private benchmark parity if URA caveats are present.
   - Comment on price resilience and value-for-money.

2. **Remaining Lease & Capital Preservation**:
   - Evaluate the remaining lease length (e.g. 50+ vs 90+ years) and potential lease decay.
   - Impact on future CPF withdrawal limits and resale exit liquidity for the next buyer.

3. **Neighborhood Connectivity & Liveability**:
   - Commute viability based on nearest MRT walking distance (<500m vs 1km+).
   - Daily lifestyle amenities (Hawker centers, wet markets, supermarkets, parks).
   - School priority assessment for young couples planning for children (Phase 2C within 1km).

4. **Recommendation for Young Homebuyers & Renters**:
   - Clear, realistic verdict: Best suited for whom? (e.g., budget-conscious first-timers, multi-gen families, or rental yield seekers).
   - 2-3 specific negotiation or due-diligence tips for this specific cluster.

Keep the tone professional, objective, and deeply rooted in Singapore housing realities (HDB rules, MOP, CPF usage, MOE school phases). Avoid generic filler.
`;

    const ai = new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    let response;
    let usedModel = 'gemini-3.1-flash-lite';
    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let lastError = null;

    for (const model of candidateModels) {
      // Try each model with up to 2 attempts for transient 503/429 errors
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          response = await ai.models.generateContent({
            model,
            contents: promptText
          });
          usedModel = model;
          break;
        } catch (err) {
          lastError = err;
          const isTransient = err.message?.includes('503') ||
                              err.message?.includes('UNAVAILABLE') ||
                              err.message?.includes('429') ||
                              err.message?.includes('RESOURCE_EXHAUSTED');
          console.warn(`Model ${model} (attempt ${attempt + 1}) failed:`, err.message);
          if (isTransient && attempt === 0) {
            await sleep(800);
            continue;
          }
          break;
        }
      }
      if (response) break;
    }

    if (!response) {
      throw lastError || new Error('All model candidates failed.');
    }

    const reportText = response.text || 'Unable to generate analysis at this time.';

    return res.status(200).json({
      status: 'success',
      postal_code: search_postal,
      town: search_town,
      model: usedModel,
      generated_at: new Date().toISOString(),
      report: reportText
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Failed to generate Gemini property intelligence report: ' + error.message
    });
  }
}

export { handler as geminiHandler };
