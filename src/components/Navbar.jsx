import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Journey', href: '/#journey' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isProjectsPage = location.pathname === '/projects';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (isProjectsPage) {
        setActiveSection('projects');
        return;
      }

      if (window.scrollY < 80) {
        setActiveSection('home');
        return;
      }

      const sections = ['about', 'skills', 'projects-preview', 'journey', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section === 'projects-preview' ? 'projects' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectsPage]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isProjectsPage
            ? 'py-3.5 bg-background/85 backdrop-blur-xl border-b border-border-subtle shadow-glass'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 relative focus:outline-none"
            aria-label="Murasoli Balaji Home"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-card border border-white/10 flex items-center justify-center font-display font-extrabold text-base tracking-wider text-white group-hover:border-accent-blue/60 group-hover:shadow-glow-blue transition-all duration-300">
              <span className="text-gradient-dual">{personalInfo.monogram}</span>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-semibold tracking-wide text-white group-hover:text-accent-blue transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-content-muted">
                Portfolio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-glass border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = isProjectsPage
                ? item.name === 'Projects'
                : activeSection.toLowerCase() === item.name.toLowerCase();

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full ${
                    isActive ? 'text-white font-semibold' : 'text-content-secondary hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-accent-blue/15 border border-accent-blue/30 rounded-full shadow-glow-blue"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons / CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-surface-glass border border-white/10 text-content-secondary hover:text-white hover:border-accent-blue/50 hover:shadow-glow-blue transition-all"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-surface-glass border border-white/10 text-content-secondary hover:text-white hover:border-accent-blue/50 hover:shadow-glow-blue transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <Link
              to="/#contact"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue hover:text-white hover:shadow-glow-blue transition-all duration-300"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2.5 rounded-xl bg-surface-card border border-white/10 text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden pt-24 px-8 pb-10 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-content-muted mb-2">
                Navigation
              </span>
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display font-bold py-2 border-b border-white/5 flex items-center justify-between text-content-primary hover:text-accent-blue"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-content-muted" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-surface border border-white/10 text-sm font-medium text-white"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-surface border border-white/10 text-sm font-medium text-white"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <Link
                to="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-xl bg-accent-blue font-semibold text-white text-sm shadow-glow-blue"
              >
                Let's Connect
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
