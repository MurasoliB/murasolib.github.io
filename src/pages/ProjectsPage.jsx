import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Info } from 'lucide-react';
import { Github } from '../components/Icons';
import { featuredProjects, moreProjects, personalInfo } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen pt-36 pb-32 z-10 w-full bg-[#050505]/75">
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

        {/* Projects Showcase: Consistent Layout (Text on Left, Image on Right like Project 01) */}
        <div className="space-y-16 sm:space-y-20 mb-36">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-6 sm:p-10 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#FF1493]/50 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Text Details (7 cols, always on Left) */}
                <div className="space-y-5 lg:col-span-7">
                  {/* Top Meta Line */}
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-[#FF1493] font-bold tracking-widest">{project.number}</span>
                    <span className="text-white/20">/</span>
                    <span className="px-3 py-0.5 rounded-full bg-white/[0.03] border border-white/10 text-[#FF69B4] text-[11px] uppercase tracking-wider">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2
                      onClick={() => setSelectedProject(project)}
                      className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight hover:text-[#FF69B4] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-[#FF69B4]/80 mt-1 uppercase tracking-wider">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#B3B3B3] leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/[0.03] text-white/70 border border-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 hover:border-[#FF1493] hover:text-[#FF69B4] text-white text-xs font-mono transition-all cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-[#FF1493]" />
                      <span>System Details</span>
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF1493] hover:bg-[#FF4FBF] text-white text-xs font-mono font-medium shadow-[0_0_15px_rgba(255,20,147,0.35)] transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Controlled, Compact Image Preview (5 cols, always on Right) */}
                <div className="lg:col-span-5">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group/img relative aspect-[16/10] max-h-[300px] w-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-[#FF1493] transition-all cursor-pointer shadow-lg"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} - ${project.tagline}`}
                      width="1376"
                      height="768"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover contrast-105 brightness-95 group-hover/img:scale-105 transition-all duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-20 transition-opacity" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050505]/90 backdrop-blur-md text-[11px] font-mono text-white border border-[#FF1493]">
                        <span>Expand</span>
                        <ArrowUpRight className="w-3 h-3 text-[#FF1493]" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects Section */}
        <div className="mb-36 pt-16 border-t border-white/10">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[2px] bg-white/40" />
              <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
                // System Archive &amp; Extended Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              More Projects<span className="text-[#FF1493]">.</span>
            </h2>
            <p className="text-[#B3B3B3] text-sm sm:text-base font-light mt-2 max-w-xl">
              Additional engineered platforms spanning academic evaluation engines, campus club orchestration, and enterprise cold-chain telemetry systems.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {moreProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group p-6 sm:p-10 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#FF1493]/50 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Text Details (7 cols, always on Left) */}
                  <div className="space-y-5 lg:col-span-7">
                    {/* Top Meta Line */}
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-[#FF1493] font-bold tracking-widest">{project.number}</span>
                      <span className="text-white/20">/</span>
                      <span className="px-3 py-0.5 rounded-full bg-white/[0.03] border border-white/10 text-[#FF69B4] text-[11px] uppercase tracking-wider">
                        {project.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h2
                        onClick={() => setSelectedProject(project)}
                        className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight hover:text-[#FF69B4] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-mono text-[#FF69B4]/80 mt-1 uppercase tracking-wider">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#B3B3B3] leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/[0.03] text-white/70 border border-white/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 hover:border-[#FF1493] hover:text-[#FF69B4] text-white text-xs font-mono transition-all cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-[#FF1493]" />
                        <span>System Details</span>
                      </button>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF1493] hover:bg-[#FF4FBF] text-white text-xs font-mono font-medium shadow-[0_0_15px_rgba(255,20,147,0.35)] transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Controlled, Compact Image Preview (5 cols, always on Right) */}
                  <div className="lg:col-span-5">
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="group/img relative aspect-[16/10] max-h-[300px] w-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-[#FF1493] transition-all cursor-pointer shadow-lg"
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.tagline}`}
                        width="1376"
                        height="768"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover contrast-105 brightness-95 group-hover/img:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-20 transition-opacity" />
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover/img:opacity-100 transition-opacity">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050505]/90 backdrop-blur-md text-[11px] font-mono text-white border border-[#FF1493]">
                          <span>Expand</span>
                          <ArrowUpRight className="w-3 h-3 text-[#FF1493]" />
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Contact Link */}
        <div className="pt-14 border-t border-[rgba(255,20,147,0.20)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs md:pr-10 lg:pr-12">
          <span className="text-[#B3B3B3]">
            Have questions about system implementations?
          </span>
          <button
            type="button"
            onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
            className="text-[#FF1493] hover:text-[#FF69B4] transition-colors cursor-pointer bg-transparent border-none"
          >
            Get in Touch →
          </button>
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
