import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Image from 'components/Image';
import Popover from 'components/Popover';
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
    <div className="bg-gray-900 hover:bg-gray-850 relative transition duration-200 flex flex-col">
      <Image
        image={teaserPicture}
        alt={title}
        sources={[['3x2_330x220', '3x2_660x440']]}
        defaultSize="3x2_330x220"
        className="flex-grow"
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

        {releases.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <Link href={`/?platforms[]=${releases[0].platform_slug}`} key={releases[0].platform_slug}>
              <a
                className="inline-block leading-none p-1 border border-gray-850 text-gray-500 font-light hover:border-gray-550 hover:text-white relative z-10">
                {t(`platforms.${releases[0].platform_slug}`)}
              </a>
            </Link>
            {releases.length > 1 && (
              <Popover
                className="z-20"
                classNamePopover="-mt-14"
                trigger="hover"
                content={
                  <p>{releases.slice(1).map(release => t(`platforms.${release.platform_slug}`)).join(', ', )}</p>
                }
              >
                <span className="p-1 pl-0 text-sm text-gray-500 z-10">+{releases.length - 1}</span>
              </Popover>
            )}
          </div>
        )}

        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            <Link href={`/?genres[]=${genres[0].slug}`} key={genres[0].slug}>
              <a
                className="font-light border-b border-dotted border-gray-700 text-gray-500 hover:text-white hover:border-gray-450 relative z-10 mb-1">
                {t(`genres.${genres[0].slug}`)}
              </a>
            </Link>
            {genres.length > 1 && (
              <Popover
                className="z-20"
                classNamePopover="-mt-14"
                trigger="hover"
                content={
                  <p>{genres.slice(1).map(genre => t(`genres.${genre.slug}`)).join(', ', )}</p>
                }
              >
                <span className="p-1 pl-0 text-sm text-gray-500 z-10">+{genres.length - 1}</span>
              </Popover>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTeaser;
