import React from 'react';
import { ArrowUp, Mail, Heart } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background/80 backdrop-blur-xs border-t border-border-subtle py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Logo & Headline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-surface-card border border-white/10 flex items-center justify-center font-display font-extrabold text-sm text-white">
                <span className="text-gradient-dual">{personalInfo.monogram}</span>
              </div>
              <span className="text-lg font-display font-bold text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-content-secondary max-w-sm">
              {personalInfo.headline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-surface-card border border-white/10 text-content-secondary hover:text-white hover:border-accent-blue/40 hover:shadow-glow-blue transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-surface-card border border-white/10 text-content-secondary hover:text-white hover:border-accent-blue/40 hover:shadow-glow-blue transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 rounded-2xl bg-surface-card border border-white/10 text-content-secondary hover:text-white hover:border-accent-blue/40 hover:shadow-glow-blue transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue hover:text-white transition-all ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-content-muted text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Murasoli Balaji. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Built with React, Vite & Tailwind CSS</span>
          </p>
          <p className="text-accent-blue/80">
            Kongu Engineering College
          </p>
        </div>

      </div>
    </footer>
  );
}
