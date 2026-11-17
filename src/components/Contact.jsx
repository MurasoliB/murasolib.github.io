import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 md:py-44 border-t border-white/10 overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1493]" />
          <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
            // Connection
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

        {/* Minimal Direct Channels (No Complicated Forms) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 border-t border-white/10 items-start">
          
          <div className="lg:col-span-6 space-y-4">
            <p className="text-base sm:text-xl text-[#B3B3B3] leading-relaxed font-light max-w-xl">
              Whether you are architecting an autonomous intelligence pipeline, computational simulation, or ambitious full-stack software, feel free to reach out directly.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 font-mono text-xs">
            {/* One-Click Copy Email Pill */}
            <div>
              <span className="text-white/40 uppercase tracking-widest block mb-3">Direct Channel</span>
              <button
                onClick={handleCopy}
                className="group flex items-center justify-between w-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF1493] transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <Mail className="w-5 h-5 text-[#FF1493] shrink-0" />
                  <span className="text-base sm:text-lg font-mono text-white truncate group-hover:text-[#FF69B4] transition-colors">
                    {personalInfo.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors shrink-0">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#FF69B4]" />
                      <span className="text-[#FF69B4] font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Click to Copy</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Direct Social Links */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/30 text-[#B3B3B3] hover:text-white transition-all uppercase tracking-wider"
              >
                <Github className="w-4 h-4 text-[#FF1493]" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/30 text-[#B3B3B3] hover:text-white transition-all uppercase tracking-wider"
              >
                <Linkedin className="w-4 h-4 text-[#FF1493]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-white/30 ml-auto hidden sm:inline">
                {personalInfo.location} · {personalInfo.educationInstitute}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}