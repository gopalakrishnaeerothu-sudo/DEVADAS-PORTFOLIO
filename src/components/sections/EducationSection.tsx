"use client";

import React from "react";
import { GraduationCap, BookOpen, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function EducationSection() {
  const { education } = PORTFOLIO_DATA;

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-14 bg-[#050507] overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF0000] bg-[#FF0000]/10 border border-[#FF0000]/30 font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>07 · Academic Foundation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#F5F5F5] tracking-tight">
            Education & Film Studies
          </h2>
          <p className="text-sm md:text-base text-[#BCD6DB] font-sans">
            Formal cinematic training grounding technical instinct in classical storytelling.
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={edu.institution + idx}
              className="p-8 rounded-3xl bg-[#111319] border border-[#BCD6DB]/15 hover:border-[#FF0000]/40 transition-all duration-300 shadow-xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FF0000] uppercase font-bold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{edu.institution} · {edu.location}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                    {edu.degree}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-[#BCD6DB] self-start sm:self-auto">
                  {edu.period}
                </span>
              </div>

              {/* Highlights */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                {edu.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3 text-xs md:text-sm text-[#BCD6DB]/90 font-sans leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="pt-2 flex flex-wrap gap-2">
                {[
                  "Advanced Film Editing",
                  "Cinematography & Framing",
                  "Still Photography",
                  "Screenwriting Fundamentals",
                  "Studio Lighting"
                ].map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-[#BCD6DB]/15 text-[#E0F1F1]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
