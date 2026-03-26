"use client";

import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";

interface CalculatorProps {
  propertyRate?: string | number;
}

const formatINR = (amount: number): string => {
  if (!isFinite(amount) || isNaN(amount)) return "₹0";
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`;
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
};

type Tab = "appreciation" | "emi";

/* ─────────────────────────────────────────────
   Appreciation Calculator
   ───────────────────────────────────────────── */
function AppreciationCalculator({ propertyRate }: CalculatorProps) {
  const basePrice = Number(propertyRate) || 5_000_000;
  const [currentValue, setCurrentValue] = useState(String(basePrice));
  const [years, setYears] = useState("5");
  const [annualRate, setAnnualRate] = useState("20");

  const projection = useMemo(() => {
    const price = Number(currentValue) || 0;
    const y = Math.min(Number(years) || 0, 30);
    const rate = Number(annualRate) || 0;

    const yearwise: { year: number; value: number }[] = [];
    let value = price;
    for (let i = 1; i <= y; i++) {
      value = value * (1 + rate / 100);
      yearwise.push({ year: i, value });
    }

    const futureValue = price * Math.pow(1 + rate / 100, y);
    const totalGain = futureValue - price;
    const gainPct = price > 0 ? (totalGain / price) * 100 : 0;

    return { futureValue, totalGain, gainPct, yearwise };
  }, [currentValue, years, annualRate]);

  const fieldClass =
    "w-full px-4 py-3 rounded-xl border border-dark/10 dark:border-white/10 bg-transparent text-dark dark:text-white text-sm focus:outline-none focus:border-primary transition-colors";

  const maxValue = projection.yearwise.length > 0
    ? projection.yearwise[projection.yearwise.length - 1].value
    : Number(currentValue) || 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-dark dark:text-white">Current Property Value (₹)</label>
          <input
            type="number"
            placeholder="e.g. 5000000"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className={fieldClass}
          />
          {Number(currentValue) > 0 && (
            <p className="text-xs text-primary pl-1">{formatINR(Number(currentValue))}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-dark dark:text-white">Annual Appreciation Rate (%)</label>
          <input
            type="number"
            placeholder="e.g. 20"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-dark dark:text-white">Time Period (Years)</label>
          <input
            type="number"
            placeholder="e.g. 5"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4">
        {/* Future value hero card */}
        <div className="bg-primary/10 rounded-2xl p-6 flex flex-col gap-1">
          <p className="text-sm text-dark/60 dark:text-white/60">Future Property Value</p>
          <p className="text-4xl font-semibold text-primary">{formatINR(projection.futureValue)}</p>
          <p className="text-xs text-dark/40 dark:text-white/40 mt-1">
            after {years || "—"} years at {annualRate || "—"}% annual appreciation
          </p>
        </div>

        {/* Breakdown pills */}
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-dark/10 dark:border-white/10 rounded-xl p-4">
            <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Current Value</p>
            <p className="text-sm font-semibold text-dark dark:text-white">{formatINR(Number(currentValue) || 0)}</p>
          </div>
          <div className="border border-dark/10 dark:border-white/10 rounded-xl p-4">
            <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Total Gain</p>
            <p className="text-sm font-semibold text-emerald-600">{formatINR(projection.totalGain)}</p>
          </div>
          <div className="border border-dark/10 dark:border-white/10 rounded-xl p-4">
            <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Total Return</p>
            <p className="text-sm font-semibold text-emerald-600">{projection.gainPct.toFixed(0)}%</p>
          </div>
        </div>

        {/* Year-on-year bar chart */}
        {projection.yearwise.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-dark/60 dark:text-white/60">Year-on-Year Growth</p>
            <div className="flex flex-col gap-1.5">
              {projection.yearwise.map((item) => (
                <div key={item.year} className="flex items-center gap-3">
                  <span className="text-xs text-dark/50 dark:text-white/50 w-10 shrink-0">Yr {item.year}</span>
                  <div className="flex-1 h-5 bg-dark/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/70 rounded-full transition-all duration-300"
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-dark dark:text-white w-20 text-right shrink-0">
                    {formatINR(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-dark/30 dark:text-white/30 leading-5">
          * This calculator assumes a fixed annual appreciation rate compounded yearly.
          Actual property appreciation varies based on market conditions, location, and other factors.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMI Calculator
   ───────────────────────────────────────────── */
function EMICalculatorPanel({ propertyRate }: CalculatorProps) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="flex flex-col gap-5">
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

      {/* Results */}
      <div className="flex flex-col gap-4">
        <div className="bg-primary/10 rounded-2xl p-6 flex flex-col gap-1">
          <p className="text-sm text-dark/60 dark:text-white/60">Monthly EMI</p>
          <p className="text-4xl font-semibold text-primary">{formatINR(emi)}</p>
          <p className="text-xs text-dark/40 dark:text-white/40 mt-1">
            for {tenureYears || "—"} years at {interestRate || "—"}% p.a.
          </p>
        </div>

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
  );
}

/* ─────────────────────────────────────────────
   Main Export — Tabbed Calculator
   ───────────────────────────────────────────── */
export default function EMICalculator({ propertyRate }: CalculatorProps) {
  const [activeTab, setActiveTab] = useState<Tab>("appreciation");

  return (
    <div className="mt-16 border-t border-dark/10 dark:border-white/10 pt-12">
      {/* Tab switcher */}
      <div className="flex items-center gap-2 mb-8 border border-dark/10 dark:border-white/10 rounded-full p-1 w-fit">
        <button
          onClick={() => setActiveTab("appreciation")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "appreciation"
              ? "bg-primary text-white"
              : "text-dark/60 dark:text-white/60 hover:text-dark dark:hover:text-white"
          }`}
        >
          <Icon icon="ph:chart-line-up" width={18} />
          Appreciation
        </button>
        <button
          onClick={() => setActiveTab("emi")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "emi"
              ? "bg-primary text-white"
              : "text-dark/60 dark:text-white/60 hover:text-dark dark:hover:text-white"
          }`}
        >
          <Icon icon="ph:calculator" width={18} />
          EMI Calculator
        </button>
      </div>

      {activeTab === "appreciation" ? (
        <AppreciationCalculator propertyRate={propertyRate} />
      ) : (
        <EMICalculatorPanel propertyRate={propertyRate} />
      )}
    </div>
  );
}
