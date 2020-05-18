import React from 'react';
import SelectFilter from './SelectFilter';

export default {
  title: 'Dropdown',
  component: SelectFilter,
  decorators: [storyFn => <div style={{maxWidth: 391}}>{storyFn()}</div>],
  excludeStories: /.*Data$/,
};

export const dropdownData = {
  title: 'Platform',
  options: [
    {
      value: 'android',
      name: 'Android',
    },
    {
      value: 'ios',
      name: 'iOS',
    },
    {
      value: 'nintendo',
      name: 'Nintendo',
    },
    {
      value: 'pc',
      name: 'PC',
    },
    {
      value: 'ps3',
      name: 'PS3',
    },
  ],
};

export const DropdownStandard = () => <SelectFilter {...dropdownData} />;
