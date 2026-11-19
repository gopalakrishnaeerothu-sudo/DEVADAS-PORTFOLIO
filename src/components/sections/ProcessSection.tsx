"use client";

import React, { useState } from "react";
import { Sparkles, Lightbulb, Video, Sliders, CheckCircle, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ProcessSection() {
  const { creativeProcess } = PORTFOLIO_DATA;
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "Lightbulb":
        return <Lightbulb className="w-5 h-5" />;
      case "Video":
        return <Video className="w-5 h-5" />;
      case "Sliders":
        return <Sliders className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-14 bg-[#08090D] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>06 · Working Methodology</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            The Creative Process
          </h2>
          <p className="text-sm md:text-base text-muted-text font-sans">
            From initial narrative breakdown to final frame delivery, every project follows an intentional 4-stage pipeline.
          </p>
        </div>

        {/* 4-Step Horizontal Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {creativeProcess.map((item, idx) => {
            const isActive = activeStep === idx;

            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStep(idx)}
                className={`p-6 md:p-7 rounded-2xl md:rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-[#141620] border-[#FF6B35]/50 shadow-2xl shadow-[#FF6B35]/10 -translate-y-2"
                    : "bg-[#0E1015] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[#FF6B35]">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                      {getStepIcon(item.icon)}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#FF6B35] tracking-wider block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="text-lg font-display font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-white/65 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Stage {idx + 1} of 4</span>
                  {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-white/30" />}
                  {idx === 3 && <CheckCircle className="w-3.5 h-3.5 text-[#36d67e]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
