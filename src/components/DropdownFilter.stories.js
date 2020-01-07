import React from 'react';
import DropdownFilter from "./DropdownFilter";

export default {
  title: 'Dropdown',
  component: DropdownFilter,
  decorators: [storyFn => <div style={{ maxWidth: 391 }}>{storyFn()}</div>],
  excludeStories: /.*Data$/,
};

export const dropdownData = {
  title: 'Genre',
  options: [
    {
      value: 'rpg',
      name: 'Role Playing Game (RPG)',
    }
  ],
};

export const DropdownStandard = () => <DropdownFilter {...dropdownData} />;
