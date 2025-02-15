import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // NOTE @/constants/themeConst 와 동일하게 설정
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: '#F58D3A',
          100: '#F58D3A',
          200: '#F58D3A',
          300: '#F58D3A',
          400: '#F58D3A',
          500: '#F58D3A',
          600: '#F58D3A',
          700: '#F58D3A',
          800: '#F58D3A',
          900: '#F58D3A',
          950: '#F58D3A',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#e6e6e7',
          200: '#d5d5d6',
          300: '#c1c1c3',
          400: '#b0b0b2',
          500: '#908f92',
          600: '#6b6a6e',
          700: '#46454a',
          800: '#39393d',
          900: '#212025',
          950: '#08070d',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
