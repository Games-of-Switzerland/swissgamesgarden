const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = {
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      whitelist: ['text-red-500', 'text-green-500', 'text-purple-500'],
    },
  },
  theme: {
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      md: '.9375rem',
      base: '1rem',
      lg: '1.1875rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.375rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
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
      spacing: {
        1: '0.3125rem',
        4: '0.9375rem',
        8: '1.875rem',
        14: '3.6rem',
      },
      screens: {
        xs: '480px',
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
          950: '#1d1d1d',
          1000: '#121212',
          1100: '#111',
        },
        pink: {
          50: '#fef2f7',
          100: '#fde6ef',
          200: '#fbc0d6',
          300: '#f999bd',
          400: '#f44d8c',
          500: '#ef015b',
          600: '#d70152',
          700: '#8f0137',
          800: '#6c0029',
          900: '#48001b',
        },
        orange: {
          50: '#fffaf4',
          100: '#fff5ea',
          200: '#ffe7ca',
          300: '#ffd9a9',
          400: '#ffbc69',
          500: '#ff9f29',
          600: '#e68f25',
          700: '#995f19',
          800: '#734812',
          900: '#4d300c',
        },
        purple: {
          50: '#F9F6FD',
          100: '#F3EDFC',
          200: '#E0D2F7',
          300: '#CEB7F3',
          400: '#A980E9',
          500: '#844AE0',
          600: '#7743CA',
          700: '#4F2C86',
          800: '#3B2165',
          900: '#281643',
        },
        green: {
          50: '#F4FDF8',
          100: '#E8FBF0',
          200: '#C6F4DA',
          300: '#A4EDC3',
          400: '#5FE097',
          500: '#1BD26A',
          600: '#18BD5F',
          700: '#107E40',
          800: '#0C5F30',
          900: '#083F20',
        },
        red: {
          50: '#FEF7F5',
          100: '#FDEEEA',
          200: '#FBD5CB',
          300: '#F9BBAC',
          400: '#F4886E',
          500: '#EF5530',
          600: '#D74D2B',
          700: '#8F331D',
          800: '#6C2616',
          900: '#481A0E',
        },
      },
      minWidth: {
        20: '20rem',
      },
      minHeight: {
        20: '10.5rem',
      },
      maxWidth: {
        'truncated-link': 'calc(100% - 3ch)',
      },
      gridTemplateColumns: {
        games: 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      transitionProperty: {
        spacing: 'margin, padding',
        background: 'background',
      },
    },
  },
  variants: {
    padding: ['focus'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    ({addUtilities, theme, variants}) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      const colorMap = Object.keys(colors).map(color => ({
        [`.border-t-${color}`]: {borderTopColor: colors[color]},
        [`.border-r-${color}`]: {borderRightColor: colors[color]},
        [`.border-b-${color}`]: {borderBottomColor: colors[color]},
        [`.border-l-${color}`]: {borderLeftColor: colors[color]},
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
  ],
};
