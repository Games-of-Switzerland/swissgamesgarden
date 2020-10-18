import React from 'react';
import Footer from './Footer';

// This default export determines where you story goes in the story list
export default {
  title: 'Footer',
  component: Footer,
};

const Template = args => (
  <div className="max-w-screen-xl mx-auto">
    <Footer {...args} />
  </div>
);

export const Story = Template.bind({});
