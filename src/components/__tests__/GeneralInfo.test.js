import React from 'react';
import {render} from '@testing-library/react';
import GeneralInfo from '../Game/Info/GeneralInfo';

test('renders general info', () => {
  const {container, getByText} = render(
    <GeneralInfo title="test title">test value</GeneralInfo>
  );
  const title = container.querySelector('h3');
  expect(title.textContent).toBe('test title');
  expect(getByText(/test value/)).toBeInTheDocument();
});
