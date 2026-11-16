import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Eye, ShieldCheck, Cpu } from 'lucide-react';

export default function DigitalFrontier() {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('orbital'); // 'orbital', 'neural', 'quantum'
  const [isInteracting, setIsInteracting] = useState(false);
  const modeRef = useRef(activeMode);
  modeRef.current = activeMode;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090D, 0.035);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for entire interactive core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Geometric Structure: Wireframe Icosahedron + Outer Cage
    const icosaGeometry = new THREE.IcosahedronGeometry(4.2, 1);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0x4D8DFF,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const icosahedron = new THREE.Mesh(icosaGeometry, icosaMaterial);
    coreGroup.add(icosahedron);

    // Inner Core Sphere with subtle pulsing
    const innerGeo = new THREE.SphereGeometry(2.1, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x9B6BFF,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerSphere);

    // Outer Torus Ring
    const torusGeo = new THREE.TorusGeometry(6.2, 0.04, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x4D8DFF,
      transparent: true,
      opacity: 0.6,
    });
    const torusRing = new THREE.Mesh(torusGeo, torusMat);
    torusRing.rotation.x = Math.PI / 3;
    coreGroup.add(torusRing);

    // Secondary Torus Ring
    const torusRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(7.2, 0.03, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x9B6BFF, transparent: true, opacity: 0.4 })
    );
    torusRing2.rotation.x = -Math.PI / 4;
    torusRing2.rotation.y = Math.PI / 6;
    coreGroup.add(torusRing2);

    // 2. Interactive Quantum Particle Swarm
    const particleCount = 750;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      scales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const pCtx = particleCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.5, 'rgba(77, 141, 255, 0.6)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
      color: 0x9B6BFF,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Mouse Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 2.5;
      mouse.targetY = y * 2.5;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x;
      camera.position.y = mouse.y;
      camera.lookAt(scene.position);

      // Core rotation based on active mode
      const currentMode = modeRef.current;
      if (currentMode === 'orbital') {
        coreGroup.rotation.y = elapsedTime * 0.25;
        coreGroup.rotation.x = elapsedTime * 0.15;
        torusRing.rotation.z = elapsedTime * 0.35;
        torusRing2.rotation.z = -elapsedTime * 0.25;
      } else if (currentMode === 'neural') {
        coreGroup.rotation.y += 0.015;
        coreGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.3;
        innerSphere.scale.setScalar(1 + Math.sin(elapsedTime * 2.5) * 0.15);
      } else {
        // quantum
        coreGroup.rotation.y = elapsedTime * 0.4;
        coreGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.5;
        torusRing.rotation.x = elapsedTime * 0.5;
        torusRing2.rotation.y = elapsedTime * 0.4;
      }

      // Rotate particle cloud gently
      particleSystem.rotation.y = -elapsedTime * 0.06;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      cancelAnimationFrame(animationFrameId);

      icosaGeometry.dispose();
      icosaMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="frontier" className="relative py-28 bg-surface overflow-hidden border-t border-b border-border-subtle">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent-blue/10 via-accent-violet/5 to-transparent rounded-full pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 text-accent-blue text-xs uppercase tracking-widest font-mono mb-4"
          >
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Interactive 3D Matrix</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4"
          >
            EXPLORING THE DIGITAL FRONTIER.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-content-secondary max-w-2xl text-base md:text-lg"
          >
            An interactive spatial simulation reflecting algorithmic harmony, neural geometries, and real-time reactive depth. Move your cursor to manipulate the viewpoint.
          </motion.p>
        </div>

        {/* 3D Canvas Box */}
        <div className="relative w-full h-[520px] md:h-[600px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl group">
          {/* Three.js Mount Container */}
          <div
            ref={mountRef}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full"
          />

          {/* Interactive Mode Control Buttons */}
          <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
            {[
              { id: 'orbital', label: 'Orbital Mesh', icon: Cpu },
              { id: 'neural', label: 'Neural Core', icon: Eye },
              { id: 'quantum', label: 'Quantum Spin', icon: Sparkles },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveMode(id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium font-mono transition-all duration-300 backdrop-blur-md border ${
                  activeMode === id
                    ? 'bg-accent-blue/20 border-accent-blue text-white shadow-glow-blue'
                    : 'bg-surface-glass border-white/10 text-content-secondary hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${activeMode === id ? 'text-accent-blue' : ''}`} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Real-time telemetry indicators */}
          <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-4 bg-background/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 font-mono text-xs text-content-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
              <span className="text-content-primary">FPS: 60 STABLE</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-content-secondary">3D ENGINE: THREE.JS</span>
            <span className="text-white/20">|</span>
            <span className="text-accent-violet">RENDER: HARDWARE ACCELERATED</span>
          </div>

          {/* Status badge right */}
          <div className="absolute top-6 right-6 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-glass border border-white/10 backdrop-blur-md text-xs font-mono text-content-secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-blue" />
              <span>SPATIAL VECTOR ACTIVE</span>
            </div>
          </div>

          {/* Gentle interactive instruction hint */}
          <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
            <span className="text-xs font-mono text-content-muted bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
              Move cursor over canvas to inspect
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
