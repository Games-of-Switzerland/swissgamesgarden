import React from 'react';
import GameInfo from './GameInfo';
import PropTypes from 'prop-types';
import {ReleasePropType} from 'types/game-types';
import {getSimpleReleases} from 'lib/games';

const ReleasesInfo = ({releases}) => {
  const releasesByDate = getSimpleReleases(releases);

  return (
    <GameInfo title="game.release">
      <ul>
        {releasesByDate.map(({year, date, platforms}) => {
          date = new Date(date);

          return (
            <li key={`release-${year}`}>
              <span title={date.toDateString()}>{year}</span>:{' '}
              {platforms.join(', ')}
            </li>
          );
        })}
      </ul>
    </GameInfo>
  );
};

ReleasesInfo.propTypes = {
  releases: PropTypes.arrayOf(ReleasePropType),
};

export default ReleasesInfo;
