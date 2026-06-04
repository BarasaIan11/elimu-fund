"use client";

import React, { useState, useRef } from "react";
import { Sacco } from "../lib/types";
import { FormData } from "../lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  FileText,
  MapPin,
  X,
  CheckCircle2,
  ExternalLink,
  Printer,
  Copy,
  Check,
  Globe,
} from "lucide-react";

interface ContactModalProps {
  sacco: Sacco;
  formData: FormData | null;
  matchPercentage?: number;
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "call" | "whatsapp" | "documents";

export const ContactModal: React.FC<ContactModalProps> = ({
  sacco,
  formData,
  matchPercentage,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("call");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const referralRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !sacco.contact) return null;

  const { contact } = sacco;

  // Build pre-filled WhatsApp message
  const whatsappMessage = formData
    ? `Hello ${sacco.name},%0A%0AI was matched with your SACCO through ElimuFund (${matchPercentage ?? 0}% match).%0A%0A*My Details:*%0A• Name: ${formData.name}%0A• County: ${formData.county}%0A• Occupation: ${formData.occupation}%0A• Income: ${formData.monthlyIncome}%0A• Loan Needed: KES ${formData.loanAmount.toLocaleString()}%0A• School Term: ${formData.schoolTerm}%0A• Peak Income Months: ${formData.harvestMonths.join(", ") || "Regular monthly"}%0A%0AKindly guide me on the next steps to apply for a school fees loan. Thank you.`
    : `Hello ${sacco.name},%0AI was matched with your SACCO through ElimuFund and I would like to enquire about school fees loans. Thank you.`;

  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`;

  // Generate a unique reference ID for this applicant
  const refId = formData
    ? `EF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
    : "EF-2024-XXXXX";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("referral-card-print");
    if (!printContent) return;
    const win = window.open("", "_blank", "width=800,height=600");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>ElimuFund Referral Card — ${sacco.name}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #FAF7F2; padding: 40px; color: #1A1A2E; }
            .card { background: white; border: 2px solid #C17B2F; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #C17B2F; padding-bottom: 16px; margin-bottom: 24px; }
            .logo { font-size: 24px; font-weight: 900; color: #C17B2F; }
            .ref { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
            .sacco-name { font-size: 20px; font-weight: 700; color: #2D6A4F; margin-bottom: 4px; }
            .badge { display: inline-block; background: #D8F3DC; color: #2D6A4F; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
            .section { margin-top: 20px; }
            .section-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #C17B2F; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .field label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 1px; display: block; }
            .field span { font-size: 14px; font-weight: 600; color: #1A1A2E; }
            .amount { font-size: 28px; font-weight: 900; color: #C17B2F; }
            .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 10px; color: #888; text-align: center; line-height: 1.6; }
            .match { font-size: 22px; font-weight: 900; color: #2D6A4F; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div>
                <div class="logo">ElimuFund</div>
                <div class="ref">Referral Card • ${refId}</div>
              </div>
              <div style="text-align:right">
                <div class="match">${matchPercentage ?? "--"}% Match</div>
                <div style="font-size:10px;color:#888">ElimuFund Score</div>
              </div>
            </div>

            <div>
              <div class="sacco-name">${sacco.name}</div>
              <span class="badge">${sacco.badge}</span>
              <div style="font-size:12px;color:#666;margin-top:4px">${sacco.focus}</div>
            </div>

            <div class="section">
              <div class="section-title">Applicant Details</div>
              <div class="grid">
                <div class="field"><label>Full Name</label><span>${formData?.name || "—"}</span></div>
                <div class="field"><label>Phone</label><span>${formData?.phone || "—"}</span></div>
                <div class="field"><label>County</label><span>${formData?.county || "—"}</span></div>
                <div class="field"><label>Occupation</label><span>${formData?.occupation || "—"}</span></div>
                <div class="field"><label>Monthly Income</label><span>${formData?.monthlyIncome || "—"}</span></div>
                <div class="field"><label>Peak Months</label><span>${formData?.harvestMonths.join(", ") || "Regular"}</span></div>
                <div class="field"><label>School Name</label><span>${formData?.schoolName || "—"}</span></div>
                <div class="field"><label>School Term</label><span>${formData?.schoolTerm || "—"}</span></div>
                <div class="field"><label>No. of Children</label><span>${formData?.childrenCount || "—"}</span></div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Loan Request</div>
              <div class="amount">KES ${formData?.loanAmount.toLocaleString() || "—"}</div>
              <div style="font-size:12px;color:#888;margin-top:4px">Repayment: ${sacco.repayment} • Rate: ${sacco.rate}% p.a</div>
            </div>

            <div class="footer">
              Applicant has consented to Kenya DPA 2022 data terms. This card was generated by ElimuFund — School Fees Loan Matcher.<br/>
              This referral is not a loan guarantee. Subject to SACCO membership and eligibility requirements.
            </div>
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  const tabs = [
    { id: "call" as Tab, label: "Call / Visit", icon: <Phone size={15} /> },
    { id: "whatsapp" as Tab, label: "WhatsApp", icon: <MessageCircle size={15} /> },
    { id: "documents" as Tab, label: "Documents", icon: <FileText size={15} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-stone-100 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-light-green border border-green/20 px-2.5 py-0.5 text-[11px] font-bold text-green flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                      {matchPercentage}% Match
                    </span>
                    <span className="text-[10px] font-bold text-amber uppercase tracking-wider border border-amber/20 rounded-full px-2 py-0.5">{sacco.badge}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-charcoal leading-tight">{sacco.name}</h2>
                  <p className="text-xs text-charcoal/50 mt-0.5">{sacco.focus}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-stone-100 text-charcoal/60 hover:text-charcoal transition-colors shrink-0 ml-4"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-stone-100 shrink-0 px-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-bold transition-all border-b-2 -mb-[1px] ${
                      activeTab === tab.id
                        ? "border-amber text-amber"
                        : "border-transparent text-charcoal/50 hover:text-charcoal"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="overflow-y-auto flex-grow">
                <AnimatePresence mode="wait">

                  {/* CALL / VISIT TAB */}
                  {activeTab === "call" && (
                    <motion.div
                      key="call"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 space-y-5"
                    >
                      {/* Phone Number */}
                      <div className="p-4 bg-green/5 border border-green/15 rounded-2xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-green text-white flex items-center justify-center shrink-0">
                            <Phone size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Call Direct</p>
                            <p className="text-lg font-extrabold text-charcoal tracking-wide">{contact.phone}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <a
                            href={`tel:${contact.phone.replace(/\s/g, "")}`}
                            className="rounded-full bg-green text-white px-4 py-2 text-xs font-bold hover:bg-green-hover transition-colors text-center"
                          >
                            Call Now
                          </a>
                          <button
                            onClick={handleCopyPhone}
                            className="rounded-full border border-stone-300 text-charcoal px-4 py-2 text-xs font-bold hover:bg-stone-50 transition-colors flex items-center gap-1 justify-center"
                          >
                            {copiedPhone ? <Check size={12} className="text-green" /> : <Copy size={12} />}
                            {copiedPhone ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>

                      {/* Website */}
                      {contact.website && (
                        <a
                          href={contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 hover:border-amber/30 hover:bg-amber/5 transition-all group"
                        >
                          <Globe size={16} className="text-amber shrink-0" />
                          <span className="text-sm font-semibold text-charcoal/80 group-hover:text-charcoal">{contact.website}</span>
                          <ExternalLink size={14} className="text-stone-400 ml-auto group-hover:text-amber" />
                        </a>
                      )}

                      {/* Branches */}
                      <div>
                        <h3 className="text-xs font-extrabold text-charcoal uppercase tracking-wider mb-3 flex items-center gap-2">
                          <MapPin size={14} className="text-amber" />
                          Branch Locations
                        </h3>
                        <div className="space-y-2">
                          {contact.branches.map((branch, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-cream/40 rounded-xl border border-stone-100">
                              <span className="h-5 w-5 rounded-full bg-amber/10 text-amber text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-sm text-charcoal/80 font-medium">{branch}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* WHATSAPP TAB */}
                  {activeTab === "whatsapp" && (
                    <motion.div
                      key="whatsapp"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 space-y-5"
                    >
                      {/* WhatsApp CTA */}
                      <div className="p-5 bg-[#25D366]/5 border border-[#25D366]/20 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                            <MessageCircle size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-extrabold text-charcoal">WhatsApp {sacco.name}</p>
                            <p className="text-xs text-charcoal/50">Pre-filled with your application details</p>
                          </div>
                        </div>
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white py-3.5 text-sm font-bold hover:bg-[#1ebe5d] transition-colors"
                        >
                          <MessageCircle size={18} />
                          Open WhatsApp Chat
                        </a>
                      </div>

                      {/* Message Preview */}
                      <div>
                        <h3 className="text-xs font-extrabold text-charcoal uppercase tracking-wider mb-3">Message Preview</h3>
                        <div className="bg-[#ECE5DD] rounded-2xl p-4 relative">
                          <div className="bg-white rounded-xl p-3 shadow-sm text-sm text-charcoal/80 leading-relaxed space-y-1 max-h-48 overflow-y-auto">
                            <p>Hello <strong>{sacco.name}</strong>,</p>
                            <p>I was matched with your SACCO through ElimuFund (<strong>{matchPercentage}% match</strong>).</p>
                            <p className="font-bold mt-2">My Details:</p>
                            <p>• Name: <strong>{formData?.name || "—"}</strong></p>
                            <p>• County: <strong>{formData?.county || "—"}</strong></p>
                            <p>• Occupation: <strong>{formData?.occupation || "—"}</strong></p>
                            <p>• Loan Needed: <strong>KES {formData?.loanAmount.toLocaleString() || "—"}</strong></p>
                            <p>• School Term: <strong>{formData?.schoolTerm || "—"}</strong></p>
                            <p>• Peak Months: <strong>{formData?.harvestMonths.join(", ") || "Regular monthly"}</strong></p>
                            <p className="mt-2">Kindly guide me on the next steps to apply for a school fees loan. Thank you.</p>
                          </div>
                          <div className="absolute bottom-5 right-6 text-[10px] text-charcoal/40">✓✓</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* DOCUMENTS TAB */}
                  {activeTab === "documents" && (
                    <motion.div
                      key="documents"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 space-y-5"
                    >
                      {/* Required Documents */}
                      <div>
                        <h3 className="text-xs font-extrabold text-charcoal uppercase tracking-wider mb-1">Required Documents</h3>
                        <p className="text-xs text-charcoal/50 mb-4">Bring these when visiting a branch or submitting your application</p>
                        <div className="space-y-2">
                          {contact.documents.map((doc, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-cream/40 rounded-xl border border-stone-100">
                              <CheckCircle2 size={16} className="text-green shrink-0" />
                              <span className="text-sm text-charcoal/80 font-medium">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Referral Card Download */}
                      <div className="p-4 bg-amber/5 border border-amber/20 rounded-2xl space-y-3">
                        <div>
                          <h3 className="text-sm font-extrabold text-charcoal">Your ElimuFund Referral Card</h3>
                          <p className="text-xs text-charcoal/60 mt-1">
                            Print this card and carry it to the SACCO. It shows your pre-screened profile and ElimuFund match score.
                          </p>
                        </div>
                        <button
                          onClick={handlePrint}
                          className="w-full flex items-center justify-center gap-2 rounded-full bg-amber text-white py-3 text-sm font-bold hover:bg-amber-hover transition-colors shadow-sm"
                        >
                          <Printer size={16} />
                          Print / Download Referral Card
                        </button>
                        <p className="text-[10px] text-center text-charcoal/40">
                          Ref: {refId} • DPA 2022 Compliant
                        </p>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-stone-100 bg-cream/30 shrink-0">
                <p className="text-[10px] text-center text-charcoal/40 leading-relaxed">
                  ElimuFund is a matching platform, not a lender. Approval is subject to SACCO membership and eligibility criteria.
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
