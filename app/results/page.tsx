"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { getMatches } from "../../lib/matching";
import { FormData, MatchResult } from "../../lib/types";
import { SaccoCard } from "../../components/SaccoCard";
import { Shield, GraduationCap, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResultsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  
  const [formData, setFormData] = useState<FormData | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("elimufund-formData");
    if (!raw) {
      router.push("/apply");
      return;
    }
    try {
      const parsed: FormData = JSON.parse(raw);
      setFormData(parsed);
      const matchedResults = getMatches(parsed);
      setMatches(matchedResults);
    } catch (e) {
      console.error(e);
      router.push("/apply");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber mx-auto"></div>
          <p className="text-sm font-semibold text-charcoal/60">
            {language === "sw" ? "Tunameta mechi zako..." : "Calculating your matches..."}
          </p>
        </div>
      </div>
    );
  }

  const isFarmer = formData.occupation.toLowerCase().includes("farmer");

  // Custom Tip Message based on occupation
  const getScoutTip = () => {
    if (language === "sw") {
      return isFarmer
        ? "Ushauri wa Scout: Mazoea ya kuhifadhi sehemu ya mavuno yako kwa malipo ya mkopo itasaidia sana."
        : "Ushauri wa Scout: Kupanga bajeti yako ya kila mwezi na kuweka akiba mapema itakusaidia kulipa mkopo bila shida.";
    } else {
      return isFarmer
        ? "Scout Tip: Setting aside part of your harvest income for loan repayments will help greatly."
        : "Scout Tip: Planning your monthly budget and saving early will help you repay the loan without hassle.";
    }
  };

  // Custom Guardian Summary based on occupation and county
  const getGuardianSummary = () => {
    const countyStr = formData.county || "Kenya";
    const occupationStr = isFarmer ? "Farming" : formData.occupation || "Independent";
    const harvestStr = formData.harvestMonths.length > 0 ? formData.harvestMonths.join(", ") : "monthly";

    if (language === "sw") {
      return `Tathmini ya Guardian: Kulingana na mapato yako ya ${occupationStr} na eneo lako la ${countyStr}, SACCO hizi zinatoa madirisha ya malipo yanayolingana na kilele cha mapato yako ya miezi ya mavuno (${harvestStr}).`;
    } else {
      return `Guardian's Assessment: Based on your ${occupationStr} income and ${countyStr} location, these SACCOs offer repayment windows matching your ${harvestStr} income peaks.`;
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-cream hero-texture">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/apply" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-amber tracking-wider hover:underline mb-4">
            <ArrowLeft size={14} />
            <span>{language === "sw" ? "Rudi kwenye Fomu" : "Back to Form"}</span>
          </Link>
          
          <span className="text-xs font-extrabold tracking-widest text-green uppercase block mb-1">
            {t("results.eyebrow")}
          </span>
          <h1 className="text-3xl font-black text-charcoal sm:text-5xl">
            {t("results.title")}
          </h1>
          <p className="text-base text-charcoal/70 mt-2 max-w-2xl">
            {t("results.subtitle")}
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {matches.map((match, idx) => (
            <motion.div
              key={match.sacco.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <SaccoCard
                sacco={match.sacco}
                mode="results"
                matchPercentage={match.matchPercentage}
                isTopMatch={idx === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Double Info Box Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          
          {/* Scout Tip (Green Box) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-2xl bg-green/5 border border-green/20 flex gap-4 items-start shadow-sm"
          >
            <div className="h-10 w-10 rounded-full bg-green text-white flex items-center justify-center shrink-0 shadow-sm">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-green uppercase tracking-wider">
                {t("results.scoutTip")}
              </h3>
              <p className="text-sm text-charcoal/80 font-medium leading-relaxed mt-2">
                {getScoutTip()}
              </p>
            </div>
          </motion.div>

          {/* Guardian Summary (Amber Box) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-2xl bg-amber/5 border border-amber/20 flex gap-4 items-start shadow-sm"
          >
            <div className="h-10 w-10 rounded-full bg-amber text-white flex items-center justify-center shrink-0 shadow-sm">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-amber uppercase tracking-wider">
                {t("results.guardianSummary")}
              </h3>
              <p className="text-sm text-charcoal/80 font-medium leading-relaxed mt-2">
                {getGuardianSummary()}
              </p>
            </div>
          </motion.div>

        </div>

        {/* Reset / Start Over CTA */}
        <div className="text-center mt-12 border-t border-stone-200/50 pt-8">
          <Link href="/apply">
            <button className="rounded-full border border-stone-300 hover:border-charcoal hover:bg-stone-50 px-6 py-3 text-sm font-semibold text-charcoal flex items-center gap-2 mx-auto active:scale-95 transition-all">
              <RotateCcw size={16} />
              <span>{language === "sw" ? "Anza Ombi Upya" : "Start Application Again"}</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
