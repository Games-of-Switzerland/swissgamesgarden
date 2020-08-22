import PropTypes from 'prop-types';

export const ReleasePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
});

export const GamePropType = {};
