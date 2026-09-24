/**
 * Safe PSF and real estate calculation helpers
 * 1 square meter = 10.7639 square feet
 */

export function calculatePsf(price, areaSqm) {
  const numPrice = Number(price);
  const numArea = Number(areaSqm);

  if (
    numPrice === null ||
    numPrice === undefined ||
    numArea === null ||
    numArea === undefined ||
    isNaN(numPrice) ||
    isNaN(numArea) ||
    numPrice <= 0 ||
    numArea <= 0
  ) {
    return 'N/A';
  }

  const areaSqft = numArea * 10.7639104;
  const psf = Math.round(numPrice / areaSqft);

  if (!isFinite(psf) || psf <= 0) {
    return 'N/A';
  }

  return psf;
}

export function formatFloorAreaSqft(areaSqm) {
  const numArea = Number(areaSqm);
  if (!numArea || isNaN(numArea) || numArea <= 0) return 'N/A';
  const sqft = Math.round(numArea * 10.7639104);
  return isFinite(sqft) && sqft > 0 ? sqft : 'N/A';
}

export function calculateSummaryMetrics(transactions, priceField = 'resale_price', areaField = 'floor_area_sqm') {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return {
      total_transactions: 0,
      median_price: 'N/A',
      median_psf: 'N/A',
      min_price: 'N/A',
      max_price: 'N/A',
      min_psf: 'N/A',
      max_psf: 'N/A'
    };
  }

  const prices = transactions
    .map(t => Number(t[priceField]))
    .filter(p => !isNaN(p) && p > 0)
    .sort((a, b) => a - b);

  const psfs = transactions
    .map(t => {
      const psfVal = calculatePsf(t[priceField], t[areaField]);
      return typeof psfVal === 'number' ? psfVal : null;
    })
    .filter(p => p !== null && !isNaN(p) && p > 0)
    .sort((a, b) => a - b);

  const median = (arr) => {
    if (!arr.length) return 'N/A';
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 !== 0 ? arr[mid] : Math.round((arr[mid - 1] + arr[mid]) / 2);
  };

  return {
    total_transactions: transactions.length,
    median_price: median(prices),
    median_psf: median(psfs),
    min_price: prices.length ? prices[0] : 'N/A',
    max_price: prices.length ? prices[prices.length - 1] : 'N/A',
    min_psf: psfs.length ? psfs[0] : 'N/A',
    max_psf: psfs.length ? psfs[psfs.length - 1] : 'N/A'
  };
}
