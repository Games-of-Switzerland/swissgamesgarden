import React from 'react';
import {render} from '@testing-library/react';
import Layout from '../Layout/Layout';

test('renders the layout container', () => {
  const {getByText} = render(<Layout>test value</Layout>);
  expect(getByText(/Swiss Games Garden/)).toBeInTheDocument();
  expect(getByText(/test value/)).toBeInTheDocument();
});
