import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Send, Mail } from 'lucide-react';
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
        particleCount: 40,
        spread: 50,
        colors: ['#FF1493', '#FF69B4', '#FFFFFF'],
        origin: { y: 0.85 }
      });
    } catch (_) {}

    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;

    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative py-28 md:py-44 border-t border-white/10 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
          <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
            // Connection & Inquiries
          </span>
        </div>

        {/* Monumental Aesthetic Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.9] text-white uppercase select-none">
            LET'S BUILD<br />
            SOMETHING<br />
            <span>MEANING</span><span className="text-[#FF1493]">FUL.</span>
          </h2>
        </motion.div>

        {/* Minimal Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-10 border-t border-white/10">
          
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base sm:text-lg text-[#B3B3B3] leading-relaxed max-w-md font-light">
              Whether you are architecting an autonomous intelligence pipeline, computational simulation, or ambitious full-stack product, my inbox is open.
            </p>

            <div className="space-y-4 font-mono text-xs">
              <span className="text-white/40 uppercase tracking-widest block">Direct Channel</span>
              <button
                onClick={handleCopy}
                className="group flex items-center justify-between w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493] transition-all text-left cursor-pointer"
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

            {/* Social Network Links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-[#FF1493]" />
                <span className="border-b border-transparent group-hover:border-white pb-0.5">GitHub ↗</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#FF1493]" />
                <span className="border-b border-transparent group-hover:border-white pb-0.5">LinkedIn ↗</span>
              </a>

              <span className="text-white/30 ml-auto hidden sm:inline">
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Right Column: Minimal Clean Form (No Heavy Box Card) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF1493] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF1493] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the project, idea, or problem..."
                  className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#FF1493] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 rounded-full bg-[#FF1493] hover:bg-[#FF4FBF] text-white font-mono text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,20,147,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}