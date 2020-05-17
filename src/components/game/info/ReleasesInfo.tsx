import React from 'react';
import GameInfo from '../../GameInfo';
import {getSimpleReleases, Release} from '../../../lib/games';

interface Props {
  releases: Release[];
}

const ReleasesInfo = ({releases}: Props) => {
  const releasesByDate = getSimpleReleases(releases);
  const title = 'Release(s)';

  return (
    <GameInfo title={title}>
      <ul>
        {releasesByDate.map((releasesGroup: any) => {
          const date = new Date(releasesGroup[0].date);
          const year = date.getFullYear();

          return (
            <li key={`release-${year}`}>
              <span title={date.toDateString()}>{year}</span>

              {releasesByDate.length > 1 && (
                <small className="text-color-light">
                  {' '}
                  — {releasesGroup.map((r: Release) => r.platform).join(', ')}
                </small>
              )}
            </li>
          );
        })}
      </ul>
    </GameInfo>
  );
};

export default ReleasesInfo;
