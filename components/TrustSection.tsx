"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { ShieldCheck, BadgeCheck, Users, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";

export const TrustSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-20 bg-white border-t border-stone-100">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copy and Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col gap-6 text-left"
        >
          <span className="text-xs font-extrabold tracking-widest text-amber uppercase">
            {language === "sw" ? "SIRI NA USALAMA" : "TRUST AND SECURITY"}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">
            {t("trust.title")}
          </h2>
          
          <p className="text-base text-charcoal/80 leading-relaxed max-w-xl">
            {t("trust.body")}
          </p>

          {/* Compliance Pills */}
          <div className="flex flex-col gap-4 mt-2">
            
            {/* DPA Badge */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-cream border border-stone-100 shadow-sm hover:scale-[1.01] transition-all-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10 text-green shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal">DPA 2022 Compliant</h4>
                <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                  {t("trust.dpa")}
                </p>
              </div>
            </div>

            {/* SASRA Badge */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-cream border border-stone-100 shadow-sm hover:scale-[1.01] transition-all-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/10 text-amber shrink-0">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal">SASRA Regulated Partners</h4>
                <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                  {t("trust.sasra")}
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right Side: Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Card 1 */}
          <div className="p-8 bg-cream border border-stone-200/60 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all-300 flex items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-charcoal">4,520+</h3>
              <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider mt-1">
                {language === "sw" ? "Familia Zilizosaidiwa" : "Families Supported"}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-cream border border-stone-200/60 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all-300 flex items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber/10 text-amber">
              <PiggyBank className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-charcoal">KES 120M</h3>
              <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider mt-1">
                {language === "sw" ? "Jumla ya Ada Iliyolipwa" : "Total Fees Paid"}
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
