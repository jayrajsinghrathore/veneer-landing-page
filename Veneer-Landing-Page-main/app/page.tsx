"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import HowItWorksSection from "@/components/how-it-works-section";
import BenefitsSection from "@/components/benefits-section";
import DemoSection from "@/components/demo-section";

import CustomCursor from "@/components/custom-cursor";
import Navbar from "@/components/navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Animate sections after loading
      const sections = document.querySelectorAll("section");
      sections.forEach((section, index) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2 * index,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="relative w-32 h-32">
          <div className="absolute w-full h-full border-8 border-primary/20 rounded-full"></div>
          <div className="absolute w-full h-full border-t-8 border-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-primary font-semibold">
            SMILE
          </div>
        </div>
      </div>
    );
  }

  return (
    <main ref={mainRef} className="relative overflow-hidden">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <DemoSection />
    </main>
  );
}
