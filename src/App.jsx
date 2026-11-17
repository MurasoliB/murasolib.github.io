import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import ExperienceEducation from './components/ExperienceEducation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundMesh from './components/BackgroundMesh';

export default function App() {
  return (
    <div className="relative bg-background text-content-primary min-h-screen selection:bg-accent-blue/30 selection:text-white">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Full-Screen Scroll-Driven Frame Animation Background */}
      <BackgroundMesh />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Top Scroll Anchor */}
        <div id="home" className="h-16" />

        {/* 1. Editorial About & Philosophy */}
        <About />

        {/* 2. Interactive Technology Stack */}
        <TechStack />

        {/* 3. Large Visual Featured Projects */}
        <Projects />

        {/* 4. Modern Academic & Development Journey Timeline */}
        <ExperienceEducation />

        {/* 5. Validated Contact Section */}
        <Contact />
      </main>

      {/* Polished Editorial Footer */}
      <Footer />
    </div>
  );
}
