import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';

// Mock NextJS Router
import Router from './mockNextRouter';

import gosTheme from './gos-theme';
import { withA11y } from '@storybook/addon-a11y';

import '../src/styles/base.scss';


addParameters({
  options: {
    theme: gosTheme,
  },
});

addDecorator(withA11y);

configure(require.context('../src', true, /\.stories\.js$/), module);

