"use client";

import React from "react";
import Link from "next/link";
import { Sacco } from "../lib/types";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";

interface SaccoCardProps {
  sacco: Sacco;
  mode: "results" | "directory";
  matchPercentage?: number;
  isTopMatch?: boolean;
}

export const SaccoCard: React.FC<SaccoCardProps> = ({
  sacco,
  mode,
  matchPercentage,
  isTopMatch = false,
}) => {
  const { t } = useLanguage();

  // Helper to format large numbers (e.g. 500000 -> KES 500k)
  const formatMaxLoan = (amount: number) => {
    if (amount >= 1000) {
      return `KES ${amount / 1000}k`;
    }
    return `KES ${amount}`;
  };

  // Helper to check if a month is in the SACCO's harvest months
  const isSaccoHarvestMonth = (m: string) => {
    return sacco.harvestMonths.some(
      (shm) => shm.toLowerCase() === m.toLowerCase()
    );
  };

  const allMonths = ["Jan", "Mar", "Jun", "Sept", "Dec"];

  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex flex-col justify-between ${
        isTopMatch ? "border-amber/40 ring-1 ring-amber/10" : "border-stone-100"
      }`}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-charcoal">{sacco.name}</h3>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
              {sacco.focus}
            </span>
          </div>

          {/* Mode-specific Badge */}
          {mode === "results" && matchPercentage !== undefined ? (
            <div className="rounded-full bg-light-green border border-green/20 px-3 py-1 text-xs font-bold text-green flex items-center gap-1 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
              {matchPercentage}% Match
            </div>
          ) : (
            <span className="rounded-full bg-cream border border-stone-200 px-3 py-1 text-[10px] font-extrabold uppercase text-amber tracking-wider shrink-0">
              {sacco.badge}
            </span>
          )}
        </div>

        {/* 2-Column Stats Grid */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="p-3 bg-cream/40 border border-stone-100 rounded-xl">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              {t("results.interestRate")}
            </span>
            <span className="text-xl font-black text-amber mt-0.5 block">
              {sacco.rate}% <span className="text-xs font-semibold text-charcoal/60">p.a</span>
            </span>
          </div>
          <div className="p-3 bg-cream/40 border border-stone-100 rounded-xl">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              {t("results.maxLoan")}
            </span>
            <span className="text-xl font-black text-amber mt-0.5 block">
              {formatMaxLoan(sacco.maxLoan)}
            </span>
          </div>
        </div>

        {/* Repayment Timeline / Type Description */}
        <div className="border-t border-stone-100 pt-4 mb-6">
          {sacco.repayment === "harvest-aligned" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-green">
                <Calendar size={15} />
                <span className="uppercase tracking-wide">Harvest-Aligned Repayment</span>
              </div>
              
              {/* Timeline graphic */}
              <div className="relative pt-2 px-2">
                <div className="h-[3px] bg-stone-200 rounded-full w-full" />
                <div className="flex justify-between items-center relative -translate-y-[6px]">
                  {allMonths.map((m) => {
                    const isHarvest = isSaccoHarvestMonth(m);
                    return (
                      <div key={m} className="flex flex-col items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full border-2 transition-all ${
                            isHarvest
                              ? "bg-green border-green scale-125 ring-2 ring-green/20"
                              : "bg-stone-300 border-white"
                          }`}
                        />
                        <span
                          className={`text-[9px] mt-1 font-bold ${
                            isHarvest ? "text-green" : "text-stone-400"
                          }`}
                        >
                          {m === "Sept" ? "Sep" : m}
                          {isHarvest && (
                            <span className="block text-[8px] font-extrabold uppercase tracking-tighter text-amber">
                              Harvest
                            </span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-[10px] text-stone-400 font-semibold italic">
                * Bulk payments scheduled during peak harvest seasons.
              </p>
            </div>
          ) : sacco.repayment === "flexible" ? (
            <div className="p-3 bg-cream/30 border border-stone-100 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
                <CheckCircle2 size={14} className="text-amber" />
                <span className="uppercase tracking-wide">Flexible Repayment</span>
              </div>
              <p className="text-[11px] text-charcoal/70 leading-relaxed font-semibold">
                Bi-Monthly Installments: Allows grace periods during planting/low-income seasons.
              </p>
            </div>
          ) : (
            <div className="p-3 bg-cream/30 border border-stone-100 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
                <CheckCircle2 size={14} className="text-amber" />
                <span className="uppercase tracking-wide">Monthly Repayment</span>
              </div>
              <p className="text-[11px] text-charcoal/70 leading-relaxed font-semibold">
                Direct salary check-off or standard monthly automatic direct debit.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Button Row */}
      <div className="mt-auto">
        {mode === "results" ? (
          <button
            onClick={() => alert(`Connecting you to ${sacco.name}...`)}
            className={`w-full rounded-full py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
              isTopMatch
                ? "bg-amber text-white hover:bg-amber-hover shadow-md"
                : "bg-white text-amber border border-amber hover:bg-amber/5"
            }`}
          >
            <span>{t("results.contactBtn")}</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <Link href="/apply" className="block w-full">
            <button className="w-full rounded-full bg-amber hover:bg-amber-hover text-white py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
              <span>{t("saccoDirectory.applyBtn")}</span>
              <ArrowRight size={16} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
