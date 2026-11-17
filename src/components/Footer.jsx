import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-14 bg-[#050505]/80 backdrop-blur-md border-t border-[rgba(255,20,147,0.25)] font-mono text-xs text-[#B3B3B3] z-10 w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Author & Affiliation */}
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{personalInfo.name}</span>
          <span className="text-[#FF1493]">/</span>
          <span>{personalInfo.educationInstitute}</span>
          <span className="text-white/20">·</span>
          <span>{personalInfo.location}</span>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#FF1493] hover:text-[#FF69B4] hover:scale-110 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#FF1493] hover:text-[#FF69B4] hover:scale-110 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <span className="text-white/20">|</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white hover:text-[#FF1493] transition-colors"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF1493]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
