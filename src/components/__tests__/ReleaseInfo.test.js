import React from 'react';
import {render} from '@testing-library/react';
import ReleasesInfo from '../GameInfo/ReleasesInfo';
import {normalizedGameTestData} from '../../../tests/gameTestData';

test('renders general info', () => {
  const {getAllByTestId, getByTitle, getByText} = render(
    <ReleasesInfo releases={normalizedGameTestData.releases} />
  );
  const releaseInfos = getAllByTestId('release-info-item');
  expect(releaseInfos).toHaveLength(1);
  expect(getByTitle(/Tue Apr 14 2020/)).toBeInTheDocument();
  expect(getByText(/Mac, PC/)).toBeInTheDocument();
});
