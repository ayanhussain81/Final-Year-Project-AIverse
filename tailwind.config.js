/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'mobile-sm': '320px',
      'mobile-md': '375px',
      'mobile-lg': '425px',
      tablet: '768px',
      laptop: '1024px',
      'laptop-lg': '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
      },
      screens: {
        'laptop-lg': '1360px',
      },
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      primary: 'rgb(34 126 161)',
      accent: {
        300: '#14C8B0',
        400: '#00AC4F',
        900: '#FF002E',
      },
      primary: {
        100: '#64bdde',
        200: '#4fb4da',
        300: '#3aabd5',
        400: '#2b9fcb',
        500: '#227ea1',
        DEFAULT: 'rgb(34 126 161)',
        500: 'rgb(34 126 161)',
        600: '#195d77',
        700: '#195d77',
        800: '#103c4d',
        900: '#071b23',
      },
      neutral: {
        100: '#FFFFFF',
        200: '#f7f9fb',
        300: '#f2f3f5',
        400: '#EFEFEF',
        500: '#A4A4A4',
        600: '#636363',
        900: '#000000',
      },
    },
    fontSize: {
      200: '0.6875rem',
      300: '0.75rem',
      400: '0.875rem',
      500: '1rem',
      600: '1.25rem',
      700: '1.5rem',
      800: '2rem',
      900: '2.5rem',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
    },
  },
  plugins: [],
};
