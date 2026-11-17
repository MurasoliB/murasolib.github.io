import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-14 border-t border-white/5 font-mono text-xs text-content-muted z-10 w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>{personalInfo.name}</span>
          <span className="mx-2 text-white/20">·</span>
          <span>{personalInfo.educationInstitute}</span>
        </div>

        <div className="flex items-center gap-6">
          <span>&copy; {new Date().getFullYear()}</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-content-secondary hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
