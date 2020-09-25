import React from 'react';
import {ReleasesInfo, GameInfo} from './Info';
import {getSimpleReleases} from 'lib/games';

const GameDetail = ({game}) => {
  let releaseDate;
  const {title, studios, genres, body} = game;

  // TODO get releases from API
  const releases = getSimpleReleases();

  return (
    <div className="game-container">
      <div className="game-content">
        <div className="game-intro">
          <div className="text-color-light d-flex flex-between">
            {studios?.data.map(studio => (
              <span key={studio.id}>{studio.title}</span>
            ))}
            {releaseDate && <span>{releaseDate.getFullYear()}</span>}
          </div>

          <h1>{title}</h1>

          <div className="badges">
            {releases?.reduce((acc, release) => (
              <span className="badge" key={release.year}>
                {release.platforms.join(', ')}
              </span>
            ))}
          </div>

          <div>
            {genres?.data.map(genre => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        </div>

        <div
          className="mt-5"
          dangerouslySetInnerHTML={{__html: body.processed}}
        />

        {/* TODO add links to download game */}
      </div>

      <div className="game-images">{/* TODO add images */}</div>

      <div className="game-info">
        <h2>Information</h2>

        <div className="two-cols">
          <GameInfo title="Studio">
            {/* TODO make this into a link to studio page*/}
            {studios?.data.map(studio => (
              <span key={studio.id}>{studio.title}</span>
            ))}
          </GameInfo>

          <ReleasesInfo releases={releases} />

          {/* TODO add website URL */}
          {/* TODO add sponsors */}
          {/* TODO add locations */}
          {/* TODO add publisher */}
          {/* TODO add player number */}
          {/* TODO add social networks */}
          {/* TODO add languages */}
          {/* TODO add awards */}
          {/* TODO add full credits */}
          {/* TODO add data quality */}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
