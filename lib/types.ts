export interface FormData {
  name: string;
  county: string;
  phone: string;
  occupation: string;
  monthlyIncome: string;
  harvestMonths: string[];
  schoolName: string;
  schoolTerm: string;
  loanAmount: number;
  childrenCount: number;
  consentDPA: boolean;
  consentTruth: boolean;
}

export interface SaccoContact {
  phone: string;
  whatsapp: string;
  branches: string[];
  documents: string[];
  website?: string;
}

export interface Sacco {
  id: number;
  name: string;
  focus: string;
  rate: number;
  maxLoan: number;
  repayment: string;
  harvestMonths: string[];
  countyFocus: string;
  badge: string;
  contact?: SaccoContact;
}

export interface MatchResult {
  sacco: Sacco;
  score: number;
  matchPercentage: number;
}
