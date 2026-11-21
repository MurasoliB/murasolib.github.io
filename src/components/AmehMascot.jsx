import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AmehMascot - High-fidelity living 3D-styled animated mascot for AMEH AI
 * 
 * Features:
 * - 3D glossy ceramic rendering with vector lighting, visor reflection, and glowing neon-pink eyes
 * - Procedural eye-tracking following the visitor's cursor across the viewport
 * - Emotional states: IDLE, CURIOUS, HAPPY, EXCITED, THINKING, LISTENING, TALKING, SLEEP
 * - Locomotion modes: IDLE (floating), WALK (walking with leg animation), FLY (jetpack with thrust flames)
 * - Natural organic floating, breathing bob, and responsive head tilts
 * - Interactive hover bubble ("Hey! I'm AMEH AI 👋") and click bounce
 * - Seamless integration with Chatbot states (Thinking while Gemini calls, Listening while typing)
 */
export default function AmehMascot({
  size = 110,
  emotion = 'IDLE', // 'IDLE' | 'CURIOUS' | 'HAPPY' | 'EXCITED' | 'THINKING' | 'LISTENING' | 'TALKING' | 'SLEEP'
  locomotion = 'FLY', // Default 'FLY': Always flying with active jetpack thrusters
  isTurbo = false, // Extra thrust / flame surge when scrolling or boosting
  facingLeft = false,
  onClick,
  isFloating = true,
  className = ""
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [talkTick, setTalkTick] = useState(0);
  const mascotRef = useRef(null);

  // Periodic natural blinking (every 3.5 to 6 seconds)
  useEffect(() => {
    if (emotion === 'SLEEP') return;

    let timeoutId;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
      const nextDelay = 3500 + Math.random() * 3000;
      timeoutId = setTimeout(triggerBlink, nextDelay);
    };

    timeoutId = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeoutId);
  }, [emotion]);

  // Subtle mouth/eye modulation when TALKING
  useEffect(() => {
    if (emotion !== 'TALKING') return;
    const interval = setInterval(() => {
      setTalkTick((prev) => (prev + 1) % 4);
    }, 120);
    return () => clearInterval(interval);
  }, [emotion]);

  // Track cursor position to tilt head and move eyes
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - mascotCenterX;
      const deltaY = e.clientY - mascotCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      // Normalize look direction within max 6px radius for eyes
      const maxEyeOffset = 5.5;
      const factor = Math.min(distance / 400, 1);
      const angle = Math.atan2(deltaY, deltaX);

      setMousePos({
        eyeX: Math.cos(angle) * maxEyeOffset * factor,
        eyeY: Math.sin(angle) * maxEyeOffset * factor,
        tiltZ: Math.max(Math.min((deltaX / window.innerWidth) * 12, 10), -10),
        distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Compute eye parameters based on emotion & hover interaction
  const eyeState = useMemo(() => {
    // When pointer hovers over mascot, beam with bright happy smiling eyes
    if (isHovered) {
      return { type: 'arc', glow: 1, color: '#FF4FBF', scale: 1.2 };
    }
    if (emotion === 'SLEEP') {
      return { type: 'closed', glow: 0.25, color: '#FF1493', scale: 0.9 };
    }
    if (isBlinking) {
      return { type: 'blink', glow: 0.4, color: '#FF1493', scale: 1 };
    }
    if (emotion === 'HAPPY' || emotion === 'EXCITED') {
      return { type: 'arc', glow: 1, color: '#FF4FBF', scale: 1.15 };
    }
    if (emotion === 'THINKING') {
      return { type: 'thinking', glow: 0.8, color: '#FF1493', scale: 1 };
    }
    if (emotion === 'LISTENING') {
      return { type: 'wide', glow: 0.95, color: '#FF69B4', scale: 1.1 };
    }
    if (emotion === 'TALKING') {
      return { type: 'talking', glow: 0.85 + (talkTick % 2) * 0.2, color: '#FF1493', scale: 1 };
    }
    return { type: 'normal', glow: 0.75, color: '#FF1493', scale: 1 };
  }, [emotion, isBlinking, talkTick, isHovered]);

  // Dynamic Eye Coordinates with cursor tracking
  const eyeOffsetX = (emotion === 'SLEEP' || emotion === 'THINKING') ? 0 : (mousePos.eyeX || 0);
  const eyeOffsetY = (emotion === 'SLEEP' || emotion === 'THINKING') ? 0 : (mousePos.eyeY || 0);

  return (
    <div
      ref={mascotRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size * 1.25 }}
    >
      {/* Interactive Tooltip Bubble on Hover */}
      <AnimatePresence>
        {isHovered && isFloating && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0E0C14]/95 border border-[#FF1493]/70 shadow-[0_0_15px_rgba(255,20,147,0.45)] whitespace-nowrap z-30 pointer-events-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[11px] font-mono font-semibold text-white tracking-wide">
                Hey! I'm AMEH AI 👋
              </span>
            </div>
            {/* Tiny speech pointer notch */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0E0C14] border-r border-b border-[#FF1493]/70 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mascot Canvas */}
      <motion.div
        animate={
          isFloating
            ? isHovered
              ? {
                  y: [-12, -2, -12],
                  rotate: [mousePos.tiltZ || 0, (mousePos.tiltZ || 0) + 3, mousePos.tiltZ || 0],
                  scale: [1.02, 1.06, 1.02]
                }
            : locomotion === 'FLY'
              ? {
                  y: isTurbo ? [-15, 3, -15] : [-10, 2, -10],
                  rotate: facingLeft
                    ? isTurbo ? [8, 14, 8] : [4, 9, 4]
                    : isTurbo ? [-8, -14, -8] : [-4, -9, -4],
                  scale: isTurbo ? [1.02, 1.07, 1.02] : [1, 1.03, 1]
                }
              : locomotion === 'WALK'
              ? { y: [-3, 1, -3], rotate: facingLeft ? [-1, 2, -1] : [1, -2, 1] }
              : emotion === 'EXCITED'
              ? { y: [-14, -2, -14], rotate: [-4, 4, -4], scale: [1, 1.06, 1] }
              : emotion === 'THINKING'
              ? { y: [-4, 4, -4], rotate: [-2, 2, -2] }
              : emotion === 'SLEEP'
              ? { y: [0, 4, 0], rotate: [2, 2, 2] }
              : { y: [-7, 7, -7], rotate: [mousePos.tiltZ || 0, (mousePos.tiltZ || 0) + 2, mousePos.tiltZ || 0] }
            : {}
        }
        transition={{
          duration:
            isHovered
              ? 0.8
              : locomotion === 'FLY'
              ? isTurbo ? 0.65 : 1.15
              : locomotion === 'WALK'
              ? 0.55
              : emotion === 'EXCITED'
              ? 1.2
              : emotion === 'SLEEP'
              ? 6
              : 4.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
          transformOrigin: 'center center',
          transition: 'transform 0.28s ease-in-out'
        }}
        className="w-full h-full relative"
      >
        <svg
          viewBox="0 0 120 152"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
        >
          <defs>
            {/* 3D Glossy White Ceramic Head Gradient */}
            <radialGradient id="ceramic-head" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="42%" stopColor="#F8F6FA" />
              <stop offset="78%" stopColor="#DDD8E6" />
              <stop offset="100%" stopColor="#A89FB8" />
            </radialGradient>

            {/* 3D Glossy White Ceramic Body Gradient */}
            <radialGradient id="ceramic-body" cx="42%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F4F1F7" />
              <stop offset="85%" stopColor="#D5CFE0" />
              <stop offset="100%" stopColor="#9C92AC" />
            </radialGradient>

            {/* Deep Glossy Obsidian Visor */}
            <radialGradient id="visor-glass" cx="45%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#1E1228" />
              <stop offset="45%" stopColor="#0F0916" />
              <stop offset="100%" stopColor="#050308" />
            </radialGradient>

            {/* Metallic Accents & Seams */}
            <linearGradient id="metal-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3C3647" />
              <stop offset="100%" stopColor="#1C1824" />
            </linearGradient>

            {/* Jetpack Metallic Shell Gradient */}
            <linearGradient id="jetpack-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E2DEEB" />
              <stop offset="70%" stopColor="#A8A0B8" />
              <stop offset="100%" stopColor="#5D556C" />
            </linearGradient>

            {/* Jetpack Thruster Nozzle Gradient */}
            <linearGradient id="nozzle-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A4257" />
              <stop offset="70%" stopColor="#1F1B26" />
              <stop offset="100%" stopColor="#0B090F" />
            </linearGradient>

            {/* Outer Plasma Aura Gradient */}
            <linearGradient id="outer-plasma-grad" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#FF1493" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#FF69B4" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#FF1493" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF1493" stopOpacity="0" />
            </linearGradient>

            {/* Jet Flame Main Gradient */}
            <linearGradient id="jet-flame-grad" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="15%" stopColor="#FFF0F8" />
              <stop offset="40%" stopColor="#FF69B4" />
              <stop offset="75%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#FF1493" stopOpacity="0" />
            </linearGradient>

            {/* Jet Flame Core Gradient */}
            <radialGradient id="flame-core" cx="50%" cy="15%" r="75%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FFD2EC" />
              <stop offset="70%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#FF1493" stopOpacity="0" />
            </radialGradient>

            {/* Supersonic Shock Diamond Gradient */}
            <linearGradient id="shock-diamond-grad" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FFD8EF" />
              <stop offset="100%" stopColor="#FF1493" />
            </linearGradient>

            {/* Eye Glow Radial Gradient */}
            <radialGradient id="pink-eye-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FF69B4" />
              <stop offset="80%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#FF1493" stopOpacity="0" />
            </radialGradient>

            {/* Neon Pink Shadow Filter */}
            <filter id="neon-pink-eye-filter" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Ambient Pink Glow Filter */}
            <filter id="ambient-pink-halo" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="9" />
            </filter>

            {/* Jet Flame Intense Heat Blur */}
            <filter id="jet-flame-heat" x="-30%" y="-20%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="heatBlur" />
              <feMerge>
                <feMergeNode in="heatBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* HOVER GLOW / SHADOW UNDERNEATH MASCOT                         */}
          {/* Dynamic ground thrust heat blast discs                        */}
          {/* ============================================================== */}
          {/* Left Thruster Ground Blast */}
          <ellipse
            cx="36.5"
            cy="147"
            rx={isTurbo ? 16 : 10}
            ry={isTurbo ? 3.5 : 2.2}
            fill="#FF1493"
            fillOpacity={isTurbo ? 0.65 : 0.45}
            filter="url(#ambient-pink-halo)"
          />
          {/* Right Thruster Ground Blast */}
          <ellipse
            cx="83.5"
            cy="147"
            rx={isTurbo ? 16 : 10}
            ry={isTurbo ? 3.5 : 2.2}
            fill="#FF1493"
            fillOpacity={isTurbo ? 0.65 : 0.45}
            filter="url(#ambient-pink-halo)"
          />
          {/* Central Ground Ambient Reflection */}
          <ellipse
            cx="60"
            cy="146"
            rx={isTurbo ? 30 : 20}
            ry={isTurbo ? 4.5 : 3}
            fill="#FF1493"
            fillOpacity={isTurbo ? 0.4 : 0.25}
            filter="url(#ambient-pink-halo)"
          />

          {/* ============================================================== */}
          {/* JETPACK BACKPACK & THRUST ENGINES (Mounted on Back)           */}
          {/* ============================================================== */}
          <g id="mascot-jetpack">
            {/* Connecting Frame / Manifold */}
            <rect x="36" y="82" width="48" height="11" rx="3.5" fill="url(#metal-dark)" stroke="#1A1624" strokeWidth="0.8" />

            {/* Glowing Neon-Pink Power Strip */}
            <rect x="46" y="85.5" width="28" height="2.5" rx="1.2" fill="#FF1493" filter="url(#neon-pink-eye-filter)" />
            <rect x="48" y="86" width="24" height="1.4" rx="0.7" fill="#FFFFFF" />

            {/* Left Thruster Pod */}
            <rect x="30" y="78" width="13" height="24" rx="5.5" fill="url(#jetpack-body)" stroke="#9F95B5" strokeWidth="0.8" />
            <rect x="32" y="80" width="3" height="18" rx="1.5" fill="#FFFFFF" fillOpacity="0.55" />
            {/* Left Exhaust Nozzle */}
            <path d="M 31 102 L 42 102 L 44 108 L 29 108 Z" fill="url(#nozzle-grad)" stroke="#14101E" strokeWidth="0.8" />

            {/* Right Thruster Pod */}
            <rect x="77" y="78" width="13" height="24" rx="5.5" fill="url(#jetpack-body)" stroke="#9F95B5" strokeWidth="0.8" />
            <rect x="79" y="80" width="3" height="18" rx="1.5" fill="#FFFFFF" fillOpacity="0.55" />
            {/* Right Exhaust Nozzle */}
            <path d="M 78 102 L 89 102 L 91 108 L 76 108 Z" fill="url(#nozzle-grad)" stroke="#14101E" strokeWidth="0.8" />

            {/* ============================================================ */}
            {/* HYPER-CHARGED MULTI-STAGE JETPACK ROCKET FLAMES              */}
            {/* Always active when mascot is floating                        */}
            {/* ============================================================ */}
            {(isFloating || locomotion === 'FLY') && (
              <g id="jetpack-flames">
                {/* -------------------------------------------------------- */}
                {/* LEFT THRUSTER ADVANCED FLAME ASSEMBLY                    */}
                {/* -------------------------------------------------------- */}
                <g id="left-thruster-assembly">
                  {/* Outer Wide Plasma Glow Cone */}
                  <motion.path
                    d={
                      isTurbo
                        ? "M 28 108 Q 36.5 148 36.5 152 Q 36.5 148 45 108 Z"
                        : "M 29 108 Q 36.5 138 36.5 142 Q 36.5 138 44 108 Z"
                    }
                    fill="url(#outer-plasma-grad)"
                    filter="url(#ambient-pink-halo)"
                    animate={{
                      scaleY: isTurbo ? [1.1, 1.45, 1.15, 1.4, 1.1] : [1, 1.25, 0.95, 1.2, 1],
                      scaleX: [1, 0.94, 1.06, 0.96, 1],
                      opacity: [0.75, 0.95, 0.8, 0.9, 0.75]
                    }}
                    transition={{ duration: isTurbo ? 0.18 : 0.26, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '36.5px 108px' }}
                  />

                  {/* Main Roaring Flame Body */}
                  <motion.path
                    d={
                      isTurbo
                        ? "M 30 108 Q 36.5 144 36.5 147 Q 36.5 144 43 108 Z"
                        : "M 31 108 Q 36.5 134 36.5 137 Q 36.5 134 42 108 Z"
                    }
                    fill="url(#jet-flame-grad)"
                    filter="url(#neon-pink-eye-filter)"
                    animate={{
                      scaleY: isTurbo ? [1.15, 1.4, 1.05, 1.35, 1.15] : [1, 1.25, 0.92, 1.18, 1],
                      scaleX: [1, 0.92, 1.05, 0.95, 1]
                    }}
                    transition={{ duration: isTurbo ? 0.2 : 0.28, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '36.5px 108px' }}
                  />

                  {/* Twin Turbulent Flame Licks (Crackling Jet Edge) */}
                  <motion.path
                    d="M 33 108 Q 35 126 36.5 132 Q 38 122 39 108 Z"
                    fill="#FF4FA8"
                    animate={{
                      scaleY: [0.9, 1.3, 0.85, 1.25, 0.9],
                      skewX: [-3, 3, -2, 2, -3]
                    }}
                    transition={{ duration: 0.16, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '36.5px 108px' }}
                  />

                  {/* Focused White-Hot Plasma Core */}
                  <motion.path
                    d={
                      isTurbo
                        ? "M 33.5 108 Q 36.5 128 36.5 131 Q 36.5 128 39.5 108 Z"
                        : "M 34 108 Q 36.5 122 36.5 124 Q 36.5 122 39 108 Z"
                    }
                    fill="url(#flame-core)"
                    animate={{
                      scaleY: isTurbo ? [1.1, 1.35, 1.05, 1.3, 1.1] : [1, 1.2, 0.9, 1.15, 1],
                      opacity: [0.9, 1, 0.85, 1, 0.9]
                    }}
                    transition={{ duration: 0.14, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '36.5px 108px' }}
                  />

                  {/* Supersonic Shock Diamonds (Mach Disks along exhaust stream) */}
                  <g id="left-shock-diamonds">
                    {/* Diamond 1 */}
                    <polygon points="36.5,111 38.5,114 36.5,117 34.5,114" fill="#FFFFFF" opacity="0.95" />
                    {/* Diamond 2 */}
                    <polygon points="36.5,118 38.2,121.5 36.5,124.5 34.8,121.5" fill="#FFE2F3" opacity="0.88" />
                    {/* Diamond 3 */}
                    <polygon points="36.5,125 37.8,127.8 36.5,130.5 35.2,127.8" fill="#FF85C8" opacity="0.75" />
                  </g>

                  {/* Superheated White Throat Collar */}
                  <ellipse cx="36.5" cy="108" rx="6.5" ry="1.6" fill="#FFFFFF" filter="url(#neon-pink-eye-filter)" />
                  <ellipse cx="36.5" cy="108" rx="4" ry="1" fill="#FFFFFF" />
                </g>

                {/* -------------------------------------------------------- */}
                {/* RIGHT THRUSTER ADVANCED FLAME ASSEMBLY                   */}
                {/* -------------------------------------------------------- */}
                <g id="right-thruster-assembly">
                  {/* Outer Wide Plasma Glow Cone */}
                  <motion.path
                    d={
                      isTurbo
                        ? "M 75 108 Q 83.5 148 83.5 152 Q 83.5 148 92 108 Z"
                        : "M 76 108 Q 83.5 138 83.5 142 Q 83.5 138 91 108 Z"
                    }
                    fill="url(#outer-plasma-grad)"
                    filter="url(#ambient-pink-halo)"
                    animate={{
                      scaleY: isTurbo ? [1.15, 1.4, 1.1, 1.45, 1.15] : [1.2, 0.95, 1.25, 1, 1.2],
                      scaleX: [0.95, 1.05, 0.94, 1, 0.95],
                      opacity: [0.8, 0.95, 0.75, 0.92, 0.8]
                    }}
                    transition={{ duration: isTurbo ? 0.18 : 0.26, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '83.5px 108px' }}
                  />

                  {/* Main Roaring Flame Body */}
                  <motion.path
                    d={
                      isTurbo
                        ? "M 77 108 Q 83.5 144 83.5 147 Q 83.5 144 90 108 Z"
                        : "M 78 108 Q 83.5 134 83.5 137 Q 83.5 134 89 108 Z"
                    }
                    fill="url(#jet-flame-grad)"
                    filter="url(#neon-pink-eye-filter)"
                    animate={{
                      scaleY: isTurbo ? [1.2, 1.05, 1.4, 1.15, 1.2] : [1.22, 0.9, 1.25, 1, 1.22],
                      scaleX: [0.94, 1.06, 0.92, 1, 0.94]
                    }}
                    transition={{ duration: isTurbo ? 0.2 : 0.28, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '83.5px 108px' }}
                  />

                  {/* Twin Turbulent Flame Licks (Crackling Jet Edge) */}
                  <motion.path
                    d="M 80 108 Q 82 126 83.5 132 Q 85 122 86 108 Z"
                    fill="#FF4FA8"
                    animate={{
                      scaleY: [1.25, 0.85, 1.3, 0.9, 1.25],
                      skewX: [3, -3, 2, -2, 3]
                    }}
                    transition={{ duration: 0.16, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '83.5px 108px' }}
                  />

                  {/* Focused White-Hot Plasma Core */}
                  <motion.path
                    d={
                      isTurbo
                        ? "M 80.5 108 Q 83.5 128 83.5 131 Q 83.5 128 86.5 108 Z"
                        : "M 81 108 Q 83.5 122 83.5 124 Q 83.5 122 86 108 Z"
                    }
                    fill="url(#flame-core)"
                    animate={{
                      scaleY: isTurbo ? [1.2, 1.05, 1.35, 1.1, 1.2] : [1.15, 0.9, 1.2, 1, 1.15],
                      opacity: [0.9, 1, 0.85, 1, 0.9]
                    }}
                    transition={{ duration: 0.14, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '83.5px 108px' }}
                  />

                  {/* Supersonic Shock Diamonds (Mach Disks along exhaust stream) */}
                  <g id="right-shock-diamonds">
                    {/* Diamond 1 */}
                    <polygon points="83.5,111 85.5,114 83.5,117 81.5,114" fill="#FFFFFF" opacity="0.95" />
                    {/* Diamond 2 */}
                    <polygon points="83.5,118 85.2,121.5 83.5,124.5 81.8,121.5" fill="#FFE2F3" opacity="0.88" />
                    {/* Diamond 3 */}
                    <polygon points="83.5,125 84.8,127.8 83.5,130.5 82.2,127.8" fill="#FF85C8" opacity="0.75" />
                  </g>

                  {/* Superheated White Throat Collar */}
                  <ellipse cx="83.5" cy="108" rx="6.5" ry="1.6" fill="#FFFFFF" filter="url(#neon-pink-eye-filter)" />
                  <ellipse cx="83.5" cy="108" rx="4" ry="1" fill="#FFFFFF" />
                </g>

                {/* -------------------------------------------------------- */}
                {/* CASCADING HIGH-ENERGY PLASMA SPARKS & EMBERS             */}
                {/* -------------------------------------------------------- */}
                <g id="cascading-sparks">
                  {/* Left Stream Embers */}
                  <circle cx="36.5" cy="138" r="1.4" fill="#FFFFFF" filter="url(#neon-pink-eye-filter)" />
                  <circle cx="34" cy="143" r="1.2" fill="#FF69B4" opacity="0.85" />
                  <circle cx="38.5" cy="146" r="1.0" fill="#FF1493" opacity="0.9" />
                  <circle cx="35" cy="150" r="0.8" fill="#FFFFFF" opacity="0.7" />

                  {/* Right Stream Embers */}
                  <circle cx="83.5" cy="138" r="1.4" fill="#FFFFFF" filter="url(#neon-pink-eye-filter)" />
                  <circle cx="86" cy="143" r="1.2" fill="#FF69B4" opacity="0.85" />
                  <circle cx="81.5" cy="146" r="1.0" fill="#FF1493" opacity="0.9" />
                  <circle cx="84.5" cy="150" r="0.8" fill="#FFFFFF" opacity="0.7" />

                  {/* Floating Drift Embers */}
                  <circle cx="31" cy="141" r="0.7" fill="#FF85C8" opacity="0.6" />
                  <circle cx="42" cy="145" r="0.9" fill="#FF1493" opacity="0.75" />
                  <circle cx="78" cy="145" r="0.9" fill="#FF1493" opacity="0.75" />
                  <circle cx="89" cy="141" r="0.7" fill="#FF85C8" opacity="0.6" />
                </g>
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* TORSO & ARMS & ANIMATED FEET                                  */}
          {/* ============================================================== */}
          <g id="mascot-lower-body">
            {/* Left Foot / Animated Walking Pod */}
            <motion.g
              animate={
                locomotion === 'WALK'
                  ? { y: [0, -8, -1, 0], x: [0, 5, -2, 0], rotate: [-8, 14, -2, -8] }
                  : locomotion === 'FLY'
                  ? { y: -2, x: 1, rotate: -8 }
                  : {}
              }
              transition={{
                duration: 0.52,
                repeat: locomotion === 'WALK' ? Infinity : 0,
                ease: 'easeInOut'
              }}
              style={{ transformOrigin: '44px 114px' }}
            >
              <ellipse cx="44" cy="114" rx="9" ry="7" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
              <ellipse cx="43" cy="112" rx="5" ry="3" fill="#FFFFFF" fillOpacity="0.6" />
            </motion.g>

            {/* Right Foot / Animated Walking Pod */}
            <motion.g
              animate={
                locomotion === 'WALK'
                  ? { y: [-1, 0, -8, 0], x: [-2, 0, 5, 0], rotate: [-2, -8, 14, -2] }
                  : locomotion === 'FLY'
                  ? { y: -2, x: -1, rotate: 8 }
                  : {}
              }
              transition={{
                duration: 0.52,
                repeat: locomotion === 'WALK' ? Infinity : 0,
                ease: 'easeInOut'
              }}
              style={{ transformOrigin: '76px 114px' }}
            >
              <ellipse cx="76" cy="114" rx="9" ry="7" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
              <ellipse cx="75" cy="112" rx="5" ry="3" fill="#FFFFFF" fillOpacity="0.6" />
            </motion.g>

            {/* Round Pear-shaped Torso */}
            <path
              d="M 38 78 Q 30 96 36 109 Q 44 118 60 118 Q 76 118 84 109 Q 90 96 82 78 Q 72 73 60 73 Q 48 73 38 78 Z"
              fill="url(#ceramic-body)"
              stroke="#B6ADCA"
              strokeWidth="0.8"
            />

            {/* Specular Torso Highlight */}
            <ellipse cx="50" cy="88" rx="14" ry="7" transform="rotate(-15 50 88)" fill="#FFFFFF" fillOpacity="0.45" />

            {/* Torso Seam Line */}
            <path d="M 68 76 Q 74 88 83 93" stroke="#8C819F" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />

            {/* Lower Abdomen Vents (Matching Reference) */}
            <g opacity="0.65">
              <rect x="55.5" y="103" width="1.2" height="5" rx="0.6" fill="#4B4459" />
              <rect x="58.5" y="103" width="1.2" height="5" rx="0.6" fill="#4B4459" />
              <rect x="61.5" y="103" width="1.2" height="5" rx="0.6" fill="#4B4459" />
              <rect x="64.5" y="103" width="1.2" height="5" rx="0.6" fill="#4B4459" />
            </g>

            {/* Left Arm Nub with Walk Swing Animation */}
            <motion.g
              animate={
                locomotion === 'WALK'
                  ? { rotate: [30, 48, 22, 30] }
                  : locomotion === 'FLY'
                  ? { rotate: 42 }
                  : {}
              }
              transition={{
                duration: 0.52,
                repeat: locomotion === 'WALK' ? Infinity : 0,
                ease: 'easeInOut'
              }}
              style={{ transformOrigin: '32px 89px' }}
            >
              <ellipse cx="32" cy="89" rx="8" ry="5.5" transform="rotate(35 32 89)" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
              <ellipse cx="30" cy="87" rx="4" ry="2" transform="rotate(35 30 87)" fill="#FFFFFF" fillOpacity="0.6" />
            </motion.g>

            {/* Right Arm: Enthusiastic Friendly Wave when Hovered / Sleek Arm when Flying */}
            {isHovered ? (
              <motion.g
                id="waving-arm-group"
                animate={{
                  rotate: [-16, 22, -16, 22, -16]
                }}
                transition={{
                  duration: 0.55,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{ transformOrigin: '82px 78px' }}
              >
                {/* Raised Bicep / Shoulder Joint */}
                <ellipse cx="85" cy="76" rx="7.5" ry="5.2" transform="rotate(-38 85 76)" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
                {/* Waving Forearm & Hand Pod */}
                <ellipse cx="94" cy="65" rx="7" ry="5.6" transform="rotate(22 94 65)" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
                <ellipse cx="93" cy="63.5" rx="3.8" ry="2.2" transform="rotate(22 93 63.5)" fill="#FFFFFF" fillOpacity="0.75" />
                {/* Cute Glowing Pink Hand Sensor / Energy Palm */}
                <circle cx="95.5" cy="64" r="1.8" fill="#FF1493" filter="url(#neon-pink-eye-filter)" />
                <circle cx="95.5" cy="64" r="0.9" fill="#FFFFFF" />
              </motion.g>
            ) : (
              <motion.g
                animate={
                  locomotion === 'WALK'
                    ? { rotate: [-30, -22, -48, -30] }
                    : locomotion === 'FLY'
                    ? { rotate: -42 }
                    : {}
                }
                transition={{
                  duration: 0.52,
                  repeat: locomotion === 'WALK' ? Infinity : 0,
                  ease: 'easeInOut'
                }}
                style={{ transformOrigin: '88px 89px' }}
              >
                <ellipse cx="88" cy="89" rx="8" ry="5.5" transform="rotate(-35 88 89)" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
                <ellipse cx="86" cy="87" rx="4" ry="2" transform="rotate(-35 86 87)" fill="#FFFFFF" fillOpacity="0.6" />
              </motion.g>
            )}

            {/* Neck Joint Ring */}
            <ellipse cx="60" cy="73.5" rx="15" ry="3.5" fill="url(#metal-dark)" stroke="#171220" strokeWidth="0.8" />
          </g>

          {/* ============================================================== */}
          {/* ROBOT HEAD (Smooth Glossy 3D Ceramic Helmet)                   */}
          {/* ============================================================== */}
          <g id="mascot-head">
            {/* Top Left Antenna Rod & Glowing Pink Ball */}
            <g>
              <line x1="42" y1="21" x2="35" y2="10" stroke="#7E7591" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="35" cy="10" r="2.8" fill="#FF1493" filter="url(#neon-pink-eye-filter)" />
              <circle cx="35" cy="10" r="1.4" fill="#FFFFFF" />
            </g>

            {/* Top Right Antenna Rod & Glowing Pink Ball */}
            <g>
              <line x1="78" y1="21" x2="85" y2="10" stroke="#7E7591" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="85" cy="10" r="2.8" fill="#FF1493" filter="url(#neon-pink-eye-filter)" />
              <circle cx="85" cy="10" r="1.4" fill="#FFFFFF" />
            </g>

            {/* Head Spherical Base */}
            <ellipse
              cx="60"
              cy="45"
              rx="37"
              ry="34"
              fill="url(#ceramic-head)"
              stroke="#B3A9C8"
              strokeWidth="0.8"
            />

            {/* Specular White Highlight on Forehead */}
            <ellipse
              cx="45"
              cy="25"
              rx="16"
              ry="7"
              transform="rotate(-20 45 25)"
              fill="#FFFFFF"
              fillOpacity="0.65"
            />

            {/* Left Ear Joint Socket */}
            <g>
              <ellipse cx="23" cy="46" rx="3.5" ry="8" fill="#2A2436" stroke="#B3A9C8" strokeWidth="0.8" />
              <circle cx="23" cy="46" r="1.5" fill="#FF1493" />
            </g>

            {/* Right Ear Joint Socket */}
            <g>
              <ellipse cx="97" cy="46" rx="3.5" ry="8" fill="#2A2436" stroke="#B3A9C8" strokeWidth="0.8" />
              <circle cx="97" cy="46" r="1.5" fill="#FF1493" />
            </g>

            {/* ========================================================== */}
            {/* GLOSSY BLACK VISOR (Obsidian Glass)                       */}
            {/* ========================================================== */}
            <ellipse
              cx="60"
              cy="47"
              rx="27.5"
              ry="20"
              fill="url(#visor-glass)"
              stroke="#2A2536"
              strokeWidth="1.2"
            />

            {/* Chrome Rim around Visor */}
            <ellipse
              cx="60"
              cy="47"
              rx="27.5"
              ry="20"
              stroke="#B8B0CC"
              strokeWidth="0.6"
              fill="none"
              opacity="0.8"
            />

            {/* Top Curved Specular Glass Reflection on Visor */}
            <path
              d="M 40 37 Q 60 32 78 37 Q 60 41 40 37 Z"
              fill="#FFFFFF"
              fillOpacity="0.22"
            />

            {/* ========================================================== */}
            {/* GLOWING NEON-PINK EYES (Emotional & Interactive)          */}
            {/* ========================================================== */}
            <g id="mascot-eyes" transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
              {/* NORMAL / CURIOUS / TALKING CIRCULAR EYES */}
              {(eyeState.type === 'normal' || eyeState.type === 'wide' || eyeState.type === 'talking') && (
                <>
                  {/* Left Eye */}
                  <g filter="url(#neon-pink-eye-filter)">
                    <ellipse
                      cx="47"
                      cy="48"
                      rx={6.8 * eyeState.scale}
                      ry={6.8 * eyeState.scale}
                      fill={eyeState.color}
                      opacity={eyeState.glow}
                    />
                    <circle cx="47" cy="48" r="3.2" fill="#FFFFFF" />
                  </g>

                  {/* Right Eye */}
                  <g filter="url(#neon-pink-eye-filter)">
                    <ellipse
                      cx="73"
                      cy="48"
                      rx={6.8 * eyeState.scale}
                      ry={6.8 * eyeState.scale}
                      fill={eyeState.color}
                      opacity={eyeState.glow}
                    />
                    <circle cx="73" cy="48" r="3.2" fill="#FFFFFF" />
                  </g>
                </>
              )}

              {/* HAPPY / EXCITED CURVED ARC EYES (Like ^ ^) */}
              {eyeState.type === 'arc' && (
                <>
                  {/* Left Happy Eye Arc */}
                  <path
                    d="M 40 50 Q 47 41 54 50"
                    stroke="#FF1493"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#neon-pink-eye-filter)"
                  />
                  <path
                    d="M 40 50 Q 47 41 54 50"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Right Happy Eye Arc */}
                  <path
                    d="M 66 50 Q 73 41 80 50"
                    stroke="#FF1493"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#neon-pink-eye-filter)"
                  />
                  <path
                    d="M 66 50 Q 73 41 80 50"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </>
              )}

              {/* BLINKING EYES (Thin Horizontal Slits) */}
              {eyeState.type === 'blink' && (
                <>
                  <line x1="41" y1="48" x2="53" y2="48" stroke="#FF1493" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="67" y1="48" x2="79" y2="48" stroke="#FF1493" strokeWidth="2.2" strokeLinecap="round" />
                </>
              )}

              {/* SLEEPING EYES (Gentle Curved Resting Lines) */}
              {eyeState.type === 'closed' && (
                <>
                  <path d="M 41 49 Q 47 52 53 49" stroke="#FF1493" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.6" />
                  <path d="M 67 49 Q 73 52 79 49" stroke="#FF1493" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.6" />
                </>
              )}

              {/* THINKING EYES (Pulsing Orbit Indicator) */}
              {eyeState.type === 'thinking' && (
                <>
                  <g filter="url(#neon-pink-eye-filter)">
                    <circle cx="47" cy="48" r="5" fill="#FF1493" className="animate-pulse" />
                    <circle cx="47" cy="48" r="2.2" fill="#FFFFFF" />
                  </g>
                  <g filter="url(#neon-pink-eye-filter)">
                    <circle cx="73" cy="48" r="5" fill="#FF1493" className="animate-pulse" />
                    <circle cx="73" cy="48" r="2.2" fill="#FFFFFF" />
                  </g>
                </>
              )}

              {/* CUTE GLOWING NEON-PINK SMILE (Appears when mouse points at mascot or happy) */}
              {(isHovered || emotion === 'HAPPY' || emotion === 'EXCITED') && (
                <motion.g
                  id="mascot-smile"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Glowing Outer Pink Smile Arc */}
                  <path
                    d="M 53 58 Q 60 64.5 67 58"
                    stroke="#FF1493"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#neon-pink-eye-filter)"
                  />
                  {/* Inner Pure White Core */}
                  <path
                    d="M 53 58 Q 60 64.5 67 58"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Cute subtle pink blush dots on cheeks */}
                  <circle cx="41" cy="55" r="3" fill="#FF1493" opacity="0.35" filter="url(#neon-pink-eye-filter)" />
                  <circle cx="79" cy="55" r="3" fill="#FF1493" opacity="0.35" filter="url(#neon-pink-eye-filter)" />
                </motion.g>
              )}
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
