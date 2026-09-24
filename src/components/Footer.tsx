import React from 'react';
import { ExternalLink, Building2, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentDate = new Intl.DateTimeFormat('en-SG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">SG Property Intelligence</span>
              <p className="text-xs text-slate-500">Public Sector Housing & Spatial Open Data Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a
              href="https://data.gov.sg/open-data-licence"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition flex items-center gap-1"
            >
              <span>Singapore Open Data Licence</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.onemap.gov.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition flex items-center gap-1"
            >
              <span>OneMap Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Required Attribution Paragraph */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
          <p>
            Contains public sector information from HDB Resale Transactions and URA Space accessed on{' '}
            <span className="text-slate-200 font-medium">{currentDate}</span>, made available under the terms of the{' '}
            <a
              href="https://data.gov.sg/open-data-licence"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-medium inline-flex items-center gap-0.5"
            >
              Singapore Open Data Licence version 1.0 (https://data.gov.sg/open-data-licence)
              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </a>
            . Map data and location services provided by{' '}
            <a
              href="https://www.onemap.gov.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-medium inline-flex items-center gap-0.5"
            >
              OneMap (https://www.onemap.gov.sg)
              <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </a>
            . AI insights generated via Google Gemini. This platform is an independent educational tool and is not officially affiliated with or endorsed by HDB, URA, SLA, or the Singapore Government.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-900">
          <p>© {new Date().getFullYear()} SG Property Intelligence. Designed for homebuyers, analysts, and researchers.</p>
          <p>Real-time serverless API engine • Safe PSF calculation guarantee</p>
        </div>
      </div>
    </footer>
  );
};
