import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import ExperienceEducation from './components/ExperienceEducation';
import DigitalFrontier from './components/DigitalFrontier';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundMesh from './components/BackgroundMesh';

export default function App() {
  return (
    <div className="relative bg-background text-content-primary min-h-screen selection:bg-accent-blue/30 selection:text-white">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Ambient Atmospheric Lighting & Grid Mesh */}
      <BackgroundMesh />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Cinematic Hero */}
        <Hero />

        {/* 2. Editorial About & Philosophy */}
        <About />

        {/* 3. Interactive Technology Stack */}
        <TechStack />

        {/* 4. Large Visual Featured Projects */}
        <Projects />

        {/* 5. Modern Academic & Development Journey Timeline */}
        <ExperienceEducation />

        {/* 6. Interactive 3D Digital Frontier (Three.js) */}
        <DigitalFrontier />

        {/* 7. Validated Contact Section */}
        <Contact />
      </main>

      {/* Polished Editorial Footer */}
      <Footer />
    </div>
  );
}
