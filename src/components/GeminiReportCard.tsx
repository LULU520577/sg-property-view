import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Copy, Check, RefreshCw, ShieldCheck, UserCheck, Flame } from 'lucide-react';
import { GeminiReportResponse } from '../types/property';

interface GeminiReportCardProps {
  report: GeminiReportResponse | null;
  isLoading: boolean;
  onRegenerate: (persona: string) => void;
  postalCode: string;
  town: string;
}

export const GeminiReportCard: React.FC<GeminiReportCardProps> = ({
  report,
  isLoading,
  onRegenerate,
  postalCode,
  town
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activePersona, setActivePersona] = useState('Young Homebuyers & Renters');

  const personas = [
    'Young Homebuyers & Renters',
    'Young Families (School Priority)',
    'Investment & Rental Yield'
  ];

  const handleCopy = () => {
    if (report?.report) {
      navigator.clipboard.writeText(report.report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePersonaChange = (p: string) => {
    setActivePersona(p);
    onRegenerate(p);
  };

  // Render markdown-like sections nicely
  const formatReportContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 3 or 4 or bold section
      if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
        const title = trimmed.replace(/^#+\s*/, '');
        return (
          <h4 key={idx} className="text-base sm:text-lg font-bold text-emerald-400 mt-5 mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-emerald-400 shrink-0" />
            <span>{title}</span>
          </h4>
        );
      }

      if (trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.') || trimmed.startsWith('4.')) {
        return (
          <h4 key={idx} className="text-base sm:text-lg font-bold text-white mt-5 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 border border-emerald-500/40 text-emerald-400 text-xs flex items-center justify-center font-bold">
              {trimmed.slice(0, 1)}
            </span>
            <span>{trimmed.slice(2).replace(/\*\*/g, '').trim()}</span>
          </h4>
        );
      }

      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const bulletContent = trimmed.slice(2);
        // Replace bold **text** with styled spans
        const parts = bulletContent.split(/(\*\*.*?\*\*)/g);
        return (
          <li key={idx} className="text-sm text-slate-300 leading-relaxed ml-4 list-disc pl-1 mb-1.5 marker:text-emerald-400">
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={pIdx} className="text-white font-semibold">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </li>
        );
      }

      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }

      // Regular paragraph
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-sm text-slate-300 leading-relaxed mb-2">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="text-white font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Decorative accent background */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600/20 to-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                AI Valuation & Property Intelligence Report
              </h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/30">
                {report?.model || 'gemini-2.5-flash'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pricing trends, valuation insights, and neighborhood suitability for {town} ({postalCode})
            </p>
          </div>
        </div>

        {/* Top Controls: Copy, Regenerate, Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {report && (
            <button
              onClick={handleCopy}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Copy analysis report"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => onRegenerate(activePersona)}
            disabled={isLoading}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Synthesizing...' : 'Regenerate'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
            title={isExpanded ? 'Collapse report' : 'Expand report'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Target Buyer Persona Selector Pills */}
      <div className="py-3 flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-400 font-medium">Buyer Persona Focus:</span>
        {personas.map((p) => {
          const isActive = activePersona === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => handlePersonaChange(p)}
              disabled={isLoading}
              className={`px-3 py-1 rounded-full border transition font-medium ${
                isActive
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-slate-800/60">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-emerald-400 animate-pulse">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <p className="text-sm font-semibold text-white">Synthesizing Property Intelligence Report...</p>
              <p className="text-xs text-slate-400 max-w-sm">
                Aggregating Data.gov.sg HDB transactions, URA caveats, and OneMap amenities with Google Gemini.
              </p>
            </div>
          ) : report?.report ? (
            <div className="prose prose-invert max-w-none text-slate-200 text-sm">
              {formatReportContent(report.report)}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Model: {report.model} • Prompt Grounded</span>
                <span>Generated: {new Date(report.generated_at).toLocaleTimeString()}</span>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm">
              <p>No report available yet. Click "Regenerate" or search a postal code to synthesize insights.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
