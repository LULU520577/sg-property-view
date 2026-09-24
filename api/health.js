/**
 * api/health.js - Upstream service and environment health checker
 * Reports configuration status without exposing sensitive keys or tokens
 */

const DATA_GOV_HDB_RESOURCE_ID = 'd_8b84c4ee58e3cfc0ece0d773c8ca6abc';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');

  const hdbConfigured = true; // Open Data.gov.sg API
  const uraConfigured = Boolean(process.env.URA_ACCESS_KEY && process.env.URA_ACCESS_KEY.trim());
  const oneMapConfigured = Boolean(process.env.ONEMAP_API_KEY && process.env.ONEMAP_API_KEY.trim());
  const geminiConfigured = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());

  const upstreamStatus = {
    hdb: 'unknown',
    ura: uraConfigured ? 'configured' : 'missing_key',
    oneMap: oneMapConfigured ? 'configured' : 'missing_key',
    gemini: geminiConfigured ? 'configured' : 'missing_key'
  };

  // Check Data.gov.sg HDB connectivity quickly
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const hdbRes = await fetch(
      `https://data.gov.sg/api/action/datastore_search?resource_id=${DATA_GOV_HDB_RESOURCE_ID}&limit=1`,
      {
        signal: controller.signal,
        headers: { 'User-Agent': 'aistudio-build' }
      }
    );
    clearTimeout(timeoutId);
    upstreamStatus.hdb = hdbRes.ok ? 'connected' : `status_${hdbRes.status}`;
  } catch (err) {
    upstreamStatus.hdb = 'unreachable';
  }

  // If URA is configured, check token availability quickly
  if (uraConfigured) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const uraRes = await fetch('https://www.ura.gov.sg/uraDataService/insertNewToken.action', {
        signal: controller.signal,
        headers: {
          AccessKey: process.env.URA_ACCESS_KEY,
          'User-Agent': 'aistudio-build'
        }
      });
      clearTimeout(timeoutId);
      upstreamStatus.ura = uraRes.ok ? 'connected' : `status_${uraRes.status}`;
    } catch {
      upstreamStatus.ura = 'unreachable';
    }
  }

  // If OneMap is configured, verify connectivity
  if (oneMapConfigured) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const omRes = await fetch('https://www.onemap.gov.sg/api/common/elastic/search?searchVal=049318&returnGeom=N&getAddrDetails=N&pageNum=1', {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${process.env.ONEMAP_API_KEY}`,
          'User-Agent': 'aistudio-build'
        }
      });
      clearTimeout(timeoutId);
      upstreamStatus.oneMap = omRes.ok ? 'connected' : `status_${omRes.status}`;
    } catch {
      upstreamStatus.oneMap = 'unreachable';
    }
  }

  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    hdbConfigured,
    uraConfigured,
    oneMapConfigured,
    geminiConfigured,
    upstreamStatus
  });
}

export { handler as healthHandler };
