import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
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
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.85 } });
    } catch (_) {}

    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;

    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono text-accent-blue tracking-widest uppercase block mb-3">
            // Connection
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Initiate Contact.
          </h2>
          <p className="text-content-secondary text-base mt-2">
            Have a project, engineering challenge, or collaboration? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Direct Information */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <span className="text-xs font-mono text-content-muted uppercase tracking-wider block mb-3">
                Direct Email
              </span>
              <button
                onClick={handleCopy}
                className="group flex items-center gap-3 text-base sm:text-xl font-mono text-white hover:text-accent-blue transition-colors text-left"
              >
                <span>{personalInfo.email}</span>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-content-muted group-hover:text-accent-blue shrink-0" />
                )}
              </button>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-content-muted uppercase tracking-wider block mb-2">
                Networks
              </span>
              <div className="flex gap-6">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-mono text-content-secondary hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-content-muted" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-mono text-content-secondary hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-content-muted" />
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 font-mono text-xs text-content-muted">
              {personalInfo.educationInstitute} · {personalInfo.location}
            </div>
          </div>

          {/* Right: Minimal Wide Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-content-muted uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-content-muted focus:outline-none focus:border-accent-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-content-muted uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@domain.com"
                    className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-content-muted focus:outline-none focus:border-accent-blue transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-content-muted uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-content-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-accent-blue hover:text-white transition-colors duration-200"
              >
                Send Transmission
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
