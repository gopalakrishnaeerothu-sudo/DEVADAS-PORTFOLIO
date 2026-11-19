"use client";

import React, { useState } from "react";
import { Film, Camera, Palette, Volume2, PenTool, Sparkles, Sliders } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface SkillsSectionProps {
  onSelectProject?: (id: string) => void;
}

export default function SkillsSection({ onSelectProject }: SkillsSectionProps) {
  const { skills } = PORTFOLIO_DATA;
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Film":
        return <Film className="w-5 h-5" />;
      case "Camera":
        return <Camera className="w-5 h-5" />;
      case "Palette":
        return <Palette className="w-5 h-5" />;
      case "Volume2":
        return <Volume2 className="w-5 h-5" />;
      case "PenTool":
        return <PenTool className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Sliders className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 md:px-14 bg-[#08090D] overflow-hidden font-sans">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF0000]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF0000] bg-[#FF0000]/10 border border-[#FF0000]/30 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 · Core Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#F5F5F5] tracking-tight">
              Creative Disciplines
            </h2>
          </div>
          <p className="text-sm text-[#BCD6DB] max-w-md font-sans">
            Crafting compelling motion pictures requires blending technical finesse with artistic intuition across every stage of production.
          </p>
        </div>

        {/* 3D Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => {
            const isHovered = hoveredCard === idx;

            return (
              <div
                key={skill.title}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl p-6 md:p-7 bg-[#111319] border border-[#BCD6DB]/15 hover:border-[#FF0000]/60 transition-all duration-500 flex flex-col justify-between shadow-xl hover:shadow-[#FF0000]/20 hover:-translate-y-2"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glow behind card */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#FF0000]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E2028] to-[#121318] border border-white/10 flex items-center justify-center text-[#FF0000] shadow-inner group-hover:scale-110 group-hover:border-[#FF0000]/50 transition-all duration-300">
                      {getIcon(skill.icon)}
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-white/5 border border-[#BCD6DB]/20 text-[#BCD6DB]">
                      {skill.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-[#FF0000] transition-colors duration-200">
                      {skill.title}
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-[#BCD6DB]/85 leading-relaxed font-sans">
                      {skill.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skill.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded text-[11px] bg-white/[0.04] border border-white/5 text-[#E0F1F1] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Skill Level Indicator */}
                <div className="pt-6 mt-6 border-t border-white/10 relative z-10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#BCD6DB]/50">Proficiency</span>
                    <span className="text-[#FF0000] font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF0000] to-[#FF4D4D] transition-all duration-700 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
