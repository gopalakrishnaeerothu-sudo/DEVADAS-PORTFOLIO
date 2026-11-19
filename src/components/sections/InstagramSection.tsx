"use client";

import React from "react";
import Image from "next/image";
import { Instagram, ArrowUpRight, Sparkles, Heart, MessageCircle, Play } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function InstagramSection() {
  const { personal, projects } = PORTFOLIO_DATA;

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-14 bg-[#08090D] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20">
              <Instagram className="w-3.5 h-3.5" />
              <span>08 · Personal Branding</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Connect on Instagram
            </h2>
          </div>
          <a
            href={personal.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white transition-all shadow-lg self-start md:self-auto"
          >
            <span>Follow {personal.instagram}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Profile Card Banner */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#151722] via-[#101218] to-[#0A0B0F] border border-white/10 shadow-2xl mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-pink-500 p-0.5 shadow-xl">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={personal.heroImage}
                    alt={personal.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {personal.instagram}
                  </h3>
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </span>
                </div>
                <p className="text-xs md:text-sm text-white/70 font-sans">
                  Meesala Devadas · Video Editor & Cinematographer
                </p>
                <p className="text-xs text-white/50 font-mono">
                  Hyderabad · Nidadavole · Creator Collaboration
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-center border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8">
              <div>
                <span className="block text-xl md:text-2xl font-display font-bold text-white">
                  25+
                </span>
                <span className="text-[11px] font-mono text-white/40">Projects</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-display font-bold text-pink-400">
                  4K
                </span>
                <span className="text-[11px] font-mono text-white/40">Reels</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-display font-bold text-white">
                  100%
                </span>
                <span className="text-[11px] font-mono text-white/40">Creative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Grid Previews */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.slice(0, 4).map((proj) => (
            <a
              key={proj.id}
              href={personal.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#151722] border border-white/10 hover:border-pink-500/50 transition-all duration-300"
            >
              <Image
                src={proj.thumbnail}
                alt={proj.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
                <div className="flex items-center gap-1 text-xs font-mono">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
