"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Smile,
  SmileIcon as Teeth,
  Brain,
  FileDown,
  Mail,
  Eye,
} from "lucide-react";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Animate section title
      gsap.fromTo(
        ".section-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 80%",
          },
        }
      );

      // Animate feature cards
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const features = [
    {
      icon: <Smile className="h-10 w-10 text-primary" />,
      title: "Facial Analysis",
      description:
        "Advanced AI algorithms analyze your facial structure to determine the most flattering veneer styles for your unique features.",
    },
    {
      icon: <Teeth className="h-10 w-10 text-primary" />,
      title: "Teeth Analysis",
      description:
        "Our technology examines your current teeth condition to recommend the most suitable veneer options for your specific dental situation.",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI Recommendations",
      description:
        "Get personalized veneer style recommendations based on your facial structure, teeth condition, and aesthetic preferences.",
    },
    {
      icon: <FileDown className="h-10 w-10 text-primary" />,
      title: "Report Download",
      description:
        "Download comprehensive reports detailing your analysis results and veneer recommendations for future reference.",
    },
    {
      icon: <Mail className="h-10 w-10 text-primary" />,
      title: "Doctor Communication",
      description:
        "Seamlessly share your veneer reports with dental professionals via our integrated email system for streamlined consultation.",
    },
    {
      icon: <Eye className="h-10 w-10 text-primary" />,
      title: "Visual Try-On",
      description:
        "Experience how different veneer styles will look on your teeth with our advanced 3D visualization technology before making a decision.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-20 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 section-title">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Cutting-Edge{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines advanced technology with dental
            expertise to provide you with the perfect veneer solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="mb-6 p-4 bg-primary/10 inline-block rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
