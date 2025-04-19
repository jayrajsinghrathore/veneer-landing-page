"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import VeneerVisualizer from "@/components/veneer-visualizer";

export default function DemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("upload");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Animate section title
      gsap.fromTo(
        ".demo-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".demo-title",
            start: "top 80%",
          },
        }
      );

      // Animate demo content
      gsap.fromTo(
        ".demo-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".demo-content",
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="demo" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 demo-title">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Try Our{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Interactive Demo
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how our AI-powered veneer recommendation system works
            with this interactive demonstration.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden demo-content">
          <Tabs
            defaultValue="upload"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="p-6 bg-gray-50 border-b">
              <TabsList className="grid grid-cols-3 gap-4">
                <TabsTrigger
                  value="upload"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Upload Photo
                </TabsTrigger>
                <TabsTrigger
                  value="analyze"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  AI Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="visualize"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Try On Veneers
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-8">
              <TabsContent value="upload" className="mt-0">
                <div className="text-center py-12">
                  <div className="mb-8 max-w-md mx-auto">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600 mb-2">
                        Drag and drop your photo here
                      </p>
                      <p className="text-gray-400 text-sm">
                        or click to browse files
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      For best results, use a clear, front-facing photo with a
                      natural smile.
                    </p>
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-lg interactive"
                    onClick={() => setActiveTab("analyze")}
                  >
                    Continue <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="analyze" className="mt-0">
                <div className="text-center py-8">
                  <div className="mb-8 max-w-2xl mx-auto">
                    <div className="relative w-full h-64 bg-gray-100 rounded-lg mb-6 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 animate-pulse">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-primary mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <p className="text-xl font-semibold text-primary">
                          Analysis Complete
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Facial Structure</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full w-[85%]"></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Oval face shape detected
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Teeth Alignment</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full w-[70%]"></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Minor alignment issues
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Smile Width</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full w-[90%]"></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Wide smile detected
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-lg interactive"
                    onClick={() => setActiveTab("visualize")}
                  >
                    See Recommendations <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="visualize" className="mt-0">
                <div className="py-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-6 text-center">
                      Try On Different Veneer Styles
                    </h3>
                    <div className="h-[400px] w-full">
                      <VeneerVisualizer />
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-2 text-lg interactive">
                      Download Report
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
