import React from 'react';
import {GameInfo} from './Info';
import classNames from 'classnames';
import {cleanURL} from 'utils/url';
import config from 'config';

const GameDetail = ({game}) => {
  const {
    title,
    studios,
    genres,
    body,
    releases_normalized: releases,
    release_platforms: platforms,
    website,
    locations,
    publishers,
    sponsors,
    social_networks,
    languages,
    awards,
    credits,
    completeness,
    members,
  } = game;

  const releaseYear = releases[0].year;
  const completeness_percent =
    ((completeness ?? 0) / config.MAX_COMPLETENESS) * 100;
  const gameInfos = [
    {
      title: 'game.studios',
      content: studios?.data.map(({title}) => title).join(', '),
    },
    {
      title: 'game.members',
      content: members?.data.map(({title}) => title).join(', '),
    },
    {
      title: 'game.locations',
      content: locations?.data.map(({name}) => name).join(', '),
    },
    {
      title: 'game.releases',
      content: (
        <ul>
          {releases.map(({year, platforms}) => (
            <li key={`release-${year}`} className="leading-none mb-2">
              <span>{year}</span>{' '}
              <span className="text-sm text-gray-500">
                ·{' '}
                {Object.values(platforms)
                  .map(
                    ({name, state}) =>
                      name + (state !== 'released' ? ` (${state})` : '')
                  )
                  .join(', ')}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'game.publishers',
      content: publishers?.data.map(({name}) => name).join(', '),
    },
    {
      title: 'game.website',
      content: (
        <a
          className="border-b border-dotted border-gray-700"
          href={website.uri}
        >
          {cleanURL(website.uri)}
        </a>
      ),
    },
    {
      title: 'game.sponsors',
      content: sponsors?.data.map(({name}) => name).join(', '),
    },
    {
      title: 'game.social_networks',
      content: (
        <ul>
          {social_networks?.map(({social_network, link}, i) => (
            <li key={i}>
              <a
                className="border-b border-dotted border-gray-700"
                href={link}
                target="_blank"
                rel="noreferrer nofollow"
              >
                {social_network}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="game-container text-white mb-16">
      <div style={{gridArea: 'main'}} className="pt-14 text-lg font-light">
        <div className="mb-12">
          <div className="text-gray-500 flex justify-between">
            {studios?.data.map(({id, title}) => (
              <span key={id}>{title}</span>
            ))}
            {releaseYear && <span>{releaseYear}</span>}
          </div>

          <h1 className="text-4xl font-semibold mb-4">{title}</h1>

          <div
            className={classNames(
              'flex flex-wrap -mr-1 mb-3',
              genres.length > 0 && 'mb-1'
            )}
          >
            {platforms?.data.map(({slug, id}) => (
              <a
                href={id}
                className="inline-block leading-none p-1 border border-gray-850 text-white font-light mr-1 mb-1 hover:border-gray-550 hover:text-white relative z-10 text-lg"
                key={id}
              >
                {slug}
              </a>
            ))}
          </div>

          <div>
            {genres?.data.map(({slug, id}) => (
              <a
                href={slug}
                className="border-b border-dotted border-gray-700 text-gray-500 hover:text-white hover:border-gray-450 mr-2 relative z-10"
                key={id}
              >
                {slug}
              </a>
            ))}
          </div>
        </div>

        <div dangerouslySetInnerHTML={{__html: body.processed}} />

        {/* TODO add links to download game */}
      </div>

      <div style={{gridArea: 'images'}} className="mb-12">
        {/* TODO add images */}
      </div>

      <div style={{gridArea: 'secondary'}}>
        <h2 className="section-title">game.information</h2>

        <div className="grid grid-cols-2 mb-5">
          {gameInfos.map(({title, content}, i) => (
            <GameInfo key={i} title={title}>
              {content}
            </GameInfo>
          ))}

          {/* TODO add data quality */}
        </div>

        {languages && (
          <div className="mb-16">
            <h2 className="section-title">game.languages</h2>
            <div className="text-lg">
              {languages?.data.map(({name}) => name).join(', ')}
            </div>
          </div>
        )}

        {/*TODO add award picto*/}
        {/*TODO add award location*/}
        {awards && (
          <div className="mb-16">
            <h2 className="section-title">game.awards</h2>
            <ul className="text-lg">
              {awards?.map((award, i) => (
                <li key={i}>
                  <div>{award}</div>
                  {/*<div className="text-gray-500 text-md">location</div>*/}
                </li>
              ))}
            </ul>
          </div>
        )}

        {credits && (
          <div className="mb-16">
            <h2 className="section-title">game.credits</h2>
            <div
              className="formatted"
              dangerouslySetInnerHTML={{__html: credits.processed}}
            />
          </div>
        )}

        {completeness && (
          <div>
            <h2
              className="section-title border-gradient"
              style={{
                '--percentage': `${completeness_percent}%`,
              }}
            >
              game.completeness*
            </h2>
            <div className="text-2xl font-semibold">
              {completeness_percent}%
            </div>
            <p className="text-lg max-w-1/2 mb-8">
              game.compleness_description
            </p>
            {/*TODO find a correct email*/}
            <a
              href="mailto:email@example.org"
              className="btn border text-md py-3 font-semibold border-gray-850 hover:border-gray-500"
            >
              contact_us
            </a>
            <div className="mt-8 text-md text-gray-700">
              * game.completeness_help
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
