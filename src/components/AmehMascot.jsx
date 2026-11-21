import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AmehMascot - High-performance living 3D glossy animated mascot for AMEH AI
 * 
 * Features:
 * - Pure 3D ceramic aesthetic with vector lighting, obsidian visor, and glowing neon-pink eyes
 * - Lightweight, lag-free floating animation (no expensive filter chains or heavy loops)
 * - Waving arm greeting and cute smile when cursor hovers
 * - Left-side glassmorphism greeting tooltip ("Hey! I'm AMEH AI 👋")
 * - Smooth throttled eye-tracking following visitor's cursor across viewport
 * - Emotional states: IDLE, CURIOUS, HAPPY, EXCITED, THINKING, LISTENING, TALKING, SLEEP
 */
export default function AmehMascot({
  size = 100,
  emotion = 'IDLE', // 'IDLE' | 'CURIOUS' | 'HAPPY' | 'EXCITED' | 'THINKING' | 'LISTENING' | 'TALKING' | 'SLEEP'
  onClick,
  isFloating = true,
  className = ""
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, eyeX: 0, eyeY: 0, tiltZ: 0 });
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

  // Mouth/eye modulation when TALKING
  useEffect(() => {
    if (emotion !== 'TALKING') return;
    const interval = setInterval(() => {
      setTalkTick((prev) => (prev + 1) % 4);
    }, 120);
    return () => clearInterval(interval);
  }, [emotion]);

  // Smooth, throttled cursor tracking for eye movement and head tilt
  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e) => {
      if (ticking || !mascotRef.current) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (!mascotRef.current) {
          ticking = false;
          return;
        }
        const rect = mascotRef.current.getBoundingClientRect();
        const mascotCenterX = rect.left + rect.width / 2;
        const mascotCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - mascotCenterX;
        const deltaY = e.clientY - mascotCenterY;
        const distance = Math.hypot(deltaX, deltaY);

        // Normalize look direction within max 5px radius for eyes
        const maxEyeOffset = 5;
        const factor = Math.min(distance / 450, 1);
        const angle = Math.atan2(deltaY, deltaX);

        setMousePos({
          eyeX: Math.cos(angle) * maxEyeOffset * factor,
          eyeY: Math.sin(angle) * maxEyeOffset * factor,
          tiltZ: Math.max(Math.min((deltaX / window.innerWidth) * 8, 7), -7),
          distance
        });

        ticking = false;
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
      style={{ width: size, height: size * 1.08 }}
    >
      {/* Interactive Tooltip Bubble on Hover (Appears on the LEFT side) */}
      <AnimatePresence>
        {isHovered && isFloating && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.9 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-[102%] top-1/2 -translate-y-1/2 mr-3 px-3.5 py-1.5 rounded-2xl bg-[#0E0C14]/95 border border-[#FF1493]/75 shadow-[0_0_20px_rgba(255,20,147,0.45)] whitespace-nowrap z-30 pointer-events-none"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-xs font-mono font-semibold text-white tracking-wide">
                Hey! I'm AMEH AI 👋
              </span>
            </div>
            {/* Speech pointer notch pointing RIGHT towards the mascot */}
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#0E0C14] border-t border-r border-[#FF1493]/75 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mascot Canvas */}
      <motion.div
        animate={
          isFloating
            ? isHovered
              ? {
                  y: [-4, 2, -4],
                  rotate: [mousePos.tiltZ || 0, (mousePos.tiltZ || 0) + 2, mousePos.tiltZ || 0],
                  scale: [1, 1.03, 1]
                }
              : emotion === 'EXCITED'
              ? { y: [-10, 0, -10], rotate: [-3, 3, -3], scale: [1, 1.05, 1] }
              : emotion === 'THINKING'
              ? { y: [-3, 3, -3], rotate: [-2, 2, -2] }
              : emotion === 'SLEEP'
              ? { y: [0, 3, 0], rotate: [1, 1, 1] }
              : { y: [-6, 6, -6], rotate: [mousePos.tiltZ || 0, (mousePos.tiltZ || 0) + 1.5, mousePos.tiltZ || 0] }
            : {}
        }
        transition={{
          duration: isHovered ? 0.9 : emotion === 'EXCITED' ? 1.2 : emotion === 'SLEEP' ? 6 : 3.8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="w-full h-full relative"
      >
        <svg
          viewBox="0 0 120 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
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

            {/* Lightweight High-Performance Neon Pink Filter */}
            <filter id="neon-pink-eye-filter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* HOVER GLOW / SHADOW UNDERNEATH MASCOT                         */}
          {/* ============================================================== */}
          <ellipse
            cx="60"
            cy="123"
            rx="22"
            ry="4"
            fill="#FF1493"
            fillOpacity="0.32"
          />
          <ellipse
            cx="60"
            cy="123"
            rx="15"
            ry="2.8"
            fill="#000000"
            fillOpacity="0.45"
          />

          {/* ============================================================== */}
          {/* TORSO & ARMS & FEET (Pure 3D Mascot Character)                */}
          {/* ============================================================== */}
          <g id="mascot-lower-body">
            {/* Left Foot / Base Pod */}
            <ellipse cx="44" cy="114" rx="9" ry="7" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
            <ellipse cx="43" cy="112" rx="5" ry="3" fill="#FFFFFF" fillOpacity="0.6" />

            {/* Right Foot / Base Pod */}
            <ellipse cx="76" cy="114" rx="9" ry="7" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
            <ellipse cx="75" cy="112" rx="5" ry="3" fill="#FFFFFF" fillOpacity="0.6" />

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

            {/* Lower Abdomen Vents */}
            <g opacity="0.65">
              <rect x="55.5" y="103" width="1.2" height="5" rx="0.6" fill="#4B4459" />
              <rect x="58.5" y="103" width="1.2" height="5" rx="0.6" fill="#4B4459" />
              <rect x="61.5" y="103" width="1.2" height="5" rx="0.6" fill="#4B4459" />
              <rect x="64.5" y="103" width="1.2" height="5" rx="0.6" fill="#4B4459" />
            </g>

            {/* Left Arm Nub */}
            <g>
              <ellipse cx="32" cy="89" rx="8" ry="5.5" transform="rotate(35 32 89)" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
              <ellipse cx="30" cy="87" rx="4" ry="2" transform="rotate(35 30 87)" fill="#FFFFFF" fillOpacity="0.6" />
            </g>

            {/* Right Arm: Enthusiastic Friendly Wave when Hovered / Clean Arm */}
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
              <g>
                <ellipse cx="88" cy="89" rx="8" ry="5.5" transform="rotate(-35 88 89)" fill="url(#ceramic-body)" stroke="#B6ADCA" strokeWidth="0.8" />
                <ellipse cx="86" cy="87" rx="4" ry="2" transform="rotate(-35 86 87)" fill="#FFFFFF" fillOpacity="0.6" />
              </g>
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

              {/* HAPPY / EXCITED / HOVER CURVED ARC EYES (Like ^ ^) */}
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
                  transition={{ duration: 0.18 }}
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
