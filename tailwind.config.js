const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: [
        '"Natural Without"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1400px',
    },
    extend: {
      padding: {
        ...defaultTheme.padding,
        14: '3.6rem',
      },
      colors: {
        gray: {
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          450: '#adadad',
          500: '#a1a1a1',
          550: '#8e8e8e',
          600: '#848484',
          700: '#6f6f6f',
          800: '#535353',
          850: '#3b3b3b',
          900: '#282828',
        },
      },
      minHeight: {
        20: '10.5rem',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
