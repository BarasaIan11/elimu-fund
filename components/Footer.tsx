"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-stone-200/60 bg-[#FAF7F2] py-12 text-charcoal/80">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col flex-wrap justify-between gap-8 md:flex-row md:items-center">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-2xl font-extrabold text-amber">
              ElimuFund
            </Link>
            <p className="text-xs text-charcoal/60 max-w-sm italic">
              &ldquo;Elimu ni Uwekezaji Bora.&rdquo; &mdash; {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-charcoal/80">
            <Link href="#" className="hover:text-amber transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-amber transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber transition-colors">
              SASRA Compliance
            </Link>
            <Link href="#" className="hover:text-amber transition-colors">
              DPA 2022
            </Link>
            <Link href="#" className="hover:text-amber transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Separator line */}
        <div className="my-8 h-[1px] w-full bg-stone-200" />

        {/* Bottom Bar: Copyright and Badges */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-charcoal/60">
          <div>
            <p>{t("footer.copyright")}</p>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 rounded-full border border-green/20 bg-green/5 px-3 py-1 text-[11px] font-semibold text-green">
              <ShieldCheck size={14} />
              <span>DPA 2022 Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-amber/20 bg-amber/5 px-3 py-1 text-[11px] font-semibold text-amber">
              <CheckCircle2 size={14} />
              <span>SASRA Regulated Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
