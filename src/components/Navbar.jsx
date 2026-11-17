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
            ? 'py-4 bg-background/85 backdrop-blur-xl border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
          {/* Minimal Monogram */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Home"
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-white group-hover:text-accent-blue transition-colors">
              {personalInfo.monogram}
            </span>
            <span className="hidden sm:inline text-xs text-content-muted font-mono tracking-widest uppercase">
              / Murasoli Balaji
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = isProjects
                ? link.name === 'Projects'
                : false;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors duration-200 ${
                    active
                      ? 'text-accent-blue font-medium'
                      : 'text-content-secondary hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Socials & Contact */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-content-muted hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-content-muted hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <Link
              to="/#contact"
              className="text-xs font-mono text-white px-4 py-2 rounded-full border border-white/10 hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden pt-28 px-8 pb-10 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium text-white hover:text-accent-blue flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-content-muted" />
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-content-secondary hover:text-white"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-content-secondary hover:text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <span className="text-xs font-mono text-content-muted">
                {personalInfo.location}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
