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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isProjects
            ? 'py-4 bg-[#050505]/90 backdrop-blur-md border-b border-[rgba(255,255,255,0.12)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
          
          {/* Left: Minimal Monogram Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Home"
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-[#F5F5F5] group-hover:text-white transition-colors">
              MB<span className="text-[#FF1493]">.</span>
            </span>
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-[#666666] group-hover:text-[#999999] transition-colors">
              / Murasoli Balaji
            </span>
          </Link>

          {/* Center: Clean Minimal Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const active = isProjects
                ? link.name === 'Projects'
                : false;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative py-1 group text-xs font-mono uppercase tracking-widest transition-colors duration-200"
                >
                  <span className={active ? 'text-[#F5F5F5] font-medium' : 'text-[#999999] group-hover:text-[#F5F5F5]'}>
                    {link.name}
                  </span>
                  
                  {/* Subtle Hot Pink Active Indicator */}
                  {active && (
                    <motion.span
                      layoutId="navActiveDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF1493]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: GitHub, LinkedIn & Minimal Contact Link */}
          <div className="hidden md:flex items-center gap-6">
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
            <Link
              to="/#contact"
              className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] hover:text-[#FF1493] transition-colors pl-2"
            >
              <span>Contact</span>
              <span className="text-[#FF1493] group-hover:translate-x-0.5 transition-transform">↗</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-[#F5F5F5] hover:text-[#FF1493] focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl md:hidden pt-28 px-8 pb-10 flex flex-col justify-between border-b border-[rgba(255,255,255,0.12)]"
          >
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs text-[#666666] uppercase tracking-widest">// Navigation</span>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-display font-medium text-[#F5F5F5] hover:text-[#FF1493] flex items-center justify-between transition-colors border-b border-[rgba(255,255,255,0.06)] pb-4"
                >
                  <span>{link.name}</span>
                  <span className="font-mono text-xs text-[#FF1493]">↗</span>
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-[rgba(255,255,255,0.12)] flex items-center justify-between font-mono text-xs">
              <div className="flex gap-5">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-white"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <span className="text-[#666666]">
                {personalInfo.location}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
