import Tippy from '@tippyjs/react';
import React from 'react';
import 'tippy.js/animations/shift-away-subtle.css';
import PropTypes from 'prop-types';

const Tooltip = ({children, ...rest}) => (
  <Tippy animation="shift-away-subtle" {...rest}>
    {children}
  </Tippy>
);

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
};

export default Tooltip;
