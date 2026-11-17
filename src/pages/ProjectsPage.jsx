import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Info } from 'lucide-react';
import { Github } from '../components/Icons';
import { featuredProjects, personalInfo } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen pt-36 pb-32 z-10 w-full bg-[#050505]">
      {/* Pink Glow Behind Main Content */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#FF1493]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
        
        {/* Back Link */}
        <div className="mb-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#B3B3B3] hover:text-[#FF1493] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF1493] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#FF1493]" />
            <span className="text-xs font-mono text-[#FF69B4] tracking-widest uppercase">
              // Archive
            </span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-display font-bold text-white tracking-tight mb-4">
            Projects & Architecture<span className="text-[#FF1493]">.</span>
          </h1>
          <p className="text-[#B3B3B3] max-w-2xl text-lg sm:text-xl font-light">
            Engineering software systems across autonomous voice AI, computational fluid dynamics, and enterprise data models.
          </p>
        </div>

        {/* Projects Showcase Cards with Charcoal Background & Pink Borders */}
        <div className="space-y-28 mb-36">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group p-8 sm:p-12 rounded-3xl bg-[#111111] border border-[rgba(255,20,147,0.20)] hover:border-[#FF1493] hover:shadow-[0_0_35px_rgba(255,20,147,0.25)] transition-all duration-500"
            >
              {/* Top Meta Line */}
              <div className="flex items-center justify-between text-xs font-mono text-[#B3B3B3] mb-4">
                <span className="text-[#FF1493] font-bold">{project.number}</span>
                <span className="px-3 py-1 rounded-full bg-[#050505] border border-[rgba(255,20,147,0.25)] text-[#FF69B4]">
                  {project.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-2 group-hover:text-[#FF69B4] transition-colors">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base font-mono text-[#B3B3B3] mb-8">
                {project.tagline}
              </p>

              {/* Visual Preview with Pink Rim / Glow on Hover */}
              <div
                onClick={() => setSelectedProject(project)}
                className="relative aspect-[21/9] sm:aspect-[16/8] rounded-2xl overflow-hidden bg-[#050505] border border-[rgba(255,20,147,0.25)] hover:border-[#FF1493] transition-all cursor-pointer mb-10 group/img"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-95 group-hover/img:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />
                <div className="absolute inset-0 bg-[#FF1493]/0 group-hover/img:bg-[#FF1493]/5 transition-colors duration-300" />
                
                <div className="absolute bottom-6 right-6 opacity-0 group-hover/img:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#050505]/90 backdrop-blur-md text-xs font-mono text-white border border-[#FF1493] shadow-[0_0_15px_rgba(255,20,147,0.5)]">
                    <span>Inspect Architecture</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FF1493]" />
                  </span>
                </div>
              </div>

              {/* Description & Technical Tags */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                  <p className="text-base sm:text-lg text-[#B3B3B3] leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#050505] text-[#B3B3B3] border border-[rgba(255,20,147,0.2)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex lg:justify-end gap-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#050505] border border-[rgba(255,20,147,0.3)] hover:border-[#FF1493] hover:text-[#FF69B4] text-white text-xs font-mono transition-all"
                  >
                    <Info className="w-3.5 h-3.5 text-[#FF1493]" />
                    <span>Deep Dive</span>
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF1493] hover:bg-[#FF4FBF] text-white text-xs font-mono font-medium shadow-[0_0_15px_rgba(255,20,147,0.4)] transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Contact Link */}
        <div className="pt-14 border-t border-[rgba(255,20,147,0.20)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <span className="text-[#B3B3B3]">
            Have questions about system implementations?
          </span>
          <Link to="/#contact" className="text-[#FF1493] hover:text-[#FF69B4] transition-colors">
            Get in Touch →
          </Link>
        </div>

      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
