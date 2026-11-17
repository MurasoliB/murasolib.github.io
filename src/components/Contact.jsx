import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Send, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#FF1493', '#FF4FBF', '#FF69B4', '#FFFFFF'],
        origin: { y: 0.85 }
      });
    } catch (_) {}

    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;

    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative py-32 md:py-40 border-t border-[rgba(255,20,147,0.20)] overflow-hidden w-full">
      {/* Pink Glow Overlay */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#FF1493]/15 via-[#FF4FBF]/5 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#FF1493]" />
            <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
              // Connection
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Have an Idea? <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF69B4] to-[#FF1493]">Let's Build It</span><span className="text-[#FF1493]">.</span>
          </h2>
          <p className="text-[#B3B3B3] text-base mt-2 max-w-xl">
            Whether you have a technical query, project collaboration, or engineering role in mind, reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Direct Information in Charcoal Cards with Pink Accents */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="p-8 rounded-2xl bg-[#111111] border border-[rgba(255,20,147,0.20)] hover:border-[#FF1493] transition-colors">
              <span className="text-xs font-mono text-[#FF69B4] uppercase tracking-wider block mb-3">
                Direct Email
              </span>
              <button
                onClick={handleCopy}
                className="group flex items-center justify-between w-full p-4 rounded-xl bg-[#050505] border border-[rgba(255,20,147,0.25)] hover:border-[#FF1493] transition-all text-left"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#FF1493] shrink-0" />
                  <span className="text-sm sm:text-base font-mono text-white truncate group-hover:text-[#FF69B4]">
                    {personalInfo.email}
                  </span>
                </div>
                {copied ? (
                  <Check className="w-4 h-4 text-[#FF69B4] shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-[#B3B3B3] group-hover:text-[#FF1493] shrink-0" />
                )}
              </button>
            </div>

            <div className="p-8 rounded-2xl bg-[#111111] border border-[rgba(255,20,147,0.20)] space-y-4">
              <span className="text-xs font-mono text-[#FF69B4] uppercase tracking-wider block mb-2">
                Professional Networks
              </span>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#050505] border border-[rgba(255,20,147,0.25)] text-white hover:border-[#FF1493] hover:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#B3B3B3] group-hover:text-[#FF1493]" />
                    <span className="text-xs font-mono font-medium">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B3B3B3] group-hover:text-[#FF1493]" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#050505] border border-[rgba(255,20,147,0.25)] text-white hover:border-[#FF1493] hover:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#FF1493]" />
                    <span className="text-xs font-mono font-medium">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B3B3B3] group-hover:text-[#FF1493]" />
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-[rgba(255,20,147,0.20)] font-mono text-xs text-[#B3B3B3]">
              {personalInfo.educationInstitute} · {personalInfo.location}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111111] border border-[rgba(255,20,147,0.20)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#B3B3B3] uppercase mb-2">
                      Name <span className="text-[#FF1493]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Hunter"
                      className="w-full px-5 py-3.5 bg-[#050505] border border-[rgba(255,20,147,0.25)] rounded-xl text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#FF1493] focus:ring-1 focus:ring-[#FF1493] focus:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#B3B3B3] uppercase mb-2">
                      Email <span className="text-[#FF1493]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-5 py-3.5 bg-[#050505] border border-[rgba(255,20,147,0.25)] rounded-xl text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#FF1493] focus:ring-1 focus:ring-[#FF1493] focus:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#B3B3B3] uppercase mb-2">
                    Message <span className="text-[#FF1493]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or questions..."
                    className="w-full px-5 py-3.5 bg-[#050505] border border-[rgba(255,20,147,0.25)] rounded-xl text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#FF1493] focus:ring-1 focus:ring-[#FF1493] focus:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF1493] hover:bg-[#FF4FBF] text-white font-mono font-semibold text-xs tracking-widest uppercase rounded-xl shadow-[0_0_25px_rgba(255,20,147,0.45)] hover:shadow-[0_0_35px_rgba(255,20,147,0.7)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Transmission</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
