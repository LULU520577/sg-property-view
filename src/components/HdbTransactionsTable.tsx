import React, { useState, useMemo } from 'react';
import { Building2, SlidersHorizontal, ArrowUpDown, Calendar, Layers, CheckCircle } from 'lucide-react';
import { HdbTransaction, SummaryMetrics } from '../types/property';

interface HdbTransactionsTableProps {
  transactions: HdbTransaction[];
  metrics?: SummaryMetrics;
  town: string;
}

export const HdbTransactionsTable: React.FC<HdbTransactionsTableProps> = ({
  transactions,
  metrics,
  town
}) => {
  const [flatTypeFilter, setFlatTypeFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'psf'>('date');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Available flat types in current dataset
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    transactions.forEach((t) => {
      if (t.flat_type && t.flat_type !== 'N/A') types.add(t.flat_type);
    });
    return Array.from(types).sort();
  }, [transactions]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let list = [...transactions];

    if (flatTypeFilter !== 'ALL') {
      list = list.filter((t) => t.flat_type === flatTypeFilter);
    }

    list.sort((a, b) => {
      if (sortBy === 'price') {
        const pA = Number(a.resale_price) || 0;
        const pB = Number(b.resale_price) || 0;
        return sortOrder === 'desc' ? pB - pA : pA - pB;
      }
      if (sortBy === 'psf') {
        const psfA = typeof a.psf === 'number' ? a.psf : 0;
        const psfB = typeof b.psf === 'number' ? b.psf : 0;
        return sortOrder === 'desc' ? psfB - psfA : psfA - psfB;
      }
      // Default: date (month)
      const mA = a.month || '';
      const mB = b.month || '';
      return sortOrder === 'desc' ? mB.localeCompare(mA) : mA.localeCompare(mB);
    });

    return list;
  }, [transactions, flatTypeFilter, sortBy, sortOrder]);

  const toggleSort = (field: 'date' | 'price' | 'psf') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatPrice = (p: number | string) => {
    const num = Number(p);
    return isNaN(num) || num <= 0 ? 'N/A' : `S$${num.toLocaleString()}`;
  };

  const formatPsf = (psf: number | string) => {
    const num = Number(psf);
    return isNaN(num) || num <= 0 ? 'N/A' : `S$${num.toLocaleString()} psf`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              HDB Resale Transactions
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {filteredTransactions.length} records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified recent caveat transactions in {town} from Data.gov.sg
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-xs">
            <button
              onClick={() => setFlatTypeFilter('ALL')}
              type="button"
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                flatTypeFilter === 'ALL'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            {availableTypes.map((t) => (
              <button
                key={t}
                onClick={() => setFlatTypeFilter(t)}
                type="button"
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  flatTypeFilter === t
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table view */}
      {filteredTransactions.length === 0 ? (
        <div className="py-12 text-center text-slate-400">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium">No transaction history or amenities found for this criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting "All Types" or searching another nearby postal sector.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-800/90 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-700/80">
              <tr>
                <th
                  onClick={() => toggleSort('date')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Month</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4">Flat Type & Model</th>
                <th className="py-3 px-4">Location & Level</th>
                <th className="py-3 px-4">Floor Area</th>
                <th className="py-3 px-4">Remaining Lease</th>
                <th
                  onClick={() => toggleSort('price')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Transacted Price</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('psf')}
                  className="py-3 px-4 cursor-pointer hover:text-white transition text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>PSF ($/sqft)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
              {filteredTransactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                    {tx.month}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{tx.flat_type}</div>
                    <div className="text-[11px] text-slate-400">{tx.flat_model}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-200">
                      Blk {tx.block} {tx.street_name}
                    </div>
                    <div className="text-[11px] text-slate-400">Storey {tx.storey_range}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-white font-medium">{tx.floor_area_sqm} sqm</span>
                    <span className="text-[11px] text-slate-400 block">
                      ({tx.floor_area_sqft || Math.round(Number(tx.floor_area_sqm) * 10.7639)} sqft)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 text-xs">
                    {tx.remaining_lease}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 whitespace-nowrap">
                    {formatPrice(tx.resale_price)}
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
