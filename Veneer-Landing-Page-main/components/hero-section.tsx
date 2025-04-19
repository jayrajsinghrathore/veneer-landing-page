"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TeethModel from "@/components/teeth-model";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textElements = textRef.current;

    if (section && textElements) {
      // Animate the hero section
      gsap.fromTo(
        textElements.querySelectorAll("h1, p, .btn-group"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Parallax effect on scroll
      gsap.to(".parallax-bg", {
        y: (i, el) => -el.getAttribute("data-speed") * window.innerHeight * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-white to-blue-50"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="parallax-bg absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5"
          data-speed="0.5"
        ></div>
        <div
          className="parallax-bg absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-blue-100/50"
          data-speed="0.8"
        ></div>
        <div
          className="parallax-bg absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-primary/10"
          data-speed="1.2"
        ></div>
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center z-10">
        <div ref={textRef} className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Transform Your Smile With{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Veneers
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience the future of dental aesthetics with our advanced facial
            analysis and AI recommendations for the perfect veneer style that
            matches your unique features.
          </p>
          <div className="btn-group flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg interactive">
              Try It Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg interactive"
            >
              How It Works
            </Button>
          </div>
        </div>
        <div className="relative h-[500px] w-full">
          <TeethModel />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
