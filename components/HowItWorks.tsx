"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { ClipboardList, Cpu, Handshake } from "lucide-react";
import { motion } from "framer-motion";

export const HowItWorks = () => {
  const { t, language } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: <ClipboardList className="h-8 w-8 text-green" />,
      swTitle: "Jaza Fomu",
      enTitle: "Fill Your Details",
      desc: t("howItWorks.step1Desc"),
      bg: "bg-[#FAF7F2]",
    },
    {
      number: "02",
      icon: <Cpu className="h-8 w-8 text-amber" />,
      swTitle: "Tathmini Yako",
      enTitle: "We Screen You",
      desc: t("howItWorks.step2Desc"),
      bg: "bg-[#FAF7F2]",
    },
    {
      number: "03",
      icon: <Handshake className="h-8 w-8 text-terracotta" />,
      swTitle: "Pata Mechi Yako",
      enTitle: "Get Your Match",
      desc: t("howItWorks.step3Desc"),
      bg: "bg-[#FAF7F2]",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 bg-white">
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
            {t("howItWorks.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2"
          >
            {t("howItWorks.title")}
          </motion.h2>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Desktop Dotted Connecting Line */}
          <div className="hidden md:block absolute top-[76px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-stone-200 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center p-8 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all-300"
            >
              {/* Icon Bubble */}
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cream border border-stone-100 shadow-inner">
                {step.icon}
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-[10px] font-black text-white">
                  {step.number}
                </span>
              </div>

              {/* Swahili Main title (when SW is active) or English Main Title */}
              <h3 className="text-xl font-bold text-charcoal">
                {language === "sw" ? step.swTitle : step.enTitle}
              </h3>
              <p className="text-xs font-semibold text-stone-400 mt-1 uppercase tracking-wide">
                {language === "sw" ? step.enTitle : step.swTitle}
              </p>
              
              <p className="text-sm text-charcoal/70 leading-relaxed mt-4">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link href="/apply">
            <button className="rounded-full bg-green px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-green-hover hover:scale-105 shadow-md">
              {language === "sw" ? "Anza Kujaza Fomu sasa" : "Begin Application"}
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
