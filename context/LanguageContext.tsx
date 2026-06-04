"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../lib/translations';

export type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    const stored = localStorage.getItem('elimufund-language');
    if (stored === 'en' || stored === 'sw') {
      setLanguage(stored);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'sw' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('elimufund-language', nextLang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let value: any = translations[language];
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return path;
      }
    }
    return typeof value === 'string' ? value : path;
  };

  // Render children normally, context is ready immediately with 'en' fallback if not mounted
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
