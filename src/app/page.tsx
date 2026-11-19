"use client";

import React, { useState } from "react";
import FacetGlassHero from "@/components/3d/FacetGlassHero";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ToolsSection from "@/components/sections/ToolsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProcessSection from "@/components/sections/ProcessSection";
import EducationSection from "@/components/sections/EducationSection";
import InstagramSection from "@/components/sections/InstagramSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import VideoModal from "@/components/ui/VideoModal";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const handleOpenProjectModal = (project: ProjectItem) => {
    setActiveProject(project);
  };

  const handleOpenProjectById = (id: string) => {
    const proj = PORTFOLIO_DATA.projects.find((p) => p.id === id);
    if (proj) setActiveProject(proj);
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#08090D] text-white">
      {/* 3D WebGL Glass Hero */}
      <FacetGlassHero
        onExploreClick={handleScrollToProjects}
        onOpenProjectModal={handleOpenProjectById}
      />

      {/* About Me Section */}
      <AboutSection />

      {/* Interactive 3D Skills Cards */}
      <SkillsSection onSelectProject={handleOpenProjectById} />

      {/* Software & Technical Tools Suite */}
      <ToolsSection />

      {/* Selected Video Portfolio & Showcase (Google Drive Integrated) */}
      <ProjectsSection onOpenProjectModal={handleOpenProjectModal} />

      {/* Professional Experience Timeline */}
      <ExperienceSection />

      {/* Creative Process & Methodology */}
      <ProcessSection />

      {/* Education & Film Studies */}
      <EducationSection />

      {/* Instagram & Personal Branding */}
      <InstagramSection />

      {/* Contact & Collaboration Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Fullscreen Video Player Modal */}
      <VideoModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}
