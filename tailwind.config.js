/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'js/main.js'],
  theme: {
    extend: {},

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
      4: '0.4rem',
      5: '0.5rem',
    },

    fontFamily: {
      sans: ['"Kumbh Sans"', 'ui-sans-serif', 'system-ui'],
    },

    colors: {
      orange: 'hsl(var(--orange))',
      'pale-orange': 'hsl(var(--pale-orange))',
      'very-dark-blue': 'hsl(var(--very-dark-blue))',
      'dark-grayish-blue': 'hsl(var(--dark-grayish-blue))',
      'grayish-blue': 'hsl(var(--grayish-blue))',
      'light-grayish-blue': 'hsl(var(--light-grayish-blue))',
      white: 'hsl(var(--white))',
      'black-bg': 'hsl(var(--black-bg) / 0.75)',
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
