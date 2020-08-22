import React from 'react';
import GameInfo from 'components/GameInfo';
import {getSimpleReleases} from 'lib/games';
import PropTypes from 'prop-types';
import {ReleasePropType} from 'types/game-types';

const ReleasesInfo = ({releases}) => {
  const releasesByDate = getSimpleReleases(releases);
  const title = 'Release(s)';

  return (
    <GameInfo title={title}>
      <ul>
        {releasesByDate.map(releasesGroup => {
          const date = new Date(releasesGroup[0].date);
          const year = releasesGroup[0].year;

          return (
            <li key={`release-${year}`} data-testid="release-info-item">
              <span title={date.toDateString()}>{year}</span>

              {(releasesByDate.length > 1 || releasesGroup.length > 1) && (
                <small className="text-color-light">
                  {' '}
                  — {releasesGroup.map(r => r.platform).join(', ')}
                </small>
              )}
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
