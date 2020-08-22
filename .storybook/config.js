import {configure, addParameters} from '@storybook/react';
import theme from './theme';

// import env from '../env';
// import {setConfig} from 'next/config';
// setConfig(env);

addParameters({
  options: {
    theme,
  },
  backgrounds: [{name: 'blue', value: '#0C2340'}],
});

// automatically import all files ending in *.stories.js
configure(require.context('../src/components', true, /\.stories\.js$/), module);
