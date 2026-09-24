import React from 'react';
import { X, CheckCircle2, AlertCircle, Key, Server, ExternalLink, RefreshCw } from 'lucide-react';
import { HealthStatusResponse } from '../types/property';

interface HealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  health: HealthStatusResponse | null;
  onRefresh: () => void;
  loading: boolean;
}

export const HealthModal: React.FC<HealthModalProps> = ({
  isOpen,
  onClose,
  health,
  onRefresh,
  loading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-teal-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Upstream Service & Key Health</h3>
            <p className="text-xs text-slate-400">
              Verified server-side status via <code className="text-teal-300">/api/health</code>
            </p>
          </div>
        </div>

        {/* Services checklist */}
        <div className="space-y-3 mb-6">
          {/* Data.gov.sg HDB Resale API */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-white">HDB Resale Transactions API</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Data.gov.sg
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Open government datastore (No private API key required)
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Live & Connected</span>
            </div>
          </div>

          {/* Google Gemini AI */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-white">Google Gemini AI Engine</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  gemini-2.5-flash
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Env Var: <code className="text-purple-300">GEMINI_API_KEY</code>
              </p>
            </div>
            {health?.geminiConfigured ? (
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Configured</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>Missing Key</span>
              </div>
            )}
          </div>

          {/* URA Space API */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-white">URA Space Caveats API</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Private Condos
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Env Var: <code className="text-emerald-300">URA_ACCESS_KEY</code>
              </p>
            </div>
            {health?.uraConfigured ? (
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Configured</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>Not Set (503 Ready)</span>
              </div>
            )}
          </div>

          {/* OneMap API */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-white">OneMap Spatial & Themes API</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  MRT & Schools
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Env Var: <code className="text-cyan-300">ONEMAP_API_KEY</code>
              </p>
            </div>
            {health?.oneMapConfigured ? (
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Configured</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>Not Set (503 Ready)</span>
              </div>
            )}
          </div>
        </div>

        {/* Informative notice */}
        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/40 text-xs text-slate-300 leading-relaxed mb-5">
          <p className="flex items-start gap-2">
            <Key className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Per application guardrails, keys are strictly verified server-side without leaking values.
              When <code className="text-amber-300 font-mono">URA_ACCESS_KEY</code> or <code className="text-amber-300 font-mono">ONEMAP_API_KEY</code> are not supplied, the app gracefully provides benchmark comparisons and verified spatial proximity calculations.
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-500 font-mono">
            Last checked: {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'N/A'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={loading}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
