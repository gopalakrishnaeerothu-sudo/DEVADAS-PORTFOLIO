"use client";

import React from "react";
import { ArrowUp, Instagram, Mail, Phone, MessageSquare, Heart } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050507] border-t border-white/10 px-6 md:px-14 py-16 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B35] text-black font-black flex items-center justify-center text-sm">
                D
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">
                MEESALA DEVADAS
              </span>
            </div>
            <p className="text-xs text-white/50 font-sans max-w-sm">
              &ldquo;Every Frame Has a Story. I Bring It to Life.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/70 font-medium">
            <a href="#about" className="hover:text-[#FF6B35] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#FF6B35] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#FF6B35] transition-colors">Showcase</a>
            <a href="#experience" className="hover:text-[#FF6B35] transition-colors">Experience</a>
            <a href="#contact" className="hover:text-[#FF6B35] transition-colors">Contact</a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF6B35] text-white flex items-center justify-center border border-white/10 transition-colors shadow-lg self-start md:self-auto"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} Meesala Devadas. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed in Glass & Cinema · Built for High-Impact Storytelling
          </p>
        </div>
      </div>
    </footer>
  );
}
