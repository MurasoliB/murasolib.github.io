import React from 'react';

/**
 * RobotAvatar - Precision SVG rendering of the futuristic metallic robot assistant
 * with glowing neon-pink visor eyes, pink headset ear-cups, and antenna.
 */
export default function RobotAvatar({ size = 36, className = "" }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(255,20,147,0.45)]"
      >
        <defs>
          {/* Head & Body Gradients */}
          <linearGradient id="robot-metal" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3A3845" />
            <stop offset="50%" stopColor="#1E1C24" />
            <stop offset="100%" stopColor="#0F0D14" />
          </linearGradient>

          <linearGradient id="robot-visor" x1="25" y1="35" x2="75" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B0910" />
            <stop offset="100%" stopColor="#17121F" />
          </linearGradient>

          <linearGradient id="pink-glow-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF69B4" />
            <stop offset="100%" stopColor="#FF1493" />
          </linearGradient>

          {/* Glowing Pink Filter */}
          <filter id="neon-pink-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Headset Arc / Headband */}
        <path
          d="M 22 46 C 22 22, 78 22, 78 46"
          stroke="#4A4756"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 22 46 C 22 22, 78 22, 78 46"
          stroke="#FF1493"
          strokeWidth="2"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />

        {/* Top Antenna Node */}
        <circle cx="50" cy="18" r="4.5" fill="#FF1493" filter="url(#neon-pink-filter)" />
        <circle cx="50" cy="18" r="2.5" fill="#FFFFFF" />

        {/* Robot Head Body */}
        <rect
          x="22"
          y="28"
          width="56"
          height="48"
          rx="22"
          fill="url(#robot-metal)"
          stroke="#4D495C"
          strokeWidth="1.5"
        />

        {/* Head Surface Highlight */}
        <ellipse cx="50" cy="33" rx="18" ry="4" fill="#FFFFFF" fillOpacity="0.12" />

        {/* Left Ear Cup */}
        <g>
          <rect x="14" y="40" width="10" height="24" rx="5" fill="#201E28" stroke="#FF1493" strokeWidth="1.5" />
          <circle cx="19" cy="52" r="3" fill="#FF1493" filter="url(#neon-pink-filter)" />
          <circle cx="19" cy="52" r="1.5" fill="#FFFFFF" />
        </g>

        {/* Right Ear Cup */}
        <g>
          <rect x="76" y="40" width="10" height="24" rx="5" fill="#201E28" stroke="#FF1493" strokeWidth="1.5" />
          <circle cx="81" cy="52" r="3" fill="#FF1493" filter="url(#neon-pink-filter)" />
          <circle cx="81" cy="52" r="1.5" fill="#FFFFFF" />
        </g>

        {/* Visor Area */}
        <rect
          x="28"
          y="38"
          width="44"
          height="28"
          rx="12"
          fill="url(#robot-visor)"
          stroke="#2A2636"
          strokeWidth="1"
        />

        {/* Neon Pink Glowing Eyes (Capsule/Pill Shape) */}
        <g filter="url(#neon-pink-filter)">
          {/* Left Eye */}
          <rect
            x="35"
            y="48"
            width="10"
            height="7"
            rx="3.5"
            fill="#FF1493"
            className="animate-pulse"
          />
          <circle cx="39" cy="51" r="1.5" fill="#FFFFFF" />

          {/* Right Eye */}
          <rect
            x="55"
            y="48"
            width="10"
            height="7"
            rx="3.5"
            fill="#FF1493"
            className="animate-pulse"
          />
          <circle cx="59" cy="51" r="1.5" fill="#FFFFFF" />
        </g>

        {/* Subtle Chin Accent / Mouth Sensor Line */}
        <rect x="44" y="69" width="12" height="2" rx="1" fill="#FF1493" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

