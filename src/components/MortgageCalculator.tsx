import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck, Info } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice: number;
  town: string;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ initialPrice, town }) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice > 0 ? initialPrice : 540000);
  const [loanType, setLoanType] = useState<'hdb' | 'bank'>('hdb');
  const [tenureYears, setTenureYears] = useState<number>(25);

  const interestRate = loanType === 'hdb' ? 2.6 : 3.2; // 2.6% for HDB, 3.2% for bank
  const ltvRatio = loanType === 'hdb' ? 0.8 : 0.75; // 80% for HDB loan, 75% for bank loan

  const loanAmount = Math.round(propertyPrice * ltvRatio);
  const downPayment = propertyPrice - loanAmount;

  // Monthly installment calculation: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = tenureYears * 12;
  const monthlyInstallment = Math.round(
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Housing Affordability & Mortgage Estimator
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Singapore CPF / HDB Framework
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Tailored estimation for first-time young homebuyers evaluating {town}
          </p>
        </div>

        {/* Loan Type Pill Switch */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => setLoanType('hdb')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              loanType === 'hdb'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            HDB Housing Loan (2.6%)
          </button>
          <button
            type="button"
            onClick={() => setLoanType('bank')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              loanType === 'bank'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bank Loan (3.2%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Assumed Property Price (S$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">S$</span>
              <input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Math.max(100000, Number(e.target.value) || 0))}
                step="10000"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Loan Tenure: {tenureYears} Years</span>
              <span className="text-slate-400">Max 25 yrs (HDB)</span>
            </div>
            <input
              type="range"
              min="15"
              max="25"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Loan-To-Value (LTV):</span>
              <span className="font-semibold text-white">{ltvRatio * 100}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Interest Rate:</span>
              <span className="font-semibold text-white">{interestRate}% p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Min Downpayment:</span>
              <span className="font-semibold text-emerald-400">S${downPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Estimated Monthly Installment
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              S${monthlyInstallment.toLocaleString()}
              <span className="text-sm font-normal text-slate-400"> / month</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Based on S${loanAmount.toLocaleString()} borrowing over {tenureYears} years. Payable via CPF Ordinary Account (OA).
            </p>
          </div>

          <div className="pt-4 border-t border-slate-700/60 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Required Household Income:</span>
              <span className="font-bold text-white">~S${Math.round(monthlyInstallment / 0.3).toLocaleString()} /mo</span>
            </div>
            <p className="text-[11px] text-slate-500">
              * Assuming 30% Mortgage Servicing Ratio (MSR) cap for HDB flats.
            </p>
          </div>
        </div>

        {/* CPF Housing Grants eligibility card */}
        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/60 space-y-3">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CPF Housing Grants (First-Timers)</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>Enhanced CPF Housing Grant (EHG)</span>
                <span className="text-emerald-400">Up to S$80,000</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Subject to household income ceiling of S$9,000/month.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>CPF Family Grant (Resale Flats)</span>
                <span className="text-emerald-400">Up to S$80,000</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                For eligible first-timer Singapore citizen couples.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>Proximity Housing Grant (PHG)</span>
                <span className="text-emerald-400">Up to S$30,000</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Living with or within 4km of parents / married child.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
