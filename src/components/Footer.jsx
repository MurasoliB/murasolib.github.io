import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/10 font-mono text-xs text-[#999999] z-10 w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Monogram, Name & 4+ Years Tech Experience */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-center md:text-left">
          <span className="font-semibold text-white tracking-wider">
            MB<span className="text-[#FF1493]">.</span>
          </span>
          <span className="text-white/20">/</span>
          <span className="text-white font-medium">{personalInfo.name}</span>
          <span className="text-white/20">·</span>
          <span className="text-[#FF69B4] font-medium bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/10">
            {personalInfo.experience}
          </span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span className="hidden sm:inline text-white/50">{personalInfo.location}</span>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/60 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4 text-[#FF1493]" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/60 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4 text-[#FF1493]" />
          </a>
          <span className="text-white/20">|</span>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF1493] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Sub-bar Copyright & Institute */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
        <span>© {new Date().getFullYear()} {personalInfo.name} · All rights reserved.</span>
        <span>{personalInfo.educationInstitute}</span>
      </div>
    </footer>
  );
}