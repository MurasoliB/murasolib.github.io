import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundMesh from './components/BackgroundMesh';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

export default function App() {
  return (
    <Router>
      <div className="relative bg-background text-content-primary min-h-screen selection:bg-[#FF1493]/30 selection:text-white">
        {/* Precision Custom Cursor */}
        <CustomCursor />

        {/* Full-Screen Scroll-Driven Frame Animation Background */}
        <BackgroundMesh />

        {/* Floating Glass Navigation */}
        <Navbar />

        {/* Main Multi-Page Routed Views */}
        <main className="relative z-10 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Polished Editorial Footer */}
        <Footer />
      </div>
    </Router>
  );
}
