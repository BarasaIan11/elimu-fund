"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { FormData } from "../lib/types";
import {
  User,
  Briefcase,
  GraduationCap,
  FileCheck2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Sun,
  Leaf,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// List of all 47 counties of Kenya
const counties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", 
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", 
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", 
  "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", 
  "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", 
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", 
  "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi", 
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

const occupations = [
  "Market Vendor", "Farmer - Maize", "Farmer - Coffee", "Farmer - Tea", 
  "Farmer - Matooke", "Farmer - Sugarcane", "Small Business Owner", 
  "Formal Employee", "Casual Laborer", "Other"
];

const incomeRanges = [
  "Below KES 10,000", "KES 10,000–25,000", "KES 25,000–50,000", 
  "KES 50,000–100,000", "Above KES 100,000"
];

const months = [
  { short: "Jan", long: "January" },
  { short: "Feb", long: "February" },
  { short: "Mar", long: "March" },
  { short: "Apr", long: "April" },
  { short: "May", long: "May" },
  { short: "Jun", long: "June" },
  { short: "Jul", long: "July" },
  { short: "Aug", long: "August" },
  { short: "Sept", long: "September" },
  { short: "Oct", long: "October" },
  { short: "Nov", long: "November" },
  { short: "Dec", long: "December" },
];

export const ApplicationForm = () => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    county: "",
    phone: "",
    occupation: "",
    monthlyIncome: "",
    harvestMonths: [],
    schoolName: "",
    schoolTerm: "Term 1",
    loanAmount: 25000,
    childrenCount: 1,
    consentDPA: false,
    consentTruth: false,
  });

  // Validations per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = language === "sw" ? "Jina linahitajika" : "Name is required";
      }
      if (!formData.county) {
        newErrors.county = language === "sw" ? "Tafadhali chagua kaunti" : "Please select a county";
      }
      // Kenya phone validation: starts with 07, 01, +254, or 254 followed by 8 digits
      const phoneRegex = /^(?:254|\+254|0)?(7|1)\d{8}$/;
      if (!formData.phone.trim()) {
        newErrors.phone = language === "sw" ? "Nambari ya simu inahitajika" : "Phone number is required";
      } else if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = language === "sw" ? "Nambari ya simu isiyo halali (mfano: 0712345678)" : "Invalid Kenya phone number (e.g. 0712345678)";
      }
    }

    if (step === 2) {
      if (!formData.occupation) {
        newErrors.occupation = language === "sw" ? "Tafadhali chagua kazi yako" : "Please select your occupation";
      }
      if (!formData.monthlyIncome) {
        newErrors.monthlyIncome = language === "sw" ? "Tafadhali chagua mapato yako" : "Please select your monthly income";
      }
      // Harvest months only required if they are a farmer
      const isFarmer = formData.occupation.toLowerCase().includes("farmer");
      if (isFarmer && formData.harvestMonths.length === 0) {
        newErrors.harvestMonths = language === "sw" ? "Tafadhali chagua angalau mwezi mmoja wa mavuno" : "Please select at least one harvest month";
      }
    }

    if (step === 3) {
      if (!formData.schoolName.trim()) {
        newErrors.schoolName = language === "sw" ? "Jina la shule linahitajika" : "School name is required";
      }
      if (!formData.schoolTerm) {
        newErrors.schoolTerm = language === "sw" ? "Tafadhali chagua muhula" : "Please select a school term";
      }
    }

    if (step === 4) {
      if (!formData.consentDPA) {
        newErrors.consentDPA = language === "sw" ? "Lazima ukubali idhini ya DPA" : "You must consent to DPA agreement";
      }
      if (!formData.consentTruth) {
        newErrors.consentTruth = language === "sw" ? "Lazima uthibitishe ukweli wa taarifa" : "You must confirm details are truthful";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleToggleMonth = (month: string) => {
    setFormData((prev) => {
      const exists = prev.harvestMonths.includes(month);
      const newMonths = exists
        ? prev.harvestMonths.filter((m) => m !== month)
        : [...prev.harvestMonths, month];
      return { ...prev, harvestMonths: newMonths };
    });
    // clear error for harvest months if selected
    if (errors.harvestMonths) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.harvestMonths;
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      sessionStorage.setItem("elimufund-formData", JSON.stringify(formData));
      router.push("/results");
    }
  };

  // Active step message list helper
  const getStepMessage = (step: number) => {
    if (language === "sw") {
      switch (step) {
        case 1:
          return "Karibu! Tuanze na maelezo yako ya kibinafsi.";
        case 2:
          return "Tueleze kuhusu mzunguko wako wa kazi na mapato.";
        case 3:
          return "Jaza maelezo kuhusu shule na mkopo unaohitaji.";
        case 4:
          return "Mwisho! Kagua maelezo yako na utoe idhini kutuma ombi.";
        default:
          return "";
      }
    } else {
      switch (step) {
        case 1:
          return "Welcome! Let's start with your personal details.";
        case 2:
          return "Tell us about your work, income, and agricultural cycles.";
        case 3:
          return "Add details about the school, term needed, and amount.";
        case 4:
          return "Almost done! Verify your details and give consent.";
        default:
          return "";
      }
    }
  };

  // Stepper steps configuration
  const stepsConfig = [
    { label: language === "sw" ? "Hatua ya 1" : "Step 1", title: t("form.step1Title"), icon: <User size={18} /> },
    { label: language === "sw" ? "Hatua ya 2" : "Step 2", title: t("form.step2Title"), icon: <Briefcase size={18} /> },
    { label: language === "sw" ? "Hatua ya 3" : "Step 3", title: t("form.step3Title"), icon: <GraduationCap size={18} /> },
    { label: language === "sw" ? "Hatua ya 4" : "Step 4", title: t("form.step4Title"), icon: <FileCheck2 size={18} /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sm:p-10">
      {/* 1. Progress Bar / Stepper */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between relative">
          {/* Connector Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-stone-200 z-0" />
          
          {/* Progress fill */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-amber transition-all duration-500 z-0" 
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />

          {stepsConfig.map((s, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <button
                  type="button"
                  onClick={() => stepNum < currentStep && setCurrentStep(stepNum)}
                  disabled={stepNum >= currentStep}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 font-bold ${
                    isActive
                      ? "bg-green text-white border-green scale-110 shadow-md ring-4 ring-green/20"
                      : isCompleted
                      ? "bg-amber text-white border-amber cursor-pointer hover:bg-amber-hover"
                      : "bg-white text-stone-400 border-stone-300 cursor-not-allowed"
                  }`}
                >
                  {s.icon}
                </button>
                <span className="text-[10px] font-extrabold uppercase mt-2 text-stone-400 tracking-wider">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic step message */}
        <div className="text-center mt-6">
          <p className="text-sm font-semibold italic text-amber">
            {getStepMessage(currentStep)}
          </p>
        </div>
      </div>

      {/* 2. Main Form Form Wrapper */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-extrabold text-charcoal">{t("form.step1Title")}</h2>
                <p className="text-xs text-charcoal/60 mt-1">{t("form.step1Subtitle")}</p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal">{t("form.nameLabel")}</label>
                <input
                  type="text"
                  placeholder={t("form.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-cream/30 text-charcoal transition-all focus:border-green focus:ring-4 focus:ring-green/10 ${
                    errors.name ? "border-red-500 bg-red-50/20" : "border-stone-200"
                  }`}
                />
                {errors.name && <span className="text-xs text-red-500 font-semibold">{errors.name}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* County */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-charcoal">{t("form.countyLabel")}</label>
                  <select
                    value={formData.county}
                    onChange={(e) => {
                      setFormData({ ...formData, county: e.target.value });
                      if (errors.county) setErrors({ ...errors, county: "" });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border bg-cream/30 text-charcoal transition-all focus:border-green focus:ring-4 focus:ring-green/10 ${
                      errors.county ? "border-red-500" : "border-stone-200"
                    }`}
                  >
                    <option value="">-- Select County --</option>
                    {counties.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.county && <span className="text-xs text-red-500 font-semibold">{errors.county}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-charcoal">{t("form.phoneLabel")}</label>
                  <input
                    type="text"
                    placeholder={t("form.phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border bg-cream/30 text-charcoal transition-all focus:border-green focus:ring-4 focus:ring-green/10 ${
                      errors.phone ? "border-red-500 bg-red-50/20" : "border-stone-200"
                    }`}
                  />
                  {errors.phone && <span className="text-xs text-red-500 font-semibold">{errors.phone}</span>}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Work and Income */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-extrabold text-charcoal">{t("form.step2Title")}</h2>
                <p className="text-xs text-charcoal/60 mt-1">Repayments are aligned dynamically based on your cycle</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Occupation */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-charcoal">{t("form.occupationLabel")}</label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => {
                      setFormData({ ...formData, occupation: e.target.value });
                      if (errors.occupation) setErrors({ ...errors, occupation: "" });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border bg-cream/30 text-charcoal transition-all focus:border-green focus:ring-4 focus:ring-green/10 ${
                      errors.occupation ? "border-red-500" : "border-stone-200"
                    }`}
                  >
                    <option value="">-- Select Occupation --</option>
                    {occupations.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                  {errors.occupation && (
                    <span className="text-xs text-red-500 font-semibold">{errors.occupation}</span>
                  )}
                </div>

                {/* Income */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-charcoal">{t("form.incomeLabel")}</label>
                  <select
                    value={formData.monthlyIncome}
                    onChange={(e) => {
                      setFormData({ ...formData, monthlyIncome: e.target.value });
                      if (errors.monthlyIncome) setErrors({ ...errors, monthlyIncome: "" });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border bg-cream/30 text-charcoal transition-all focus:border-green focus:ring-4 focus:ring-green/10 ${
                      errors.monthlyIncome ? "border-red-500" : "border-stone-200"
                    }`}
                  >
                    <option value="">-- Select Income Range --</option>
                    {incomeRanges.map((inc) => (
                      <option key={inc} value={inc}>
                        {inc}
                      </option>
                    ))}
                  </select>
                  {errors.monthlyIncome && (
                    <span className="text-xs text-red-500 font-semibold">{errors.monthlyIncome}</span>
                  )}
                </div>
              </div>

              {/* Harvest Months Calendar Planner */}
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-sm font-bold text-charcoal block">{t("form.harvestLabel")}</label>
                  <span className="text-xs text-charcoal/50">Multi-select any months where you have higher revenue flows</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {months.map((m) => {
                    const isSelected = formData.harvestMonths.includes(m.short);
                    return (
                      <button
                        key={m.short}
                        type="button"
                        onClick={() => handleToggleMonth(m.short)}
                        className={`py-3 rounded-xl font-bold border transition-all duration-200 ${
                          isSelected
                            ? "bg-green text-white border-green shadow-sm"
                            : "bg-[#FAF7F2] text-charcoal/80 border-stone-200 hover:bg-stone-100"
                        }`}
                      >
                        {m.short}
                      </button>
                    );
                  })}
                </div>
                {errors.harvestMonths && (
                  <span className="text-xs text-red-500 font-semibold">{errors.harvestMonths}</span>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: School and Loan Details */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-extrabold text-charcoal">{t("form.step3Title")}</h2>
                <p className="text-xs text-charcoal/60 mt-1">Configure your specific school needs</p>
              </div>

              {/* School Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal">{t("form.schoolNameLabel")}</label>
                <input
                  type="text"
                  placeholder="e.g. Alliance High School"
                  value={formData.schoolName}
                  onChange={(e) => {
                    setFormData({ ...formData, schoolName: e.target.value });
                    if (errors.schoolName) setErrors({ ...errors, schoolName: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-cream/30 text-charcoal transition-all focus:border-green focus:ring-4 focus:ring-green/10 ${
                    errors.schoolName ? "border-red-500 bg-red-50/20" : "border-stone-200"
                  }`}
                />
                {errors.schoolName && (
                  <span className="text-xs text-red-500 font-semibold">{errors.schoolName}</span>
                )}
              </div>

              {/* School Term Radio Cards */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-charcoal">{t("form.termLabel")}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Term 1 */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:border-green/40 hover:scale-[1.01] transition-all-300 ${
                      formData.schoolTerm === "Term 1"
                        ? "border-green bg-green/5 ring-2 ring-green/20"
                        : "border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="schoolTerm"
                      value="Term 1"
                      checked={formData.schoolTerm === "Term 1"}
                      onChange={() => setFormData({ ...formData, schoolTerm: "Term 1" })}
                      className="sr-only"
                    />
                    <Sparkles className="h-5 w-5 text-amber shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-charcoal block">Term 1</span>
                      <span className="text-[10px] text-charcoal/60">January</span>
                    </div>
                  </label>

                  {/* Term 2 */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:border-green/40 hover:scale-[1.01] transition-all-300 ${
                      formData.schoolTerm === "Term 2"
                        ? "border-green bg-green/5 ring-2 ring-green/20"
                        : "border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="schoolTerm"
                      value="Term 2"
                      checked={formData.schoolTerm === "Term 2"}
                      onChange={() => setFormData({ ...formData, schoolTerm: "Term 2" })}
                      className="sr-only"
                    />
                    <Sun className="h-5 w-5 text-amber shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-charcoal block">Term 2</span>
                      <span className="text-[10px] text-charcoal/60">May</span>
                    </div>
                  </label>

                  {/* Term 3 */}
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:border-green/40 hover:scale-[1.01] transition-all-300 ${
                      formData.schoolTerm === "Term 3"
                        ? "border-green bg-green/5 ring-2 ring-green/20"
                        : "border-stone-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="schoolTerm"
                      value="Term 3"
                      checked={formData.schoolTerm === "Term 3"}
                      onChange={() => setFormData({ ...formData, schoolTerm: "Term 3" })}
                      className="sr-only"
                    />
                    <Leaf className="h-5 w-5 text-amber shrink-0" />
                    <div>
                      <span className="text-sm font-bold text-charcoal block">Term 3</span>
                      <span className="text-[10px] text-charcoal/60">September</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Loan Amount Range Slider */}
              <div className="flex flex-col gap-3 py-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-charcoal">{t("form.amountLabel")}</label>
                  <span className="text-2xl font-black text-amber">
                    KES {formData.loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-extrabold tracking-wider">
                  <span>KES 5,000</span>
                  <span>KES 50,000</span>
                  <span>KES 100,000</span>
                </div>
              </div>

              {/* Children Count Stepper */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-cream/40 border border-stone-200/80">
                <div>
                  <label className="text-sm font-bold text-charcoal block">{t("form.childrenLabel")}</label>
                  <span className="text-xs text-charcoal/50">Number of dependents schooling</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        childrenCount: Math.max(1, prev.childrenCount - 1),
                      }))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white hover:bg-stone-100 hover:border-stone-400 active:scale-95 transition-all text-charcoal"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-black text-charcoal w-6 text-center">
                    {formData.childrenCount}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        childrenCount: Math.min(10, prev.childrenCount + 1),
                      }))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white hover:bg-stone-100 hover:border-stone-400 active:scale-95 transition-all text-charcoal"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Consent & Summary */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-2xl font-extrabold text-charcoal">{t("form.step4Title")}</h2>
                <p className="text-xs text-charcoal/60 mt-1">Verify details before submission</p>
              </div>

              {/* Summary Card */}
              <div className="p-6 rounded-2xl bg-cream/40 border border-stone-200/80 space-y-4">
                <h3 className="text-sm font-extrabold uppercase text-amber tracking-wider border-b border-stone-200/40 pb-2">
                  Application Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block">
                      Name
                    </span>
                    <span className="font-semibold text-charcoal">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block">
                      Phone & County
                    </span>
                    <span className="font-semibold text-charcoal">
                      {formData.phone} ({formData.county})
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block">
                      Occupation & Income
                    </span>
                    <span className="font-semibold text-charcoal">
                      {formData.occupation} • {formData.monthlyIncome}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block">
                      School, Term & Kids
                    </span>
                    <span className="font-semibold text-charcoal">
                      {formData.schoolName} ({formData.schoolTerm}) • {formData.childrenCount} children
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block">
                      Farming Cycle / Peak Income Months
                    </span>
                    <span className="font-semibold text-charcoal">
                      {formData.harvestMonths.length > 0
                        ? formData.harvestMonths.join(", ")
                        : "None selected / regular income"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wide block">
                      Amount Requested
                    </span>
                    <span className="text-base font-extrabold text-green">
                      KES {formData.loanAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Consent check 1 */}
              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.consentDPA}
                    onChange={(e) => {
                      setFormData({ ...formData, consentDPA: e.target.checked });
                      if (errors.consentDPA) setErrors({ ...errors, consentDPA: "" });
                    }}
                    className="h-5 w-5 mt-0.5 rounded border-stone-300 text-green focus:ring-green/20 accent-green"
                  />
                  <span className="text-xs text-charcoal/80 leading-relaxed font-semibold">
                    {t("form.consent1")}
                  </span>
                </label>
                {errors.consentDPA && (
                  <span className="text-xs text-red-500 font-semibold pl-8">{errors.consentDPA}</span>
                )}
              </div>

              {/* Consent check 2 */}
              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.consentTruth}
                    onChange={(e) => {
                      setFormData({ ...formData, consentTruth: e.target.checked });
                      if (errors.consentTruth) setErrors({ ...errors, consentTruth: "" });
                    }}
                    className="h-5 w-5 mt-0.5 rounded border-stone-300 text-green focus:ring-green/20 accent-green"
                  />
                  <span className="text-xs text-charcoal/80 leading-relaxed font-semibold">
                    {t("form.consent2")}
                  </span>
                </label>
                {errors.consentTruth && (
                  <span className="text-xs text-red-500 font-semibold pl-8">{errors.consentTruth}</span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Form Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-6 mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-charcoal hover:bg-stone-50 active:scale-95 transition-all"
            >
              <ArrowLeft size={16} />
              <span>{t("form.backBtn")}</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white hover:bg-amber-hover hover:scale-105 shadow-sm active:scale-95 transition-all"
            >
              <span>{t("form.nextBtn")}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-green px-8 py-3.5 text-base font-semibold text-white hover:bg-green-hover hover:scale-105 shadow-md active:scale-95 transition-all"
            >
              <span>{t("form.submitBtn")}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
