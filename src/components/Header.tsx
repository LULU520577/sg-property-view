import React from 'react';
import { Building2, Activity, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { HealthStatusResponse } from '../types/property';

interface HeaderProps {
  health: HealthStatusResponse | null;
  onOpenHealthModal: () => void;
  onLoadSample: () => void;
}

export const Header: React.FC<HeaderProps> = ({ health, onOpenHealthModal, onLoadSample }) => {
  const isHealthy = health?.status === 'healthy';
  const geminiOk = health?.geminiConfigured;
  const hdbOk = health?.hdbConfigured;

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Building2 className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                SG Property Intelligence
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                Live Data
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              HDB Resale • URA Caveats • OneMap Proximity • Gemini AI Valuation
            </p>
          </div>
        </div>

        {/* Action badges & Health button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onLoadSample}
            type="button"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Load sample benchmark dataset (560421 Blk 421 Ang Mo Kio)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sample Benchmark</span>
          </button>

          <button
            onClick={onOpenHealthModal}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition text-slate-300"
          >
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">API Status</span>
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isHealthy && geminiOk && hdbOk ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="text-[11px] text-slate-400 font-mono">
                {health ? (health.geminiConfigured ? 'Connected' : 'Setup') : 'Checking...'}
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
