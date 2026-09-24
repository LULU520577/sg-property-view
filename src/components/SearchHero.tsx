import React, { useState } from 'react';
import { Search, MapPin, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { QUICK_PRESETS } from '../data/sampleBenchmark';

interface SearchHeroProps {
  onSearch: (query: string) => void;
  onLoadSample: () => void;
  isLoading: boolean;
  activePostal: string;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  onSearch,
  onLoadSample,
  isLoading,
  activePostal
}) => {
  const [inputVal, setInputVal] = useState(activePostal || '560421');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const handlePresetClick = (postal: string) => {
    setInputVal(postal);
    onSearch(postal);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-xl">
      {/* Background glow effects */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-Time Singapore Property Valuation & Spatial Insights</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Singapore Property Intelligence Engine
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Search any 6-digit Singapore postal code or town. Aggregate real HDB resale records, private caveats, OneMap school/MRT distances, and AI valuation reports.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="pt-2">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-800/90 p-2 rounded-2xl border border-slate-700/80 shadow-2xl focus-within:border-emerald-500/80 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
            <div className="flex items-center gap-3 w-full px-3 py-2 sm:py-0">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter 6-digit Postal Code (e.g. 560421) or Town (e.g. ANG MO KIO)"
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Inspect Property</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Presets */}
        <div className="pt-2">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-medium mr-1">Quick Select:</span>
            {QUICK_PRESETS.map((p) => {
              const isSelected = activePostal === p.postal;
              return (
                <button
                  key={p.postal}
                  type="button"
                  onClick={() => handlePresetClick(p.postal)}
                  className={`text-xs px-3 py-1 rounded-full border transition font-medium ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold shadow-sm shadow-emerald-500/20'
                      : 'bg-slate-800/70 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
