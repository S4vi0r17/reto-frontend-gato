/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: '#E4E0DB',
        input: '#E4E0DB',
        ring: '#2A211B',
        background: '#FAF5E8',
        foreground: '#2A211B',
        primary: {
          DEFAULT: '#2A211B',
          foreground: '#FDFCF9',
        },
        secondary: {
          DEFAULT: '#F5F5F3',
          foreground: '#3B322D',
        },
        destructive: {
          DEFAULT: '#D32F2F',
          foreground: '#FDFCF9',
        },
        muted: {
          DEFAULT: '#F5F5F3',
          foreground: '#746F6A',
        },
        accent: {
          DEFAULT: '#E4572E',
          foreground: '#FDFCF9',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [],
};
