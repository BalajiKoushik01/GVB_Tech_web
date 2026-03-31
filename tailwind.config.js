/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gvb-blue': '#00A3FF',
        'gvb-deep': '#0066FF',
        'gvb-cyan': '#00D1FF',
        'launch-yellow': '#FDE047',
        'launch-orange': '#F97316',
        'launch-red': '#EF4444',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rocket-shake': 'rocket-shake 0.1s ease-in-out infinite',
        'flame-pulse': 'flame-pulse 0.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: translateY('0px') },
          '50%': { transform: translateY('-20px') },
        },
        'rocket-shake': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(1px, 1px)' },
          '50%': { transform: 'translate(-1px, 0px)' },
          '75%': { transform: 'translate(0px, -1px)' },
        },
        'flame-pulse': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
