import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

const TOTAL_FRAMES = 25;

export default function BackgroundMesh() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);

  // useScroll with no parameters tracks the entire document scroll (0 at top, 1 at bottom)
  const { scrollYProgress } = useScroll();

  // Preload all 25 frames for zero-lag background scrubbing
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
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  // Smooth scroll interpolation and high-performance canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId;
    let currentFrame = 0;
    let targetFrame = 0;

    // Helper to draw image cover across full viewport
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

    const render = () => {
      // Smooth lerp equation for Apple-like inertia
      const diff = targetFrame - currentFrame;
      currentFrame += diff * 0.1;

      const floorIdx = Math.floor(currentFrame);
      const ceilIdx = Math.min(TOTAL_FRAMES - 1, floorIdx + 1);
      const blend = currentFrame - floorIdx;

      const images = imagesRef.current;
      const baseImg = images[floorIdx] || images[0];

      if (baseImg && baseImg.complete) {
        ctx.globalAlpha = 1;
        drawCover(baseImg, 1);

        // Sub-frame cross-fading for seamless continuity
        if (blend > 0.005 && ceilIdx !== floorIdx && images[ceilIdx]?.complete) {
          drawCover(images[ceilIdx], blend);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Subscribe to full page scroll progress
    const unsubscribeScroll = scrollYProgress.on('change', (latest) => {
      targetFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, latest * (TOTAL_FRAMES - 1)));
    });

    // Resize canvas dynamically to match viewport with device pixel ratio
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      unsubscribeScroll();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Full-Screen Scroll-Driven Frame Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 opacity-35 transition-opacity duration-1000"
      />

      {/* Fallback image before frames finish loading */}
      {!loaded && (
        <img
          src="/assets/frames/ezgif-frame-001.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 opacity-35"
        />
      )}

      {/* Cinematic Deep Dark Overlay & Vignette for Readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/40 to-background/90" />

      {/* Ambient Atmospheric Glow Orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-radial from-accent-blue/[0.08] via-accent-violet/[0.03] to-transparent blur-[140px]" />
      <div className="absolute top-[40%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-gradient-radial from-accent-violet/[0.06] via-accent-blue/[0.02] to-transparent blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-accent-blue/[0.05] to-transparent blur-[120px]" />

      {/* Subtle Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
