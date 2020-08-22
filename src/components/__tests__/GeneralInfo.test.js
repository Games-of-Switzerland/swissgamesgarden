import React from 'react';
import {render} from '@testing-library/react';
import GameInfo from '../GameInfo/GameInfo';

test('renders general info', () => {
  const {container, getByText} = render(
    <GameInfo title="test title">test value</GameInfo>
  );
  const title = container.querySelector('h3');
  expect(title.textContent).toBe('test title');
  expect(getByText(/test value/)).toBeInTheDocument();
});
