"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  ThumbsUp,
  Sparkles,
  Smile,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react";

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Animate section title
      gsap.fromTo(
        ".benefits-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".benefits-title",
            start: "top 80%",
          },
        }
      );

      // Animate benefit cards
      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".benefits-grid",
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const patientBenefits = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Save Time",
      description:
        "Skip multiple dental visits for consultations and see your potential new smile instantly.",
    },
    {
      icon: <ThumbsUp className="h-6 w-6 text-primary" />,
      title: "Confidence in Choice",
      description:
        "Visualize your results before committing to a procedure, ensuring satisfaction.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "Personalized Results",
      description:
        "Receive recommendations tailored specifically to your unique facial features.",
    },
  ];

  const doctorBenefits = [
    {
      icon: <Smile className="h-6 w-6 text-primary" />,
      title: "Improved Patient Satisfaction",
      description:
        "Provide patients with clear visualizations of expected outcomes before treatment.",
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-primary" />,
      title: "Enhanced Precision",
      description:
        "Access detailed AI analysis to inform your veneer design and implementation.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-primary" />,
      title: "Streamlined Consultations",
      description:
        "Review patient reports before appointments for more efficient consultations.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 benefits-title">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Benefits For{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers significant advantages for both patients and
            dental professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 benefits-grid">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left">
              For Patients
            </h3>
            <div className="space-y-6">
              {patientBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-card flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left">
              For Dental Professionals
            </h3>
            <div className="space-y-6">
              {doctorBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-card flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mr-4 p-3 bg-primary/10 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
