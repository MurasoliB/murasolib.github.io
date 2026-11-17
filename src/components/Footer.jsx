import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-[rgba(255,255,255,0.12)] font-mono text-xs text-[#666666] z-10 w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Monogram & Identity */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#F5F5F5] tracking-wider">
            MB<span className="text-[#FF1493]">.</span>
          </span>
          <span>/</span>
          <span className="text-[#999999]">{personalInfo.name}</span>
          <span className="hidden sm:inline text-[#444444]">·</span>
          <span className="hidden sm:inline text-[#666666]">{personalInfo.educationInstitute}</span>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-left text-[#666666]">
          <span>© {new Date().getFullYear()} Murasoli Balaji. Crafted with intentional minimalism.</span>
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#999999] hover:text-[#F5F5F5] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#999999] hover:text-[#F5F5F5] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <span className="text-[rgba(255,255,255,0.12)]">|</span>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-[#999999] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF1493] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}