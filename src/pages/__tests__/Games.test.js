import React from 'react';
import Games from '../games/index';
import {render} from '@testing-library/react';
import games from '../../../tests/gamesTestData';

test('renders games empty state', () => {
  const {getByText} = render(<Games games={null} />);
  expect(getByText(/No games to show/)).toBeInTheDocument();
});

test('renders games list', () => {
  const {getAllByTestId} = render(<Games games={games.data} />);

  expect(getAllByTestId(/game-teaser/)).toHaveLength(3);
});
