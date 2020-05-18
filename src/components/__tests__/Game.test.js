import React from 'react';
import {normalizedGameTestData} from '../../../tests/gameTestData';
import Game from '../../pages/games/[path]';
import {render} from '@testing-library/react';

test('renders a game detail page', () => {
  const {getByText} = render(<Game {...normalizedGameTestData} />);
  expect(getByText(/Don't kill Her/)).toBeInTheDocument();
});
