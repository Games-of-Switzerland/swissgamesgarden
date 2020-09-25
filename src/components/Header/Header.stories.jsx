import React from 'react';
import Header from './Header';

// This default export determines where you story goes in the story list
export default {
  title: 'Header',
  component: Header,
};

const Template = args => (
  <div className="max-w-screen-xl mx-auto">
    <Header {...args} />
  </div>
);

export const Story = Template.bind({});
