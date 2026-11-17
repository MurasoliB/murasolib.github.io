import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import EditorialProjects from '../components/EditorialProjects';
import ProjectModal from '../components/ProjectModal';
import { featuredProjects } from '../data/portfolioData';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen pt-32 pb-32 z-10 w-full">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 w-full">
        
        {/* Back Link */}
        <div className="mb-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#999999] hover:text-[#F5F5F5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF1493] group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-transparent group-hover:border-[#F5F5F5] pb-0.5">Return to Overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-16 md:mb-24 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#666666]">
            <span className="text-[#FF1493] font-semibold">03.</span>
            <span>// Archive & Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-[#F5F5F5]">
            PROJECT CASE STUDIES<span className="text-[#FF1493]">.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] max-w-2xl leading-relaxed">
            Detailed technical breakdowns across autonomous conversational AI, hydrodynamic inundation modeling, 3NF transactional database systems, and full-stack administrative platforms.
          </p>
        </div>

      </div>

      {/* Editorial Case Studies Section */}
      <EditorialProjects onInspect={(proj) => setSelectedProject(proj)} />

      {/* Modal Deep Dive */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}