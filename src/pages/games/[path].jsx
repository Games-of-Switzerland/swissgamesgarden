import React from 'react';
import Layout from 'components/Layout/Layout';
import {getGame, getGames} from '../../lib/games';
import GameInfo from 'components/GameInfo/GameInfo';
import ReleasesInfo from 'components/GameInfo/ReleasesInfo';
import {fetchGame} from '../../lib/api';

const Game = ({title, body, studios, releases, genres}) => {
  // TODO indicate in backend that we display the first release as the main one.
  const releaseDate = new Date(releases.data[0].meta.date_value);

  return (
    <Layout>
      <div className="game-container">
        <div className="game-content">
          <div className="game-intro">
            <div className="text-color-light d-flex flex-between">
              {studios &&
                studios.data.map(studio => (
                  <span key={studio.id}>{studio.title}</span>
                ))}
              <span>{releaseDate.getFullYear()}</span>
            </div>

            <h1>{title}</h1>

            <div className="badges">
              {releases &&
                releases.data.map(release => (
                  <span className="badge" key={release.id}>
                    {release.platform}
                  </span>
                ))}
            </div>

            <div>
              {genres &&
                genres.data.map(genre => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
            </div>
          </div>

          <div className="mt-5" dangerouslySetInnerHTML={{__html: body}} />

          {/* TODO add links to download game */}
        </div>

        <div className="game-images">{/* TODO add images */}</div>

        <div className="game-info">
          <h2>Information</h2>

          <div className="two-cols">
            <GameInfo title="Studio">
              {/* TODO make this into a link to studio page*/}
              {studios &&
                studios.data.map(studio => (
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
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const games = await getGames();
  const paths = games.data.map(game => ({
    params: {path: game.attributes.field_path.replace('/games/', '')},
  }));

  return {paths, fallback: false};
};

export const getStaticProps = async ({params}) => {
  const game = await fetchGame(params.path);
  return {props: game};
};

export default Game;
