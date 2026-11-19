"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Clock, Sparkles, ChevronRight } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";

interface ProjectsSectionProps {
  onOpenProjectModal: (project: ProjectItem) => void;
}

export default function ProjectsSection({ onOpenProjectModal }: ProjectsSectionProps) {
  const { projects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Automotive & Commercial",
    "Music Video",
    "Short Film & Creator",
    "Wedding & Event",
    "Cinematography",
    "Promotional & Non-Profit"
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) =>
          p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(p.category.toLowerCase())
        );

  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 md:px-14 bg-[#08090D] overflow-hidden font-sans">
      {/* Background visual atmospheric elements */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#FF0000]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-[#BCD6DB]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF0000] bg-[#FF0000]/10 border border-[#FF0000]/30 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 · Cinematic Showcase</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#F5F5F5] tracking-tight">
              Selected Works
            </h2>
          </div>
          <p className="text-sm text-[#BCD6DB] max-w-md font-sans">
            Directly integrating Devadas&apos;s verified film works, automotive commercials, music videos, and creator collaborations.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-200 font-sans ${
                selectedCategory === cat
                  ? "bg-[#FF0000] text-white shadow-lg shadow-[#FF0000]/30"
                  : "bg-white/5 text-[#BCD6DB] hover:text-white hover:bg-white/10 border border-[#BCD6DB]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl md:rounded-3xl bg-[#111319] border border-[#BCD6DB]/15 hover:border-[#FF0000]/60 overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Media Thumbnail Wrapper with Real Image */}
              <div
                className="relative aspect-video w-full overflow-hidden cursor-pointer bg-black"
                onClick={() => onOpenProjectModal(project)}
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-black/35 to-black/25" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-black/80 backdrop-blur-md text-[#FF0000] border border-[#FF0000]/40 font-bold">
                    {project.badge}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono text-white/95 bg-black/80 backdrop-blur-md border border-white/20">
                    <Clock className="w-3 h-3 text-[#FF0000]" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-85 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-xl shadow-[#FF0000]/50 group-hover:scale-115 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between font-sans">
                <div>
                  <div className="text-[11px] font-mono text-[#BCD6DB]/70 uppercase tracking-wider mb-1 font-semibold">
                    {project.category}
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#FF0000] transition-colors duration-200 cursor-pointer font-display"
                    onClick={() => onOpenProjectModal(project)}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#BCD6DB]/85 font-sans leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tools & Watch Actions */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#E0F1F1] border border-white/10"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onOpenProjectModal(project)}
                      className="text-xs font-bold text-white group-hover:text-[#FF0000] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Watch Reel</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href={project.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#BCD6DB]/50 hover:text-white transition-colors"
                      title="Open source file on Google Drive"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
