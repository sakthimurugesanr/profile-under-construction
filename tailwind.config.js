/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050506', // page floor
          900: '#0a0a0c', // section base
          800: '#111114', // alternate section
          700: '#17171b', // panel fill
          600: '#22222a', // raised fill
        },
        chalk: {
          DEFAULT: '#f5f5f6',
          muted: '#a6a6ad',
          faint: '#6e6e76',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.10)',
          strong: 'rgba(255,255,255,0.28)',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        mega: ['clamp(1.75rem, 9vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        huge: ['clamp(2rem, 6vw, 4rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        shell: '82rem',
        prose: '62ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
