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
        olive: {
          50: '#f6f7f4',
          100: '#e9ece3',
          200: '#d5dbc9',
          300: '#b8c3a8',
          400: '#9aa986',
          500: '#7f906b',
          600: '#647453',
          700: '#4f5c42',
          800: '#384230',
          900: '#232b1f',
          950: '#151b12',
        },
        champagne: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#eadecf',
          300: '#dec7af',
          400: '#ceaa8a',
          500: '#c0926d',
          600: '#b37f5b',
          700: '#95654a',
          800: '#7a523f',
          900: '#644436',
        },
        gold: {
          100: '#fef9e7',
          200: '#fcf0c4',
          300: '#f8e294',
          400: '#f3ce5b',
          500: '#d4af37',
          600: '#aa8221',
          700: '#846019',
          800: '#6d4e1a',
          900: '#5c411a',
        },
        warmIvory: '#FDFBF7',
        sandBeige: '#F5EFEB',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        script: ['var(--font-alex-brush)', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
