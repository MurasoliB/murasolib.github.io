import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

const TOTAL_FRAMES = 25;

export default function BackgroundMesh() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);

  // useScroll tracks document scroll from 0 (top) to 1 (bottom)
  const { scrollYProgress } = useScroll();

  // Preload frame 1 immediately for instant render, and defer frames 2..25 to avoid crawl quota errors
  useEffect(() => {
    let isMounted = true;
    const loadedImages = new Array(TOTAL_FRAMES);

    // 1. Immediately load Frame 1 for instant background display
    const firstImg = new Image();
    firstImg.src = '/assets/frames/ezgif-frame-001.jpg';
    firstImg.onload = () => {
      if (isMounted) setLoaded(true);
    };
    loadedImages[0] = firstImg;
    imagesRef.current = loadedImages;

    // 2. Defer remaining frames until user interaction or idle to prevent Googlebot quota throttling
    const loadRemainingFrames = () => {
      if (!isMounted) return;
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (loadedImages[i - 1]) continue;
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `/assets/frames/ezgif-frame-${frameNum}.jpg`;
        loadedImages[i - 1] = img;
      }
    };

    const cleanupTriggers = () => {
      window.removeEventListener('scroll', handleTrigger);
      window.removeEventListener('pointerdown', handleTrigger);
      window.removeEventListener('touchstart', handleTrigger);
    };

    const handleTrigger = () => {
      loadRemainingFrames();
      cleanupTriggers();
    };

    window.addEventListener('scroll', handleTrigger, { passive: true, once: true });
    window.addEventListener('pointerdown', handleTrigger, { passive: true, once: true });
    window.addEventListener('touchstart', handleTrigger, { passive: true, once: true });

    // Idle fallback for human visitors after initial paint
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadRemainingFrames);
      } else {
        loadRemainingFrames();
      }
    }, 2500);

    return () => {
      isMounted = false;
      cleanupTriggers();
      clearTimeout(timer);
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

    // Helper to draw image cover across full viewport preserving center
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

        // Sub-frame cross-fading for unbroken fluid continuity
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
      {/* Full-Screen Scroll-Driven Frame Animation Canvas - Crisp & Highly Visible */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110 brightness-100 opacity-90 transition-opacity duration-700"
      />

      {/* Fallback image before frames finish loading */}
      {!loaded && (
        <img
          src="/assets/frames/ezgif-frame-001.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-110 brightness-100 opacity-90"
        />
      )}

      {/* Subtle, minimal vignette to ensure foreground contrast without obscuring the animation */}
      <div className="absolute inset-0 bg-background/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/60 pointer-events-none" />

      {/* Subtle Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
