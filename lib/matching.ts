import { FormData, MatchResult } from "./types";
import { saccos } from "./saccos";

// Helper to normalize month names for robust comparison (e.g. Sept -> sep, Sep -> sep, March -> mar)
const normalizeMonth = (m: string): string => {
  const clean = m.toLowerCase().trim();
  if (clean.startsWith("jan")) return "jan";
  if (clean.startsWith("feb")) return "feb";
  if (clean.startsWith("mar")) return "mar";
  if (clean.startsWith("apr")) return "apr";
  if (clean.startsWith("may")) return "may";
  if (clean.startsWith("jun")) return "jun";
  if (clean.startsWith("jul")) return "jul";
  if (clean.startsWith("aug")) return "aug";
  if (clean.startsWith("sep")) return "sep";
  if (clean.startsWith("oct")) return "oct";
  if (clean.startsWith("nov")) return "nov";
  if (clean.startsWith("dec")) return "dec";
  return clean;
};

export const getMatches = (formData: FormData): MatchResult[] => {
  const isFarmer = formData.occupation.toLowerCase().includes("farmer");
  
  // Find min and max interest rates to normalize the interest rate score (20 points max)
  const rates = saccos.map(s => s.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const rateRange = maxRate - minRate;

  const scoredSaccos: MatchResult[] = saccos.map(sacco => {
    let score = 0;

    // 1. Harvest Overlap (+40 points)
    // +40 if occupation is farmer AND sacco.harvestMonths overlap with applicant harvest months
    if (isFarmer) {
      const hasAny = sacco.harvestMonths.some(m => m.toLowerCase() === "any");
      const normalApplicantMonths = formData.harvestMonths.map(normalizeMonth);
      const normalSaccoMonths = sacco.harvestMonths.map(normalizeMonth);
      
      const hasOverlap = hasAny || normalSaccoMonths.some(sm => normalApplicantMonths.includes(sm));
      if (hasOverlap && normalApplicantMonths.length > 0) {
        score += 40;
      }
    } else {
      // If they are not a farmer, we can still award partial or full overlap points 
      // if the SACCO supports "any" (flexible/monthly) since they don't depend on harvest.
      const hasAny = sacco.harvestMonths.some(m => m.toLowerCase() === "any");
      if (hasAny) {
        score += 40;
      }
    }

    // 2. Loan Amount Limit (+30 points)
    // +30 if requestedAmount <= sacco.maxLoan
    if (formData.loanAmount <= sacco.maxLoan) {
      score += 30;
    }

    // 3. Interest Rate Score (+20 points)
    // Lower rate = higher score
    let ratePoints = 0;
    if (rateRange > 0) {
      ratePoints = 20 * (1 - (sacco.rate - minRate) / rateRange);
    } else {
      ratePoints = 20;
    }
    score += ratePoints;

    // 4. County Location match (+10 points)
    // +10 if sacco.countyFocus includes applicant county OR sacco.countyFocus is "National"
    const countyMatch = 
      sacco.countyFocus.toLowerCase() === "national" || 
      sacco.countyFocus.toLowerCase().includes(formData.county.toLowerCase());
    
    if (countyMatch) {
      score += 10;
    }

    // Round the percentage to nearest whole number
    const matchPercentage = Math.min(100, Math.max(0, Math.round(score)));

    return {
      sacco,
      score,
      matchPercentage
    };
  });

  // Return top 3 matches sorted by score descending
  return scoredSaccos
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};
