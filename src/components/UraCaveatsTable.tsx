import React from 'react';
import { Home, ExternalLink, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { UraTransaction, SummaryMetrics } from '../types/property';

interface UraCaveatsTableProps {
  transactions: UraTransaction[];
  metrics?: SummaryMetrics;
  uraStatus?: string;
  town: string;
}

export const UraCaveatsTable: React.FC<UraCaveatsTableProps> = ({
  transactions,
  metrics,
  uraStatus,
  town
}) => {
  const isUnconfigured = uraStatus === 'unconfigured';

  const formatPrice = (p: number | string) => {
    const num = Number(p);
    return isNaN(num) || num <= 0 ? 'N/A' : `S$${num.toLocaleString()}`;
  };

  const formatPsf = (psf: number | string) => {
    const num = Number(psf);
    return isNaN(num) || num <= 0 ? 'N/A' : `S$${num.toLocaleString()} psf`;
  };

  const getMarketSegmentBadge = (segment: string) => {
    switch (segment) {
      case 'CCR':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'RCR':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              URA Private Residential Caveats
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {transactions.length} records
            </span>
            {isUnconfigured && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Benchmark Sample
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Private condominium & EC transactions for private-vs-public price parity analysis
          </p>
        </div>

        {/* Live status badge */}
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          {isUnconfigured ? (
            <div className="flex items-center gap-1.5 text-amber-400">
              <Info className="w-4 h-4" />
              <span>URA_ACCESS_KEY unconfigured</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>URA Space API Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Notice if unconfigured */}
      {isUnconfigured && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <span>
            <strong>Note:</strong> <code className="text-amber-200">URA_ACCESS_KEY</code> is not provided in environment secrets.
            Displaying realistic benchmark caveats for {town} private projects so you can test price parity and AI valuation.
            To connect live URA data, set <code className="text-amber-200">URA_ACCESS_KEY</code> in Vercel or AI Studio Secrets.
          </span>
        </div>
      )}

      {/* Table view */}
      {transactions.length === 0 ? (
        <div className="py-12 text-center text-slate-400">
          <Home className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium">No private transaction history or amenities found for this criteria.</p>
          <p className="text-xs text-slate-500 mt-1">This area may be predominantly public housing (HDB heartland).</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-800/90 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-700/80">
              <tr>
                <th className="py-3 px-4">Project & Street</th>
                <th className="py-3 px-4">Market Segment</th>
                <th className="py-3 px-4">Property Type</th>
                <th className="py-3 px-4">Area</th>
                <th className="py-3 px-4">Contract Date</th>
                <th className="py-3 px-4">Transacted Price</th>
                <th className="py-3 px-4 text-right">PSF ($/sqft)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
              {transactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{tx.project}</div>
                    <div className="text-[11px] text-slate-400">{tx.street}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getMarketSegmentBadge(
                        tx.marketSegment
                      )}`}
                    >
                      {tx.marketSegment || 'OCR'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {tx.propertyType}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-white font-medium">{tx.area_sqm} sqm</span>
                    <span className="text-[11px] text-slate-400 block">
                      ({tx.area_sqft || Math.round(Number(tx.area_sqm) * 10.7639)} sqft)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                    {tx.contractDate}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 whitespace-nowrap">
                    {formatPrice(tx.price)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-teal-300 text-right whitespace-nowrap">
                    {formatPsf(tx.psf)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
