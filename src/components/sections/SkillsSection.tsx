"use client";

import React, { useState } from "react";
import { Film, Camera, Palette, Volume2, PenTool, Sparkles, Sliders, Play, Check } from "lucide-react";
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
    <section id="skills" className="relative py-28 md:py-36 px-6 md:px-14 bg-[#0B0D12] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF6B35]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 · Core Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Creative Disciplines
            </h2>
          </div>
          <p className="text-sm text-muted-text max-w-md font-sans">
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
                className="group relative rounded-2xl p-6 md:p-7 bg-[#13151D] border border-white/10 hover:border-[#FF6B35]/50 transition-all duration-500 flex flex-col justify-between shadow-xl hover:shadow-[#FF6B35]/15 hover:-translate-y-1.5"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glow behind card */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#FF6B35]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E212B] to-[#14161E] border border-white/15 flex items-center justify-center text-[#FF6B35] shadow-inner group-hover:scale-110 group-hover:border-[#FF6B35]/40 transition-all duration-300">
                      {getIcon(skill.icon)}
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-white/5 border border-white/10 text-white/60">
                      {skill.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-[#FF6B35] transition-colors duration-200">
                      {skill.title}
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-white/65 leading-relaxed font-sans">
                      {skill.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {skill.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] bg-white/[0.04] border border-white/5 text-white/70 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Skill Level Indicator */}
                <div className="pt-6 mt-6 border-t border-white/10 relative z-10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/40">Proficiency</span>
                    <span className="text-[#FF6B35] font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C] transition-all duration-700 ease-out"
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
