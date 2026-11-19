"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Clock, CheckCircle2 } from "lucide-react";
import { ProjectItem } from "@/data/portfolioData";

interface VideoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function VideoModal({ project, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/92 backdrop-blur-xl animate-in fade-in duration-300 font-sans">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0E1015] border border-[#BCD6DB]/20 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0E1015]/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/40 font-bold">
              {project.category}
            </span>
            <span className="text-xs text-[#BCD6DB]/70 font-mono hidden sm:inline">
              Year: {project.year}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe
            src={project.driveEmbed}
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title={project.title}
          />
        </div>

        {/* Project Details */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-[#BCD6DB] leading-relaxed font-sans">
                {project.longDescription || project.description}
              </p>
            </div>

            <a
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider bg-[#FF0000] hover:bg-[#E60000] text-white shrink-0 transition-all shadow-lg shadow-[#FF0000]/30 hover:-translate-y-0.5"
            >
              <span>Open on Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Highlights & Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="space-y-1">
              <span className="text-[#BCD6DB]/60 font-mono uppercase block text-[10px] font-semibold">Editing Tools</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#E0F1F1]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[#BCD6DB]/60 font-mono uppercase block text-[10px] font-semibold">Duration</span>
              <div className="flex items-center gap-1.5 text-white pt-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>{project.duration}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[#BCD6DB]/60 font-mono uppercase block text-[10px] font-semibold">Core Highlights</span>
              <div className="flex flex-col gap-1 pt-1">
                {project.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-1.5 text-[#E0F1F1]">
                    <CheckCircle2 className="w-3 h-3 text-[#FF0000]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
