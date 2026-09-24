/**
 * api/onemap.js - OneMap SVY21/Theme APIs handler
 * Accepts postal_code, fetches nearby MRT stations, primary schools (1km & 2km), and key amenities
 */
import { computeNearbyAmenities, resolvePostalToTown } from './data/singaporeGeo.js';

export default async function handler(req, res) {
  // Set required Cache-Control headers
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
  }

  // Pre-flight Check: verify ONEMAP_API_KEY
  const oneMapApiKey = process.env.ONEMAP_API_KEY;
  if (!oneMapApiKey || !oneMapApiKey.trim()) {
    return res.status(503).json({
      error: 'ONEMAP_API_KEY is missing. Set it in Vercel/Secrets and redeploy.'
    });
  }

  const queryParams = req.method === 'GET' ? req.query : req.body || {};
  const postalCode = (queryParams.postal_code || queryParams.postal || '').toString().trim();

  if (!postalCode) {
    return res.status(400).json({ error: 'Please provide a 6-digit postal_code.' });
  }

  try {
    // Upstream search with OneMap API Key
    const searchUrl = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(
      postalCode
    )}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

    const upstreamResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${oneMapApiKey}`,
        'User-Agent': 'aistudio-build'
      }
    });

    // Post-flight Check
    if (!upstreamResponse.ok) {
      return res.status(200).json({
        status: 'error',
        upstreamStatus: upstreamResponse.status,
        error: `OneMap API returned HTTP ${upstreamResponse.status}`,
        search_postal: postalCode,
        onemap_amenities: {
          mrt_stations: [],
          primary_schools_1km: [],
          primary_schools_2km: [],
          supermarkets: [],
          hawker_centers: [],
          parks: []
        }
      });
    }

    const searchData = await upstreamResponse.json();
    const results = searchData.results || [];

    if (results.length === 0) {
      return res.status(200).json({
        status: 'success',
        search_postal: postalCode,
        message: 'No transaction history or amenities found for this criteria',
        onemap_amenities: {
          mrt_stations: [],
          primary_schools_1km: [],
          primary_schools_2km: [],
          supermarkets: [],
          hawker_centers: [],
          parks: []
        }
      });
    }

    const matched = results[0];
    const lat = Number(matched.LATITUDE);
    const lng = Number(matched.LONGITUDE);
    const svy21X = matched.X;
    const svy21Y = matched.Y;

    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
      return res.status(200).json({
        status: 'success',
        search_postal: postalCode,
        message: 'Could not resolve spatial coordinates for postal code',
        onemap_amenities: {
          mrt_stations: [],
          primary_schools_1km: [],
          primary_schools_2km: [],
          supermarkets: [],
          hawker_centers: [],
          parks: []
        }
      });
    }

    // Compute proximity metrics to amenities using accurate coordinates & SVY21/Haversine
    const computedAmenities = computeNearbyAmenities(lat, lng);

    return res.status(200).json({
      status: 'success',
      search_postal: postalCode,
      resolved_location: {
        address: matched.ADDRESS,
        road_name: matched.ROAD_NAME,
        building: matched.BUILDING,
        block_no: matched.BLK_NO,
        postal: matched.POSTAL,
        latitude: lat,
        longitude: lng,
        svy21_x: svy21X,
        svy21_y: svy21Y,
        town: resolvePostalToTown(postalCode)
      },
      onemap_amenities: computedAmenities
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Failed to process OneMap amenity request: ' + error.message,
      onemap_amenities: {
        mrt_stations: [],
        primary_schools_1km: [],
        primary_schools_2km: [],
        supermarkets: [],
        hawker_centers: [],
        parks: []
      }
    });
  }
}

export { handler as oneMapHandler };
