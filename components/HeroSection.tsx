"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden hero-texture py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col gap-6 text-left"
        >
          <span className="text-sm font-extrabold tracking-widest text-amber uppercase">
            {t("hero.eyebrow")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-charcoal leading-tight">
            {t("hero.headline")}
          </h1>
          <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-xl">
            {t("hero.subtext")}
          </p>
          <div className="pt-2">
            <Link href="/apply">
              <button className="rounded-full bg-amber px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-amber-hover hover:scale-105 shadow-md flex items-center gap-2 group">
                {t("hero.cta")}
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Illustration Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-6 flex justify-center"
        >
          <div className="relative w-full max-w-lg aspect-square bg-[#E8DCC4] rounded-[2.5rem] shadow-xl overflow-hidden border-4 border-white flex items-center justify-center p-4">
            
            {/* Custom SVG Illustration */}
            <svg
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-contain"
            >
              {/* Warm decorative circles in background */}
              <circle cx="250" cy="250" r="210" fill="#EADFCE" />
              <circle cx="360" cy="180" r="100" fill="#D6C6AA" opacity="0.4" />
              <circle cx="120" cy="380" r="80" fill="#2D6A4F" opacity="0.1" />

              {/* FATHER CHARACTER */}
              <g id="father">
                {/* Father Shoulder / Torso (Green Shirt) */}
                <path
                  d="M250 320 C290 320, 390 340, 410 440 L410 500 L250 500 Z"
                  fill="#2D6A4F"
                />
                {/* Father collar */}
                <path d="M280 340 L310 390 L340 340 Z" fill="#214E3A" />
                <path d="M340 340 L370 390 L390 350 L340 340 Z" fill="#214E3A" />

                {/* Father Neck */}
                <rect x="310" y="270" width="50" height="80" rx="10" fill="#C68B59" />
                <path d="M310 320 C310 320, 335 345, 360 320 Z" fill="#B37847" />

                {/* Father Head */}
                <path
                  d="M280 200 C280 140, 390 140, 390 200 C390 260, 370 290, 335 290 C300 290, 280 260, 280 200 Z"
                  fill="#D89E6B"
                />
                
                {/* Father Ear */}
                <circle cx="280" cy="210" r="12" fill="#D89E6B" />
                <circle cx="280" cy="210" r="6" fill="#C68B59" />

                {/* Father Beard */}
                <path
                  d="M285 220 C285 275, 385 275, 385 220 C385 290, 360 302, 335 302 C310 302, 285 290, 285 220 Z"
                  fill="#1A1A2E"
                />
                {/* Father Mustache */}
                <path d="M305 242 C320 238, 350 238, 365 242 C355 248, 315 248, 305 242 Z" fill="#1A1A2E" />

                {/* Father Eyes */}
                <ellipse cx="315" cy="195" rx="5" ry="3" fill="#1A1A2E" />
                <ellipse cx="355" cy="195" rx="5" ry="3" fill="#1A1A2E" />
                {/* Father Eyebrows */}
                <path d="M305 188 C315 185, 325 188, 325 188" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
                <path d="M345 188 C355 185, 365 188, 365 188" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />

                {/* Father Nose */}
                <path d="M335 195 L331 220 L340 220" stroke="#B37847" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Father Smile */}
                <path d="M322 254 C328 260, 342 260, 348 254" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round" />

                {/* Father Hair */}
                <path
                  d="M280 190 C290 140, 380 140, 390 190 C395 180, 395 160, 380 145 C365 130, 305 130, 290 145 C280 160, 280 180, 280 190 Z"
                  fill="#1A1A2E"
                />
                
                {/* Father arm around child */}
                <path
                  d="M260 360 C240 370, 205 385, 200 420 C195 450, 205 480, 215 500"
                  stroke="#2D6A4F"
                  strokeWidth="35"
                  strokeLinecap="round"
                />
                {/* Father hand */}
                <path
                  d="M200 420 C190 415, 175 425, 172 435 C170 445, 185 455, 195 455"
                  stroke="#D89E6B"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
              </g>

              {/* SON CHARACTER */}
              <g id="son">
                {/* Son Torso (School Uniform Green/White) */}
                <path
                  d="M120 440 C140 440, 220 445, 240 490 L240 500 L90 500 L90 490 C95 460, 110 440, 120 440 Z"
                  fill="#2D6A4F"
                />
                {/* White Shirt Collar visible */}
                <path d="M140 440 L165 480 L190 440 Z" fill="#FAF7F2" />
                
                {/* Red Striped School Tie */}
                <path d="M160 460 L170 460 L178 520 L152 520 Z" fill="#C17B2F" />
                {/* Tie stripes */}
                <path d="M157 475 L173 470" stroke="#FAF7F2" strokeWidth="3" />
                <path d="M155 490 L175 485" stroke="#FAF7F2" strokeWidth="3" />
                <path d="M153 505 L177 500" stroke="#FAF7F2" strokeWidth="3" />

                {/* Son Neck */}
                <rect x="150" y="390" width="30" height="50" rx="5" fill="#D89E6B" />

                {/* Son Head */}
                <path
                  d="M125 320 C125 270, 205 270, 205 320 C205 370, 190 395, 165 395 C140 395, 125 370, 125 320 Z"
                  fill="#E2AB7E"
                />

                {/* Son Ears */}
                <circle cx="125" cy="330" r="10" fill="#E2AB7E" />
                <circle cx="205" cy="330" r="10" fill="#E2AB7E" />

                {/* Son Eyes */}
                <circle cx="150" cy="320" r="4.5" fill="#1A1A2E" />
                <circle cx="180" cy="320" r="4.5" fill="#1A1A2E" />

                {/* Son Nose */}
                <path d="M165 320 L162 338 L168 338" stroke="#C68B59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Son Smile */}
                <path d="M153 355 C160 365, 170 365, 177 355" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />

                {/* Son Hair */}
                <path
                  d="M125 310 C130 270, 200 270, 205 310 C210 295, 195 265, 165 265 C135 265, 120 295, 125 310 Z"
                  fill="#1A1A2E"
                />
              </g>

              {/* School badge on Father's/Son's Shirt */}
              <circle cx="365" cy="430" r="12" fill="#FAF7F2" opacity="0.9" />
              <path d="M361 426 L369 434 M369 426 L361 434" stroke="#C17B2F" strokeWidth="2" />
            </svg>
            
          </div>
        </motion.div>

      </div>

      {/* Background Accent Graphics */}
      <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 rounded-full bg-amber/5 blur-3xl z-0" />
      <div className="absolute left-0 bottom-0 translate-y-12 -translate-x-12 w-80 h-80 rounded-full bg-green/5 blur-3xl z-0" />
    </section>
  );
};
