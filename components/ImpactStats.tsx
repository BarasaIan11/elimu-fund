"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Home, ShieldCheck, Landmark } from "lucide-react";
import { motion } from "framer-motion";

export const ImpactStats = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <Home className="h-8 w-8 text-amber" />,
      value: "2,500+",
      label: t("stats.families"),
      bgColor: "bg-cream border-stone-200/60",
      textColor: "text-charcoal",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-green" />,
      value: "50+",
      label: t("stats.saccos"),
      bgColor: "bg-light-green border-green/10",
      textColor: "text-green",
    },
    {
      icon: <Landmark className="h-8 w-8 text-white" />,
      value: "KES 150M+",
      label: t("stats.matched"),
      bgColor: "bg-amber border-amber/10 text-white",
      textColor: "text-white",
      isPrimary: true,
    },
  ];

  return (
    <section className="relative py-20 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-extrabold tracking-widest text-green uppercase"
          >
            {t("stats.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2"
          >
            {t("stats.title")}
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`flex flex-col items-center text-center p-8 rounded-2xl border shadow-sm hover:shadow-md hover:scale-[1.02] transition-all-300 ${stat.bgColor}`}
            >
              {/* Icon Bubble */}
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-inner ${
                  stat.isPrimary ? "bg-white/10" : "bg-white border border-stone-100"
                }`}
              >
                {stat.icon}
              </div>

              {/* Metric value */}
              <span className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-2 ${stat.textColor}`}>
                {stat.value}
              </span>

              {/* Label */}
              <span className={`text-sm font-semibold uppercase tracking-wider ${
                stat.isPrimary ? "text-white/80" : "text-charcoal/60"
              }`}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
