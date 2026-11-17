/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#0B0B0B',
          card: '#111111',
          cardHover: '#161616',
          glass: 'rgba(17, 17, 17, 0.8)',
        },
        accent: {
          DEFAULT: '#FF1493',
          pink: '#FF1493',
          pinkLight: '#FF4FBF',
          pinkNeon: '#FF69B4',
          // keep aliases pointing to hot pink so any lingering classes automatically turn pink
          blue: '#FF1493',
          violet: '#FF4FBF',
        },
        content: {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
          muted: '#737373',
        },
        border: {
          subtle: 'rgba(255, 20, 147, 0.20)',
          pink: 'rgba(255, 20, 147, 0.35)',
          glow: 'rgba(255, 20, 147, 0.6)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'pink-radial': 'radial-gradient(circle at 50% 50%, rgba(255, 20, 147, 0.18), transparent 70%)',
        'pink-glow': 'radial-gradient(circle at 50% 30%, rgba(255, 20, 147, 0.22), rgba(255, 79, 191, 0.08) 50%, transparent 80%)',
        'pink-gradient': 'linear-gradient(135deg, #FF1493 0%, #FF4FBF 100%)',
      },
      boxShadow: {
        'glow-pink': '0 0 35px -5px rgba(255, 20, 147, 0.5)',
        'glow-pink-sm': '0 0 15px -3px rgba(255, 20, 147, 0.4)',
        'glow-blue': '0 0 35px -5px rgba(255, 20, 147, 0.5)',
        'glow-violet': '0 0 35px -5px rgba(255, 79, 191, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}
