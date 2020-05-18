import React from 'react';
import {render} from '@testing-library/react';
import Header from '../Header';

test('renders header correctly', () => {
  const {getByText} = render(<Header />);
  expect(getByText(/Swiss Games Garden/)).toBeInTheDocument();
});
