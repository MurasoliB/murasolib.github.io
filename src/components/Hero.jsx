import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const TOTAL_FRAMES = 25;

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [framesLoaded, setFramesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Preload all 25 frames and handle high-DPI smooth canvas rendering
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/assets/frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        count++;
        if (count === TOTAL_FRAMES && isMounted) {
          setFramesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  // Smooth scroll interpolation & sub-frame cross-fade rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId;
    let currentFrame = 0;
    let targetFrame = 0;

    // Helper to draw image cover (centered crop, preserving 16:9 geometry)
    const drawCover = (img, alpha = 1) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const imgRatio = iw / ih;
      const canvasRatio = cw / ch;

      let sw, sh, sx, sy;
      if (imgRatio > canvasRatio) {
        sh = ih;
        sw = ih * canvasRatio;
        sx = (iw - sw) / 2;
        sy = 0;
      } else {
        sw = iw;
        sh = iw / canvasRatio;
        sx = 0;
        sy = (ih - sh) / 2;
      }

      ctx.globalAlpha = alpha;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    // Render loop with lerping and cross-fade
    const render = () => {
      // Smooth physics lerp
      const diff = targetFrame - currentFrame;
      currentFrame += diff * 0.12;

      const floorIdx = Math.floor(currentFrame);
      const ceilIdx = Math.min(TOTAL_FRAMES - 1, floorIdx + 1);
      const blend = currentFrame - floorIdx;

      const images = imagesRef.current;
      const baseImg = images[floorIdx] || images[0];

      if (baseImg && baseImg.complete) {
        ctx.globalAlpha = 1;
        drawCover(baseImg, 1);

        // Sub-frame cross-fade for seamless buttery smoothness
        if (blend > 0.005 && ceilIdx !== floorIdx && images[ceilIdx]?.complete) {
          drawCover(images[ceilIdx], blend);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Subscribe to Framer Motion scroll progress
    const unsubscribeScroll = scrollYProgress.on('change', (latest) => {
      targetFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, latest * (TOTAL_FRAMES - 1)));
    });

    // Auto-resize canvas for retina sharpness
    const updateCanvasSize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      cancelAnimationFrame(animId);
      unsubscribeScroll();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Cinematic Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-accent-violet/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Animated Editorial Content */}
          <motion.div
            style={{ y: textY, opacity }}
            className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1"
          >
            {/* Availability Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md self-start mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono font-medium tracking-wider text-emerald-300 uppercase">
                Available for Innovation & Projects
              </span>
            </motion.div>

            {/* Subtitle Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-accent-blue text-xs md:text-sm font-mono tracking-widest uppercase mb-3"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-blue animate-pulse" />
              <span>{personalInfo.tagline}</span>
            </motion.div>

            {/* Massive Editorial Hero Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white leading-[0.95] mb-4">
                MURASOLI<span className="text-accent-blue">.</span>
              </h1>
            </motion.div>

            {/* Animated Greeting & Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-content-primary flex items-center gap-2">
                <span>{personalInfo.heroIntro}</span>
              </h2>
              <p className="text-base sm:text-lg font-medium text-accent-blue mt-1">
                {personalInfo.headline}
              </p>
            </motion.div>

            {/* Short Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-content-secondary text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              Undergraduate in Information Technology at <span className="text-white font-medium">{personalInfo.educationInstitute}</span>. Passionate about engineering intelligent systems, full-stack architectures, and solving challenging algorithmic problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-accent-blue text-white font-semibold text-sm shadow-glow-blue hover:bg-blue-500 transition-all duration-300"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-surface-glass border border-white/10 hover:border-accent-blue/40 text-content-primary hover:text-white font-semibold text-sm backdrop-blur-md transition-all duration-300 hover:shadow-glass"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4 text-accent-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Quick Tech Highlights Badge Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex items-center gap-4 pt-4 border-t border-white/5"
            >
              <span className="text-xs font-mono text-content-muted uppercase tracking-wider">
                Focus Core:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-content-secondary">
                {['Java', 'Python', 'React', 'AI Systems', 'MySQL / NoSQL'].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-surface-card border border-white/5 text-content-secondary hover:text-white hover:border-accent-blue/30 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: High-End Cinematic Portrait with Smooth Scroll Animation */}
          <motion.div
            style={{ y: portraitY, opacity }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] group"
            >
              {/* Cinematic Backdrop Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue/30 to-accent-violet/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

              {/* Main Portrait Card Container */}
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl bg-surface-card">
                
                {/* Smooth Scroll Animation Canvas */}
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95 group-hover:scale-[1.02] transition-transform duration-500 ease-out cursor-default"
                  />

                  {/* Fallback image while frames initialize */}
                  {!framesLoaded && (
                    <img
                      src="/assets/frames/ezgif-frame-001.jpg"
                      alt="Murasoli Balaji"
                      className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-110 brightness-95 pointer-events-none"
                    />
                  )}

                  {/* Editorial Film-Grain Vignette & Lighting Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90 pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />

                  {/* Ambient Portrait Overlay Details */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-content-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                      EDITORIAL CAPTURE
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between pointer-events-none">
                    <div>
                      <p className="text-xs font-mono text-content-muted">LOCATION</p>
                      <p className="text-sm font-semibold text-white tracking-wide">
                        {personalInfo.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-content-muted">AFFILIATION</p>
                      <p className="text-sm font-semibold text-accent-blue tracking-wide">
                        Kongu Engg. College
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle card bottom accent border */}
                <div className="h-1 w-full bg-gradient-to-r from-accent-blue via-accent-violet to-accent-blue opacity-70" />
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-content-muted">
            Scroll To Discover
          </span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-accent-blue"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
