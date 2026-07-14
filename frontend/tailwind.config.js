// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from DryvSquad logos
        brand: {
          navy: '#0B1C2C',
          gold: '#C69327',
          goldLight: '#D4AF37',
          goldDark: '#A87B1F',
          black: '#000000',
          white: '#FFFFFF',
        },
        brandYellow: '#C69327',
        // Remap default yellow scale → mustard gold so existing yellow-* classes match brand
        yellow: {
          50: '#FBF7EA',
          100: '#F5ECC8',
          200: '#ECD58A',
          300: '#E0BE55',
          400: '#D4AF37',
          500: '#C69327',
          600: '#A87B1F',
          700: '#876318',
          800: '#664B12',
          900: '#45320C',
          950: '#2A1E07',
        },
        // Near-black dark theme (logo on black)
        dark: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#181818',
          900: '#0a0a0a',
          950: '#000000',
        },
        // Remap default Tailwind `blue` palette to near-black shades
        blue: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#181818',
          900: '#0a0a0a',
          950: '#000000',
        },
        light: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f4f4f5',
          300: '#e4e4e7',
          400: '#d4d4d8',
          500: '#a1a1aa',
        }
      },
      backgroundColor: {
        'theme': {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        }
      },
      textColor: {
        'theme': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        }
      },
      borderColor: {
        'theme': {
          primary: 'var(--border-primary)',
        }
      }
    },
  },
  plugins: [],
}
