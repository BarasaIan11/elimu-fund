"use client";

import { HeroSection } from "../components/HeroSection";
import { HowItWorks } from "../components/HowItWorks";
import { ImpactStats } from "../components/ImpactStats";
import { TrustSection } from "../components/TrustSection";
import { Testimonials } from "../components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <HowItWorks />
      <ImpactStats />
      <TrustSection />
      <Testimonials />
    </div>
  );
}
