"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              VeneerAI
            </span>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {["Features", "How It Works", "Benefits", "Demo", "Contact"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-700 hover:text-primary transition-colors interactive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              )
            )}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <Button className="bg-primary hover:bg-primary/90 text-white interactive">
              Get Started
            </Button>
          </motion.div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 bg-white z-30 shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {["Features", "How It Works", "Benefits", "Demo", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-700 hover:text-primary py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
              <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
