"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { saccos } from "../../lib/saccos";
import { SaccoCard } from "../../components/SaccoCard";
import { Search, SlidersHorizontal, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SaccosDirectoryPage() {
  const { t, language } = useLanguage();
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [repaymentFilter, setRepaymentFilter] = useState("all");
  const [loanFilter, setLoanFilter] = useState("all");

  const filteredSaccos = useMemo(() => {
    return saccos.filter((sacco) => {
      // 1. Search Query Filter
      const matchesSearch = sacco.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sacco.focus.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Repayment Type Filter
      const matchesRepayment = repaymentFilter === "all" || sacco.repayment === repaymentFilter;

      // 3. Max Loan Size Filter
      let matchesLoan = true;
      if (loanFilter === "under-200") {
        matchesLoan = sacco.maxLoan < 200000;
      } else if (loanFilter === "200-500") {
        matchesLoan = sacco.maxLoan >= 200000 && sacco.maxLoan <= 500000;
      } else if (loanFilter === "above-500") {
        matchesLoan = sacco.maxLoan > 500000;
      }

      return matchesSearch && matchesRepayment && matchesLoan;
    });
  }, [searchQuery, repaymentFilter, loanFilter]);

  return (
    <div className="min-h-screen py-12 px-6 bg-cream hero-texture">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-amber uppercase block mb-1">
            {language === "sw" ? "WASINGIZI WETU" : "OUR VERIFIED PARTNERS"}
          </span>
          <h1 className="text-3xl font-black text-charcoal sm:text-4xl">
            {t("saccoDirectory.title")}
          </h1>
          <p className="text-sm text-charcoal/70 mt-2">
            {t("saccoDirectory.subtitle")}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-8 flex flex-col gap-4">
          
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-grow max-w-lg">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder={t("saccoDirectory.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-cream/20 text-charcoal text-sm transition-all focus:border-green focus:ring-4 focus:ring-green/10"
              />
            </div>

            {/* Layout filter label */}
            <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0 lg:ml-4">
              <SlidersHorizontal size={14} className="text-amber" />
              <span>Filters</span>
            </div>
          </div>

          {/* Sub-Filters: Repayment & Loan size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-stone-100 pt-4">
            
            {/* Repayment Style Filters */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-charcoal/70">Repayment Plan</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: language === "sw" ? "Zote" : "All" },
                  { value: "harvest-aligned", label: language === "sw" ? "Mavuno pekee" : "Harvest-Aligned" },
                  { value: "flexible", label: language === "sw" ? "Nafuu" : "Flexible" },
                  { value: "monthly", label: language === "sw" ? "Kila Mwezi" : "Monthly" },
                ].map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => setRepaymentFilter(btn.value)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      repaymentFilter === btn.value
                        ? "bg-green text-white shadow-sm"
                        : "bg-cream text-charcoal hover:bg-stone-100 border border-stone-200/40"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Loan Filters */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-charcoal/70">Max Loan Limit</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: language === "sw" ? "Kiasi Chochote" : "All Limits" },
                  { value: "under-200", label: "Under 200K" },
                  { value: "200-500", label: "200K - 500K" },
                  { value: "above-500", label: "Above 500K" },
                ].map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => setLoanFilter(btn.value)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      loanFilter === btn.value
                        ? "bg-amber text-white shadow-sm"
                        : "bg-cream text-charcoal hover:bg-stone-100 border border-stone-200/40"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Directory Grid */}
        <AnimatePresence mode="wait">
          {filteredSaccos.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredSaccos.map((sacco) => (
                <SaccoCard key={sacco.id} sacco={sacco} mode="directory" />
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center bg-white rounded-2xl border border-stone-100 shadow-sm p-12 max-w-md mx-auto mt-16 space-y-6"
            >
              {/* Illustration SVG */}
              <svg
                viewBox="0 0 200 200"
                className="h-32 w-32 mx-auto text-stone-200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8" />
                <path d="M70 120 C70 100, 130 100, 130 120" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <circle cx="80" cy="80" r="6" fill="currentColor" />
                <circle cx="120" cy="80" r="6" fill="currentColor" />
                <path d="M90 95 L110 95" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              
              <div>
                <h3 className="text-lg font-bold text-charcoal">
                  {t("saccoDirectory.noResults")}
                </h3>
                <p className="text-xs text-charcoal/50 mt-2">
                  {language === "sw" 
                    ? "Jaribu kufuta vichujio vyako au utafute neno lingine tofauti." 
                    : "Try adjusting your filters or clearing your search term to view all partner SACCOs."}
                </p>
              </div>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setRepaymentFilter("all");
                  setLoanFilter("all");
                }}
                className="rounded-full border border-stone-300 hover:border-charcoal hover:bg-stone-50 px-6 py-2.5 text-xs font-bold text-charcoal active:scale-95 transition-all"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regulatory Info Banner */}
        <div className="mt-12 rounded-xl bg-cream border border-stone-200/50 p-4 flex gap-3 items-center">
          <Info size={20} className="text-amber shrink-0" />
          <p className="text-[11px] text-charcoal/70 leading-relaxed font-semibold">
            {language === "sw"
              ? "Taarifa ya Udhibiti: SACCO zote zilizoorodheshwa hapa zimesajiliwa chini ya SASRA (Mamlaka ya Udhibiti wa Vyama vya Ushirika wa Akiba na Mikopo) nchini Kenya. Maelezo yote ya mikopo yanakaguliwa mara kwa mara kwa uwazi."
              : "Regulatory Notice: All SACCOs listed in this directory are fully compliant and registered under SASRA (Sacco Societies Regulatory Authority) in Kenya. Loan terms and interest rates are audited periodically for transparency."}
          </p>
        </div>

      </div>
    </div>
  );
}
