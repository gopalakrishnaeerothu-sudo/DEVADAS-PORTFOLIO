"use client";

import React from "react";
import Image from "next/image";
import { Film, Award, Sparkles, Compass, CheckCircle2, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function AboutSection() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-14 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#1e2230]/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 · Creative Identity</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Meet Meesala Devadas
          </h2>
          <p className="text-sm md:text-base text-muted-text max-w-2xl font-sans">
            A visual storyteller bridging the worlds of technical editing, evocative color science, and cinematic narrative.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Showcase */}
          <div className="lg:col-span-5 relative group">
            {/* Ambient Border Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FF6B35]/40 via-purple-500/20 to-blue-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#12141A] shadow-2xl">
              <div className="aspect-[4/5] relative w-full">
                <Image
                  src={personal.heroImage}
                  alt={personal.name}
                  fill
                  className="object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-90" />
              </div>

              {/* In-Card Film Slate Tag */}
              <div className="p-6 space-y-2 relative -mt-16 z-10">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-black/70 backdrop-blur-md border border-white/10 text-white/90">
                  <span className="w-2 h-2 rounded-full bg-[#36d67e]" />
                  <span>Restart Academy Alum</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {personal.name}
                </h3>
                <p className="text-xs text-white/70 font-sans">
                  Video Editor · Cinematographer · Visual Storyteller
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10">
                  <span>Hyderabad / Nidadavole</span>
                  <span className="text-[#FF6B35]">Telugu & English</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-white leading-snug">
                &ldquo;Every frame has a story. I bring it to life with rhythm, color, and soul.&rdquo;
              </h3>
              <p className="text-sm md:text-base text-white/75 leading-relaxed font-sans">
                {personal.bio}
              </p>
              <p className="text-sm md:text-base text-white/65 leading-relaxed font-sans">
                My creative journey was forged at <span className="text-white font-semibold">Restart Academy, Hyderabad</span>, where I immersed myself in advanced film editing techniques, cinematography, lighting theory, and screenwriting. Today, I collaborate with digital creators, commercial brands, and non-profit organizations to deliver cinematic visuals that linger in memory.
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Narrative Arc & Pacing",
                  desc: "Sculpting raw timelines so every beat advances the emotional core.",
                  icon: Film
                },
                {
                  title: "Node Color Science",
                  desc: "DaVinci Resolve colorist workflows from mood LUTs to skin-tone preservation.",
                  icon: Sparkles
                },
                {
                  title: "Spatial Sound Design",
                  desc: "Layered Foley soundscapes, dialogue clarity, and impactful low frequencies.",
                  icon: Award
                },
                {
                  title: "On-Set Cinematography",
                  desc: "Camera blocking, lighting design, and creative compositional framing.",
                  icon: Compass
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF6B35]/40 transition-colors duration-300"
                >
                  <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                    <item.icon className="w-4 h-4 text-[#FF6B35]" />
                    <span>{item.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-white/60 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Metrics */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="block text-2xl md:text-3xl font-display font-black text-white">
                  25+
                </span>
                <span className="text-xs text-white/50 font-mono">Projects Delivered</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-display font-black text-[#FF6B35]">
                  100%
                </span>
                <span className="text-xs text-white/50 font-mono">Story Focused</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-display font-black text-white">
                  4K
                </span>
                <span className="text-xs text-white/50 font-mono">ProRes & RAW</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={personal.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider bg-[#FF6B35] hover:bg-[#FF8354] text-white transition-all shadow-lg shadow-[#FF6B35]/25"
              >
                <span>Let&apos;s Collaborate</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all"
              >
                <span>Browse Showcase</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
