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
  safelist: ['max-w-md'],
  plugins: [
    // @ts-expect-error addUtilities 타입 지정 에러
    ({ addUtilities }) => {
      addUtilities({
        '.text-display1': {
          '@apply font-bold text-[40px]': '',
        },
        '.text-display2': {
          '@apply font-bold text-[36px]': '',
        },
        '.text-display3': {
          '@apply font-bold text-[32px]': '',
        },
        '.text-display4': {
          '@apply font-bold text-[28px]': '',
        },
        '.text-display5': {
          '@apply font-bold text-[24px]': '',
        },
        '.text-headline': {
          '@apply font-bold text-[20px]': '',
        },
        '.text-subhead1': {
          '@apply font-bold text-[16px]': '',
        },
        '.text-subhead2': {
          '@apply font-bold text-[14px]': '',
        },
        '.text-subhead3': {
          '@apply font-bold text-[12px]': '',
        },
        '.text-body1': {
          '@apply font-normal text-[20px]': '',
        },
        '.text-body2': {
          '@apply font-normal text-[16px]': '',
        },
        '.text-body3': {
          '@apply font-normal text-[14px]': '',
        },
        '.text-caption1': {
          '@apply font-normal text-[12px]': '',
        },
        '.text-caption2': {
          '@apply font-normal text-[10px]': '',
        },
      });
    },
  ],
} satisfies Config;
