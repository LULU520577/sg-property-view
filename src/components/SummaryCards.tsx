import React from 'react';
import { DollarSign, TrendingUp, Clock, Train, GraduationCap, MapPin, Building } from 'lucide-react';
import { PropertyDataPayload } from '../types/property';

interface SummaryCardsProps {
  data: PropertyDataPayload;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const { resolved_address, hdb_metrics, hdb_transactions, onemap_amenities } = data;

  const medianPrice = hdb_metrics?.median_price;
  const medianPsf = hdb_metrics?.median_psf;
  const totalCount = hdb_transactions?.length || 0;

  // Find most recent remaining lease from transactions
  const latestTx = hdb_transactions?.[0];
  const remainingLease = latestTx?.remaining_lease || 'N/A';
  const leaseCommence = latestTx?.lease_commence_date || 'N/A';

  // Nearest MRT
  const nearestMrt = onemap_amenities?.mrt_stations?.[0];
  // Schools
  const schools1kmCount = onemap_amenities?.primary_schools_1km?.length || 0;
  const schools2kmCount = onemap_amenities?.primary_schools_2km?.length || 0;

  const formatPrice = (val: number | string | undefined) => {
    if (val === undefined || val === null || val === 'N/A') return 'N/A';
    const num = Number(val);
    if (isNaN(num) || num <= 0) return 'N/A';
    return `S$${num.toLocaleString()}`;
  };

  const formatPsf = (val: number | string | undefined) => {
    if (val === undefined || val === null || val === 'N/A') return 'N/A';
    const num = Number(val);
    if (isNaN(num) || num <= 0) return 'N/A';
    return `S$${num.toLocaleString()} psf`;
  };

  return (
    <div className="space-y-4">
      {/* Resolved Location Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {resolved_address?.building || resolved_address?.block ? `Block ${resolved_address?.block || ''} ${resolved_address?.street_name || ''}` : data.town}
              </h2>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {data.town}
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                Postal {data.search_postal}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{resolved_address?.full_address || `${data.search_postal}, ${data.town}, Singapore`}</span>
            </p>
          </div>
        </div>

        {/* Location coordinates badge */}
        {resolved_address?.latitude && resolved_address?.longitude && (
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/60 self-start md:self-auto">
            <div>
              <span className="text-slate-500 block text-[10px]">SVY21 / GPS</span>
              <span>
                {resolved_address.latitude.toFixed(4)}°N, {resolved_address.longitude.toFixed(4)}°E
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 4 Interactive Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Transacted Median Price */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden transition group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Median Resale Price
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight">
            {formatPrice(medianPrice)}
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>Range: {formatPrice(hdb_metrics?.min_price)} - {formatPrice(hdb_metrics?.max_price)}</span>
            <span className="font-semibold text-emerald-400">{totalCount} txns</span>
          </p>
        </div>

        {/* Card 2: Median PSF */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden transition group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Median PSF ($/sqft)
            </span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-teal-300 tracking-tight">
            {formatPsf(medianPsf)}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            PSF Range: <span className="text-slate-300">{formatPsf(hdb_metrics?.min_psf)} - {formatPsf(hdb_metrics?.max_psf)}</span>
          </p>
        </div>

        {/* Card 3: Remaining Lease */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden transition group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Remaining Lease
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white tracking-tight truncate" title={remainingLease}>
            {remainingLease}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Lease start: <span className="text-slate-300 font-medium">{leaseCommence}</span> • 99-yr tenure
          </p>
        </div>

        {/* Card 4: Amenity Proximity Radar */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden transition group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Transit & School Radar
            </span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Train className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-xl font-bold text-white tracking-tight truncate">
              {nearestMrt ? `${nearestMrt.distance_meters}m` : 'Nearby'}
            </div>
            <span className="text-xs text-cyan-400 font-medium">
              {nearestMrt ? `to ${nearestMrt.name.split('(')[0]}` : 'MRT'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              <strong className="text-white">{schools1kmCount}</strong> schools within 1km (Phase 2C)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
