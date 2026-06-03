"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "../ui/container";
import { Button } from "../ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position for backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ["home", "projects", "skills", "about", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-md border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-mono text-base font-bold text-text-primary tracking-tight transition-colors group-hover:text-accent">
            kaushik.paykoli()
          </span>
          <span className="font-mono text-[10px] text-text-muted">
            fullstack_engineer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isSectionActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "font-mono text-xs px-4 py-2 rounded-md transition-all duration-200 cursor-pointer relative",
                  isSectionActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
                {isSectionActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/5 rounded-md -z-10 border border-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="secondary"
            href="/assets/resume/kaushik_paykoli_resume2.pdf"
            external
            className="font-mono text-xs py-2 px-4 flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden p-2 text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden w-full bg-bg-primary/95 border-b border-white/5 backdrop-blur-lg absolute top-full left-0 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "font-mono text-sm py-2 px-3 rounded-md transition-all duration-200",
                    activeSection === link.href.substring(1)
                      ? "text-text-primary bg-white/5"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-white/5 my-2" />
              <Button
                variant="primary"
                href="/assets/resume/kaushik_paykoli_resume2.pdf"
                external
                className="w-full flex items-center justify-center gap-2 font-mono text-sm py-2.5"
                onClick={() => setIsOpen(false)}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
