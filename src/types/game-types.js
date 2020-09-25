import PropTypes from 'prop-types';

export const ReleasePropType = PropTypes.shape({
  platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
});

export const GamePropType = {};
