import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'components/Image';
import {useTranslation} from 'react-i18next';

const GameTeaser = ({game}) => {
  const {t} = useTranslation();
  const {
    title,
    path,
    studios = [],
    releases_years: [firstReleaseYear] = [],
    releases = [],
    genres = [],
    medias,
    people,
  } = game;

  const teaserPicture = medias.length > 0 && medias[0];

  return (
    <div
      className="bg-gray-900 hover:bg-gray-850 relative transition duration-200 flex flex-col"
      style={{maxWidth: 330}}
    >
      <Image
        image={teaserPicture}
        alt={title}
        sources={[['3x2_330x220', '3x2_660x440']]}
        ratio={2 / 3}
        defaultSize="3x2_330x220"
      />
      <div className="p-4 min-h-20 flex flex-col flex-grow">
        <div className="text-gray-500 font-light flex justify-between space-x-2">
          <span className="truncate">
            {studios.length > 0
              ? studios.map(s => s.name).join(', ')
              : people.map(p => p.fullname).join(', ')}
          </span>
          <span>{firstReleaseYear?.year}</span>
        </div>

        <h3 className="mb-auto pb-3">
          <Link href={'/games/[path]'} as={path}>
            <a className="text-white text-lg stretched-link">{title}</a>
          </Link>
        </h3>

        <div
          className={classNames(
            'flex flex-wrap -mr-1',
            genres.length > 0 && 'mb-1'
          )}
        >
          {releases.map(({platform_slug}) => (
            <a
              href={platform_slug}
              className="inline-block leading-none p-1 border border-gray-850 text-gray-500 font-light mb-1 hover:border-gray-550 hover:text-white relative z-10 mr-1"
              key={platform_slug}
            >
              {t(`platforms.${platform_slug}`)}
            </a>
          ))}
        </div>

        <div className="flex space-x-1">
          {genres.map(({slug}) => (
            <a
              href={slug}
              className="border-b border-dotted border-gray-700 text-gray-500 hover:text-white hover:border-gray-450 relative z-10 mb-1"
              key={slug}
            >
              {t(`genres.${slug}`)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameTeaser;
