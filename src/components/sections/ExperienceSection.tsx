"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles, Building2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ExperienceSection() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 md:px-14 bg-[#0B0D12] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>05 · Career Path</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="text-sm md:text-base text-muted-text max-w-2xl font-sans">
            Hands-on studio workflows, commercial campaigns, and influencer collaborations anchored in Hyderabad.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 border-l border-white/15 space-y-12">
          {experience.map((item, idx) => (
            <div key={item.role + idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0B0D12] border-2 border-[#FF6B35] group-hover:scale-125 transition-transform duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] m-auto mt-0.5" />
              </div>

              {/* Experience Card */}
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#13151D] border border-white/10 hover:border-[#FF6B35]/40 transition-all duration-300 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30 mb-2 inline-block">
                      {item.type}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 font-sans mt-1">
                      <div className="flex items-center gap-1.5 text-white/90 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-[#FF6B35]" />
                        <span>{item.company}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-white/40" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-white/70 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#36d67e] shrink-0 mt-0.5" />
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
