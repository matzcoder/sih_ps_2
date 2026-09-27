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
        sig: {
          bg: '#080B12',              // Canvas background - ultra deep charcoal navy
          'bg-deep': '#04060A',       // Deepest contrast backing
          panel: '#0F1523',           // Cards & widget surfaces
          'panel-dark': '#0B0F19',    // Recessed panel backing
          'panel-light': '#161F33',   // Elevated / hover panel
          surface: '#0F1523',
          'surface-elevated': '#161F33',
          'surface-hover': '#1C273F',
          primary: '#FF6B00',         // Bright Orange primary brand
          'primary-hover': '#FF8A00', // Vibrant Orange hover state
          'primary-active': '#E05E00',
          'primary-glow': 'rgba(255, 107, 0, 0.45)',
          secondary: '#FF8A00',       // Vibrant Orange
          accent: '#FFB000',          // Golden Amber
          'accent-glow': 'rgba(255, 176, 0, 0.45)',
          highlight: '#FF4D4D',       // Coral Red highlight
          coral: '#FF5733',
          amber: '#F59E0B',
          warning: '#F59E0B',         // Warning / Anomaly state
          'warning-glow': 'rgba(245, 158, 11, 0.5)',
          danger: '#EF4444',          // Danger / Critical state
          text: '#F8FAFC',            // Crisp off-white text
          muted: '#94A3B8',           // Technical slate text
          dim: '#64748B',             // Dim labels & timestamps
          border: 'rgba(255, 107, 0, 0.18)',
          'border-active': 'rgba(255, 107, 0, 0.75)',
          'border-warning': 'rgba(245, 158, 11, 0.5)',
          'border-subtle': 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 12px -2px rgba(255, 107, 0, 0.35)',
        'glow-md': '0 0 24px -4px rgba(255, 107, 0, 0.45)',
        'glow-lg': '0 0 40px -6px rgba(255, 107, 0, 0.55)',
        'glow-accent': '0 0 20px -2px rgba(255, 176, 0, 0.4)',
        'glow-warning': '0 0 20px -2px rgba(245, 158, 11, 0.4)',
        'card-dark': '0 8px 32px -4px rgba(0, 0, 0, 0.7), 0 2px 8px -2px rgba(255, 107, 0, 0.08)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(rgba(255, 107, 0, 0.12) 1px, transparent 1px)',
        'scanline-pattern': 'linear-gradient(rgba(8, 11, 18, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 107, 0, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'blink': 'blink 1.2s infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(255, 107, 0, 0.6))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 3px rgba(255, 107, 0, 0.2))' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
