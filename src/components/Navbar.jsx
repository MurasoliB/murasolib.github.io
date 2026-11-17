import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Stack', href: '/#stack' },
  { name: 'Projects', href: '/projects' },
  { name: 'Journey', href: '/#journey' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isProjects = location.pathname === '/projects';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isProjects
            ? 'py-4 bg-[#050505]/90 backdrop-blur-xl border-b border-[rgba(255,20,147,0.20)] shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
          {/* Minimal Monogram Logo with Pink Accent */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#111111] border border-[rgba(255,20,147,0.3)] flex items-center justify-center font-mono font-bold text-sm text-white group-hover:border-[#FF1493] group-hover:shadow-[0_0_15px_rgba(255,20,147,0.5)] transition-all">
              <span>{personalInfo.monogram.slice(0, 1)}</span>
              <span className="text-[#FF1493]">{personalInfo.monogram.slice(1)}</span>
            </div>
            <span className="hidden sm:inline text-xs text-[#B3B3B3] font-mono tracking-widest uppercase group-hover:text-white transition-colors">
              / Murasoli Balaji
            </span>
          </Link>

          {/* Desktop Links with Pink Hover and Active Indicator */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = isProjects
                ? link.name === 'Projects'
                : false;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative group text-xs font-mono tracking-widest uppercase transition-colors duration-200 py-1"
                >
                  <span className={active ? 'text-[#FF1493] font-semibold' : 'text-[#FFFFFF] group-hover:text-[#FF69B4]'}>
                    {link.name}
                  </span>
                  
                  {/* Smooth Animated Pink Underline */}
                  {active ? (
                    <motion.div
                      layoutId="navActiveLine"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF1493] shadow-[0_0_8px_#FF1493]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF1493] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#FF1493]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Socials & Rounded Hot Pink CTA Button */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#B3B3B3] hover:text-[#FF1493] hover:scale-110 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#B3B3B3] hover:text-[#FF1493] hover:scale-110 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <Link
              to="/#contact"
              className="text-xs font-mono font-semibold text-white px-5 py-2 rounded-full bg-[#FF1493] hover:bg-[#FF4FBF] shadow-[0_0_20px_rgba(255,20,147,0.45)] hover:shadow-[0_0_25px_rgba(255,20,147,0.7)] transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-white hover:text-[#FF1493] focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl md:hidden pt-28 px-8 pb-10 flex flex-col justify-between border-b border-[rgba(255,20,147,0.2)]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium text-white hover:text-[#FF1493] flex items-center justify-between transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF1493]" />
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-[rgba(255,20,147,0.2)] flex items-center justify-between">
              <div className="flex gap-5">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B3B3B3] hover:text-[#FF1493]"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B3B3B3] hover:text-[#FF1493]"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <span className="text-xs font-mono text-[#B3B3B3]">
                {personalInfo.location}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
