import React from 'react';
import Home from '../index';
import {render} from '@testing-library/react';

test('renders app', () => {
  const {getByText} = render(<Home />);
  expect(getByText(/Swiss Games Garden/)).toBeInTheDocument();
  expect(getByText(/About/)).toBeInTheDocument();
  expect(getByText(/Contact/)).toBeInTheDocument();
  expect(getByText(/Add a game/)).toBeInTheDocument();
});
