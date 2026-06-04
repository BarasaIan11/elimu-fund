"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: t("nav.howItWorks"), href: "/#how-it-works" },
    { label: t("nav.saccos"), href: "/saccos" },
  ];

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/";
    }
    return pathname === href;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-stone-200/50 bg-[#FAF7F2]/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-amber">
            ElimuFund
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-amber ${
                    active
                      ? "text-amber border-b-2 border-amber pb-1"
                      : "text-charcoal/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Language Toggle Pill */}
            <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-white/60 px-3 py-1.5 shadow-sm text-xs font-semibold">
              <button
                onClick={() => language !== "en" && toggleLanguage()}
                className={`transition-opacity duration-300 ${
                  language === "en"
                    ? "text-amber underline font-bold"
                    : "text-stone-400"
                }`}
              >
                EN
              </button>
              <span className="text-stone-300">|</span>
              <button
                onClick={() => language !== "sw" && toggleLanguage()}
                className={`transition-opacity duration-300 ${
                  language === "sw"
                    ? "text-amber underline font-bold"
                    : "text-stone-400"
                }`}
              >
                SW
              </button>
            </div>

            {/* Apply Button */}
            <Link href="/apply">
              <button className="rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-hover hover:scale-105 shadow-sm">
                {t("nav.applyNow")}
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 text-charcoal md:hidden hover:bg-stone-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 top-full w-full border-b border-stone-200 bg-[#FAF7F2] px-6 py-8 shadow-xl md:hidden flex flex-col gap-6"
            >
              <nav className="flex flex-col gap-4 text-center">
                {navLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-semibold transition-colors py-2 ${
                        active ? "text-amber underline" : "text-charcoal"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Mobile Language Toggle */}
                <div className="mx-auto flex max-w-xs items-center justify-center gap-4 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold mt-2">
                  <span className="text-stone-400">Language:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => language !== "en" && toggleLanguage()}
                      className={`transition-opacity duration-300 ${
                        language === "en"
                          ? "text-amber underline font-bold"
                          : "text-stone-400"
                      }`}
                    >
                      English (EN)
                    </button>
                    <span className="text-stone-300">|</span>
                    <button
                      onClick={() => language !== "sw" && toggleLanguage()}
                      className={`transition-opacity duration-300 ${
                        language === "sw"
                          ? "text-amber underline font-bold"
                          : "text-stone-400"
                      }`}
                    >
                      Kiswahili (SW)
                    </button>
                  </div>
                </div>

                {/* Mobile Apply Button */}
                <Link href="/apply" className="w-full mt-4">
                  <button className="w-full rounded-full bg-amber py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-amber-hover">
                    {t("nav.applyNow")}
                  </button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
