import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const GameTeaser = ({game}) => {
  const {
    title,
    path,
    studios = [],
    releases_years: [firstReleaseYear] = [],
    releases = [],
    genres = [],
  } = game;

  return (
    <div className="bg-gray-900 hover:bg-gray-850 relative transition duration-200">
      <div className="p-4 min-h-20 flex flex-col">
        <div className="text-gray-500 font-light flex justify-between">
          <span>
            {studios.map(({name}) => (
              <span key={name}>{name}</span>
            ))}
          </span>
          <span>{firstReleaseYear?.year}</span>
        </div>

        <h3 className="mb-auto pb-3">
          <Link href={path} as={path}>
            <a className="font-medium text-white text-lg stretched-link">
              {title}
            </a>
          </Link>
        </h3>

        <div className={classNames(`-mr-1`, genres.length > 0 && 'mb-1')}>
          {releases.map(({platform_slug}) => (
            <a
              href={platform_slug}
              className="inline-block leading-none p-1 border border-gray-850 text-gray-500 font-light mr-1 mb-1 hover:border-gray-550 hover:text-white relative z-10"
              key={platform_slug}
            >
              {platform_slug}
            </a>
          ))}
        </div>

        <div>
          {genres.map(({slug}) => (
            <a
              href={slug}
              className="border-b border-dotted border-gray-700 text-gray-500 hover:text-white hover:border-gray-450 mr-2 relative z-10"
              key={slug}
            >
              {slug}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameTeaser;
