"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Instagram, Copy, Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ContactSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Film Editing",
    budget: "",
    message: ""
  });

  const handleCopy = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Create mailto prefill as backup
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Devadas,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget || "Flexible"}\n\nProject Details:\n${formData.message}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 md:px-14 bg-[#08090D] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#FF6B35]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>09 · Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
            Have a story to tell? <br />
            <span className="text-gradient-gold">Let&apos;s create something amazing.</span>
          </h2>
          <p className="text-sm md:text-base text-muted-text font-sans">
            Whether it&apos;s a cinematic commercial, music video, wedding film, or brand campaign, I am ready to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 space-y-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white font-display">
                Direct Contact Channels
              </h3>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Phone / Mobile</span>
                    <a href={`tel:${personal.phone.replace(/[^0-9+]/g, "")}`} className="text-sm font-semibold text-white hover:text-[#FF6B35] transition-colors">
                      {personal.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(personal.phone, "phone")}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-[#36d67e]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Direct Email</span>
                    <a href={`mailto:${personal.email}`} className="text-sm font-semibold text-white hover:text-purple-400 transition-colors">
                      {personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(personal.email, "email")}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#36d67e]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 block">Operating Bases</span>
                  <span className="text-sm font-semibold text-white">
                    {personal.location}
                  </span>
                </div>
              </div>

              {/* Direct Instant Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <a
                  href={personal.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl text-xs font-semibold tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-black flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={personal.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl text-xs font-semibold tracking-wider bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-95 text-white flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-[#12141C] border border-white/10 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white font-display mb-6">
                Tell Me About Your Project
              </h3>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#36d67e]/10 border border-[#36d67e]/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#36d67e] text-black flex items-center justify-center mx-auto font-bold text-xl">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Inquiry Prepared!</h4>
                  <p className="text-xs text-white/70 font-sans max-w-md mx-auto">
                    Your email client has opened with your inquiry details addressed to Meesala Devadas. You can also message him directly on WhatsApp for an immediate reply!
                  </p>
                  <a
                    href={personal.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#25D366] text-black"
                  >
                    Chat on WhatsApp Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/60">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe / Creative Agency"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/60">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/60">Project Type</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#1A1D27] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6B35]"
                      >
                        <option value="Film Editing">Film Editing & Narrative</option>
                        <option value="Commercial / Ad Film">Commercial & Ad Film</option>
                        <option value="Music Video">Music Video Production</option>
                        <option value="Wedding / Event Film">Wedding & Event Teaser</option>
                        <option value="Social Media Reels / Shorts">Creator Reels & Viral Content</option>
                        <option value="Color Grading & Sound">Color Grading & Sound Design</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/60">Budget Range (Optional)</label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. ₹25,000 - ₹1,00,000 / $500+"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#FF6B35]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/60">Project Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your footage details, timeline, aesthetic vision, and delivery deadlines..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#FF6B35] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-xs font-semibold tracking-wider bg-[#FF6B35] hover:bg-[#FF8354] text-white flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#FF6B35]/25"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
