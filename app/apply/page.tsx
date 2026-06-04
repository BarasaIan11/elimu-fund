"use client";

import React from "react";
import { ApplicationForm } from "../../components/ApplicationForm";
import { useLanguage } from "../../context/LanguageContext";

export default function ApplyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-12 px-6 bg-cream hero-texture">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-extrabold tracking-widest text-amber uppercase block mb-1">
            {language === "sw" ? "OMBA MKOPO WA ADA" : "SCHOOL FEES LOAN APPLICATION"}
          </span>
          <h1 className="text-3xl font-black text-charcoal sm:text-4xl">
            {language === "sw" ? "Tafuta Mechi Yako ya SACCO" : "Find Your SACCO Match"}
          </h1>
          <p className="text-sm text-charcoal/70 mt-2">
            {language === "sw" 
              ? "Jaza fomu hii rahisi ya hatua nne ili ulinganishwe na mikopo inayolingana na mavuno yako." 
              : "Complete this simple four-step questionnaire to get matched with harvest-aligned loan options."}
          </p>
        </div>

        <ApplicationForm />
      </div>
    </div>
  );
}
