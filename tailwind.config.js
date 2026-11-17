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
        'background-secondary': '#0A0A0A',
        surface: {
          DEFAULT: '#111111',
          card: '#111111',
          hover: '#161616',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#999999',
          muted: '#666666',
        },
        accent: {
          DEFAULT: '#FF1493',
          pink: '#FF1493',
          softPink: '#FF69B4',
          // backward compat aliases
          blue: '#FF1493',
          violet: '#FF69B4',
        },
        content: {
          primary: '#F5F5F5',
          secondary: '#999999',
          muted: '#666666',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          subtle: 'rgba(255, 255, 255, 0.12)',
          pink: 'rgba(255, 20, 147, 0.40)',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'pink-accent': '0 0 20px -3px rgba(255, 20, 147, 0.3)',
      },
    },
  },
  plugins: [],
}
