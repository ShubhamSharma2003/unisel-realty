"use client";

import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";

interface EMICalculatorProps {
  propertyRate?: string | number;
}

const formatINR = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return "₹0";
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`;
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
};

export default function EMICalculator({ propertyRate }: EMICalculatorProps) {
  const basePrice = Number(propertyRate) || 5_000_000;

  const [propertyPrice, setPropertyPrice] = useState(String(basePrice));
  const [downPaymentPct, setDownPaymentPct] = useState("20");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenureYears, setTenureYears] = useState("20");

  const { loanAmount, emi, totalInterest, totalAmount, principalPct, interestPct } =
    useMemo(() => {
      const price = Number(propertyPrice) || 0;
      const dp = Number(downPaymentPct) || 0;
      const rate = Number(interestRate) || 0;
      const tenure = Number(tenureYears) || 0;

      const loanAmount = price * (1 - dp / 100);
      const r = rate / 12 / 100;
      const n = tenure * 12;

      let emi = 0;
      if (loanAmount > 0 && n > 0) {
        emi = r === 0
          ? loanAmount / n
          : (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }

      const totalAmount = emi * n;
      const totalInterest = totalAmount - loanAmount;
      const principalPct = totalAmount > 0 ? (loanAmount / totalAmount) * 100 : 0;
      const interestPct = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0;

      return { loanAmount, emi, totalInterest, totalAmount, principalPct, interestPct };
    }, [propertyPrice, downPaymentPct, interestRate, tenureYears]);

  const fieldClass =
    "w-full px-4 py-3 rounded-xl border border-dark/10 dark:border-white/10 bg-transparent text-dark dark:text-white text-sm focus:outline-none focus:border-primary transition-colors";

  return (
    <div className="mt-16 border-t border-dark/10 dark:border-white/10 pt-12">
      <div className="flex items-center gap-3 mb-8">
        <Icon icon="ph:calculator" width={28} className="text-primary" />
        <div>
          <h2 className="text-2xl font-semibold text-dark dark:text-white">EMI / Mortgage Calculator</h2>
          <p className="text-sm text-dark/50 dark:text-white/50 mt-0.5">Estimate your monthly home loan repayment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── Inputs ── */}
        <div className="flex flex-col gap-5">

          {/* Property Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark dark:text-white">Property Price (₹)</label>
            <input
              type="number"
              placeholder="e.g. 5000000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
              className={fieldClass}
            />
            {Number(propertyPrice) > 0 && (
              <p className="text-xs text-primary pl-1">{formatINR(Number(propertyPrice))}</p>
            )}
          </div>

          {/* Down Payment */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark dark:text-white">Down Payment (%)</label>
            <input
              type="number"
              placeholder="e.g. 20"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(e.target.value)}
              className={fieldClass}
            />
            {Number(downPaymentPct) > 0 && Number(propertyPrice) > 0 && (
              <p className="text-xs text-primary pl-1">
                {formatINR(Number(propertyPrice) * Number(downPaymentPct) / 100)} down · {formatINR(loanAmount)} loan
              </p>
            )}
          </div>

          {/* Interest Rate */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark dark:text-white">Annual Interest Rate (%)</label>
            <input
              type="number"
              placeholder="e.g. 8.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className={fieldClass}
            />
          </div>

          {/* Loan Tenure */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dark dark:text-white">Loan Tenure (Years)</label>
            <input
              type="number"
              placeholder="e.g. 20"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className={fieldClass}
            />
          </div>

        </div>

        {/* ── Results ── */}
        <div className="flex flex-col gap-4">

          {/* Monthly EMI — hero card */}
          <div className="bg-primary/10 rounded-2xl p-6 flex flex-col gap-1">
            <p className="text-sm text-dark/60 dark:text-white/60">Monthly EMI</p>
            <p className="text-4xl font-semibold text-primary">{formatINR(emi)}</p>
            <p className="text-xs text-dark/40 dark:text-white/40 mt-1">
              for {tenureYears || "—"} years at {interestRate || "—"}% p.a.
            </p>
          </div>

          {/* Breakdown pills */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-dark/10 dark:border-white/10 rounded-xl p-4">
              <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Loan Amount</p>
              <p className="text-sm font-semibold text-dark dark:text-white">{formatINR(loanAmount)}</p>
            </div>
            <div className="border border-dark/10 dark:border-white/10 rounded-xl p-4">
              <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Total Interest</p>
              <p className="text-sm font-semibold text-dark dark:text-white">{formatINR(totalInterest)}</p>
            </div>
            <div className="border border-dark/10 dark:border-white/10 rounded-xl p-4">
              <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Total Payment</p>
              <p className="text-sm font-semibold text-dark dark:text-white">{formatINR(totalAmount)}</p>
            </div>
          </div>

          {/* Visual split bar */}
          {totalAmount > 0 && (
            <div>
              <div className="flex rounded-full overflow-hidden h-3">
                <div
                  className="bg-primary transition-all duration-300"
                  style={{ width: `${principalPct}%` }}
                />
                <div
                  className="bg-primary/30 transition-all duration-300"
                  style={{ width: `${interestPct}%` }}
                />
              </div>
              <div className="flex gap-5 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-dark/60 dark:text-white/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                  Principal ({principalPct.toFixed(0)}%)
                </div>
                <div className="flex items-center gap-1.5 text-xs text-dark/60 dark:text-white/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/30 inline-block" />
                  Interest ({interestPct.toFixed(0)}%)
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-dark/30 dark:text-white/30 leading-5">
            * This calculator provides an estimate only. Actual EMI may vary based on lender terms,
            processing fees, and other charges. Consult a financial advisor before making any decision.
          </p>
        </div>
      </div>
    </div>
  );
}
