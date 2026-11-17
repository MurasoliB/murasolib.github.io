import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
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
    <section id="contact" className="relative py-28 md:py-44 border-t border-[rgba(255,255,255,0.12)] overflow-hidden w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-16 md:mb-24">
          <span className="font-mono text-xs text-[#FF1493] font-semibold tracking-wider">
            05.
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#666666]">
            // Connection
          </span>
        </div>

        {/* Massive Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display font-black tracking-tighter leading-[0.88] text-[#F5F5F5] uppercase select-none">
            LET'S BUILD<br />
            SOMETHING<br />
            <span>MEANING</span><span className="text-[#FF1493]">FUL.</span>
          </h2>
        </motion.div>

        {/* Lower Editorial Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-12 border-t border-[rgba(255,255,255,0.12)]">
          
          {/* Invitation Text */}
          <div className="lg:col-span-5 space-y-4">
            <p className="font-mono text-xs text-[#666666] uppercase tracking-widest">
              // Open to Inquiries & Roles
            </p>
            <p className="text-base sm:text-lg text-[#999999] leading-relaxed max-w-md">
              Whether you are architecting a resilient machine learning pipeline, computational simulation, or ambitious full-stack software, let's connect.
            </p>
          </div>

          {/* Email & Direct Connections */}
          <div className="lg:col-span-7 space-y-8 font-mono">
            <div>
              <span className="text-xs text-[#666666] uppercase tracking-widest block mb-2">Direct Channel</span>
              <div className="flex flex-wrap items-baseline gap-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-xl sm:text-3xl md:text-4xl font-display font-medium text-[#F5F5F5] hover:text-[#FF1493] transition-colors border-b border-[#F5F5F5] hover:border-[#FF1493] pb-1"
                >
                  {personalInfo.email}
                </a>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-[#999999] hover:text-[#F5F5F5] border border-[rgba(255,255,255,0.12)] hover:border-white/30 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#FF1493]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center gap-8 text-xs uppercase tracking-wider">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#999999] hover:text-[#F5F5F5] transition-colors"
              >
                <Github className="w-4 h-4 text-[#FF1493]" />
                <span className="border-b border-transparent group-hover:border-[#F5F5F5] pb-0.5">GitHub</span>
                <span className="text-[#666666] group-hover:text-[#FF1493] transition-colors">↗</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[#999999] hover:text-[#F5F5F5] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#FF1493]" />
                <span className="border-b border-transparent group-hover:border-[#F5F5F5] pb-0.5">LinkedIn</span>
                <span className="text-[#666666] group-hover:text-[#FF1493] transition-colors">↗</span>
              </a>

              <span className="text-[#666666] ml-auto hidden sm:inline">
                {personalInfo.location} · {personalInfo.educationInstitute}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}