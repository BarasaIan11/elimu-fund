"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials = () => {
  const { t, language } = useLanguage();

  const reviews = [
    {
      initials: "MN",
      initialsBg: "bg-green text-white",
      name: "Mama Njeri",
      role: language === "sw" ? "Mkulima wa Kahawa, Nyeri" : "Coffee Farmer, Nyeri",
      quote:
        language === "sw"
          ? "ElimuFund ilinisaidia sana wakati mavuno ya kahawa yalipochelewa. Ada ya shule ilihitajika, lakini mfumo ulipata SACCO iliyoelewa mzunguko wangu wa kilimo. Binti yangu hakukosa hata siku moja ya masomo."
          : "ElimuFund helped me when the coffee harvest was late. The school fees were due, but the system found a SACCO that understood my farming cycle. My daughter didn't miss a single day.",
    },
    {
      initials: "KO",
      initialsBg: "bg-amber text-white",
      name: "Kevin Omandi",
      role: language === "sw" ? "Mfanyabiashara Ndogo, Kisumu" : "Small Business Owner, Kisumu",
      quote:
        language === "sw"
          ? "Nilikuwa nimechoka na ada zilizofichwa za programu za mikopo. ElimuFund iliniunganisha moja kwa moja na SACCO iliyosajiliwa. Mchakato ulikuwa wazi, na nilijisikia kuheshimiwa wakati wote."
          : "I was tired of hidden fees from loan apps. ElimuFund connected me directly with a registered SACCO. The process was transparent, and I felt respected throughout.",
    },
  ];

  return (
    <section className="relative py-20 bg-cream">
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
            {t("testimonials.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-charcoal mt-2"
          >
            {t("testimonials.title")}
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative p-8 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all-300 flex flex-col justify-between"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 text-stone-100">
                <Quote size={56} className="opacity-40" />
              </div>

              {/* Quote Text */}
              <p className="text-base text-charcoal/80 leading-relaxed italic mb-8 relative z-10">
                &ldquo;{rev.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-stone-100 pt-6 mt-auto">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold shadow-sm ${rev.initialsBg}`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal">{rev.name}</h4>
                  <p className="text-xs text-charcoal/60 mt-0.5">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
