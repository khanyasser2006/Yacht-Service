/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#120d3f',
          900: '#1b1456',
          800: '#271E79', // Core Deep Indigo
          700: '#382db0',
          600: '#4c3fd6',
          500: '#6c60e8',
          400: '#9187f2',
          300: '#ada5f6',
          200: '#c8c3fa',
          100: '#ebe9fe',
        },
        frost: {
          50: '#ffffff',
          100: '#F7F7FF', // Core Frost White
          200: '#eeeffc',
          300: '#dde0f7',
          400: '#bfc4ee',
          500: '#9ca3dc',
          600: '#757ebf',
        }
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(76, 63, 214, 0.25)',
        'glow-lg': '0 0 35px rgba(76, 63, 214, 0.35)',
        'frost-card': '0 20px 40px -15px rgba(18, 13, 63, 0.6)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        wave: 'wave 15s linear infinite',
      }
    },
  },
  plugins: [],
}
