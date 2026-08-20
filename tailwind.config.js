/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        blood: 'rgb(var(--blood) / <alpha-value>)',
        ember: 'rgb(var(--ember) / <alpha-value>)',
        twilight: 'rgb(var(--twilight) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
      },
      borderRadius: {
        pill: '999px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Cinzel', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'float': 'floatY 4s ease-in-out infinite',
        'glow': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(178, 34, 52, 0)' },
          '50%': { boxShadow: '0 0 28px 6px rgba(178, 34, 52, 0.35)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
