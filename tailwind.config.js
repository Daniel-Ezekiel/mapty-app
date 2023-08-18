/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'js/main.js'],
  theme: {
    extend: {},

    fontSize: {
      sm: '1.2rem',
      base: '1.5rem',
      xl: '1.8rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3rem',
      '5xl': '3.5rem',
    },

    spacing: {
      1: '0.5rem',
      2: '1rem',
      3: '1.5rem',
      4: '2rem',
      5: '2.5rem',
      6: '3rem',
      7: '3.5rem',
      8: '4rem',
      9: '4.5rem',
      10: '5rem',
    },

    borderWidth: {
      DEFAULT: '0.1rem',
      0: '0',
      2: '0.2rem',
      3: '0.3rem',
    },

    fontFamily: {
      sans: ['"Manrope"', 'ui-sans-serif', 'system-ui'],
    },

    colors: {
      orange: '#ffb545',
      green: '#00c46a',
      'dark-1': '#2d3439',
      'dark-2': '#42484d',
      gray: '#aaa',
      'light-gray': '#ececec',
      'lighter-gray': 'rgb(var(--lighter-gray))',
    },

    screens: {
      sm: '640px',
      md: '768px',
      lg: '840px',
      xl: '1280px',
      '2xl': '1440px',
    },
  },
  plugins: [],
};
