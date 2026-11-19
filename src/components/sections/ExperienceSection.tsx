"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ExperienceSection() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 md:px-14 bg-[#050507] overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF0000] bg-[#FF0000]/10 border border-[#FF0000]/30 font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>05 · Career Path</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#F5F5F5] tracking-tight">
            Professional Experience
          </h2>
          <p className="text-sm md:text-base text-[#BCD6DB] max-w-2xl font-sans">
            Hands-on studio workflows, commercial campaigns, and influencer collaborations anchored in Hyderabad.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l border-[#BCD6DB]/20 space-y-12">
          {experience.map((item, idx) => (
            <div key={item.role + idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#050507] border-2 border-[#FF0000] group-hover:scale-125 transition-transform duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000] m-auto mt-0.5" />
              </div>

              {/* Experience Card */}
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#111319] border border-[#BCD6DB]/15 hover:border-[#FF0000]/50 transition-all duration-300 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#FF0000]/15 text-[#FF0000] border border-[#FF0000]/30 mb-2 inline-block font-bold">
                      {item.type}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#BCD6DB]/80 font-sans mt-1">
                      <div className="flex items-center gap-1.5 text-white font-medium">
                        <Building2 className="w-3.5 h-3.5 text-[#FF0000]" />
                        <span>{item.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#BCD6DB]/50" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#E0F1F1] self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-[#FF0000]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#BCD6DB]/90 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
