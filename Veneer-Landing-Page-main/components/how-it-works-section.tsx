"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Animate section title
      gsap.fromTo(
        ".how-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".how-title",
            start: "top 80%",
          },
        }
      );

      // Animate steps
      gsap.fromTo(
        ".step-item",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 80%",
          },
        }
      );

      // Animate the line connecting steps
      gsap.fromTo(
        ".connecting-line",
        { height: 0 },
        {
          height: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  const steps = [
    {
      number: "01",
      title: "Upload Your Photo",
      description:
        "Take a clear photo of your face and smile, or upload an existing one to our secure platform.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our advanced AI analyzes your facial features and teeth structure to determine the most suitable veneer options.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      number: "03",
      title: "View Recommendations",
      description:
        "Receive personalized veneer style recommendations based on your unique features and preferences.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      number: "04",
      title: "Try On Virtually",
      description:
        "Use our 3D visualization tool to see how different veneer styles would look on your teeth in real-time.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      number: "05",
      title: "Share With Your Dentist",
      description:
        "Download your report or email it directly to your dental professional to discuss your preferred options.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 how-title">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 5-step process makes finding your perfect veneer style
            easy, fast, and enjoyable.
          </p>
        </div>

        <div className="relative steps-container">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 -ml-0.5 md:ml-0 z-0">
            <div className="connecting-line absolute left-0 top-0 w-1 bg-primary"></div>
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-item relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-16 z-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex-1 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold ml-4 md:ml-0 md:mx-4">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 mt-4 max-w-md mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>

              <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg interactive">
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  );
}
