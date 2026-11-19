"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, Cpu, CheckCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ToolsSection() {
  const { tools } = PORTFOLIO_DATA;
  const [activeTool, setActiveTool] = useState(0);

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-14 bg-[#08090D] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>03 · Post-Production Suite</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Software & Technical Tools
          </h2>
          <p className="text-sm md:text-base text-muted-text font-sans">
            Precision NLE engines, color grading suites, and audio workstations that power the master delivery pipeline.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <div
              key={tool.name}
              onMouseEnter={() => setActiveTool(idx)}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                activeTool === idx
                  ? "bg-[#14161E] border-white/25 shadow-xl shadow-black/60 -translate-y-1"
                  : "bg-[#0E1016] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm border shadow-lg"
                    style={{
                      backgroundColor: `${tool.color}15`,
                      borderColor: `${tool.color}40`,
                      color: tool.color
                    }}
                  >
                    {tool.name.substring(0, 2).toUpperCase()}
                  </div>

                  <span
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-semibold"
                    style={{
                      backgroundColor: `${tool.color}15`,
                      color: tool.color
                    }}
                  >
                    {tool.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {tool.name}
                  </h3>
                  <span className="text-[11px] font-mono text-white/50 block mt-0.5">
                    {tool.category}
                  </span>
                  <p className="mt-2.5 text-xs text-white/65 font-sans leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/40">Efficiency</span>
                  <span className="text-white font-semibold">{tool.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${tool.proficiency}%`,
                      backgroundColor: tool.color
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
