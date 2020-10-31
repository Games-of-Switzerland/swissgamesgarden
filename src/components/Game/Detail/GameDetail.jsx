import React from 'react';
import config from 'config';
import {useTranslation} from 'react-i18next';
import {GameInfos} from 'components/Game';
import Category from './Category';
import Image from 'components/Image';
import classNames from 'classnames';
import {useMedia} from 'react-use';

const GameDetail = ({game}) => {
  const {t} = useTranslation();
  const {
    title,
    studios,
    genres,
    body,
    releases_normalized: releases,
    release_platforms: platforms,
    languages,
    awards,
    credits,
    completeness,
    images,
    members,
    ...rest
  } = game;
  console.log(rest);

  const releaseYear = releases[0]?.year || t('game.release_TBA');
  const completeness_percent = Math.round(
    ((completeness ?? 0) / config.MAX_COMPLETENESS) * 100
  );

  const has2Images = images.data.length === 2;
  const hasManyImages = images.data.length > 2;

  const sources =
    has2Images || hasManyImages
      ? [['downscale_330x660']]
      : [['downscale_675x500', 'downscale_1350x1000']];

  const renderImages = (imgs = images.data, className) =>
    imgs.map(image => (
      <Image
        className={className}
        alt={title}
        sources={sources}
        image={image}
        key={image.id}
      />
    ));

  const ManyImages = () => {
    const isMobile = useMedia('(max-width: 767px)');

    if (isMobile) return renderImages(undefined, 'mb-4');

    const output = images.data.reduce((acc, img, i) => {
      const colIndex = i % 3;
      acc[colIndex] = acc[colIndex] ? [...acc[colIndex], img] : [img];
      return acc;
    }, []);

    return output.map(col => <div>{renderImages(col, 'mb-4')}</div>);
  };

  return (
    <div className="game-container text-white">
      <div style={{gridArea: 'main'}} className="pt-14 text-lg font-light">
        <div className="mb-10">
          <div className="text-gray-500 flex justify-between">
            {/* STUDIOS / PEOPLE */}
            <span>
              {studios?.data.map(s => s.title).join(', ') ||
                members?.data.map(p => p.title).join(', ')}
            </span>

            {/* FIRST RELEASE YEAR */}
            {releaseYear && <span className="ml-auto">{releaseYear}</span>}
          </div>

          {/* GAME TITLE */}
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>

          {/* PLATFORMS */}
          {platforms && (
            <div className="flex flex-wrap -mr-1 mb-3">
              {platforms.data.map(({slug, id}) => (
                <a
                  href={id}
                  className="inline-block leading-none p-1 border border-gray-850 text-white font-light mr-1 mb-1 hover:border-gray-550 hover:text-white relative z-10 text-lg"
                  key={id}
                >
                  {t(`platforms.${slug}`)}
                </a>
              ))}
            </div>
          )}

          {/* GENRES */}
          {genres && (
            <div className="mb-3">
              {genres.data.map(({slug, id}) => (
                <a
                  href={slug}
                  className="border-b border-dotted border-gray-700 text-gray-500 hover:text-white hover:border-gray-450 mr-2 relative z-10"
                  key={id}
                >
                  {t(`genres.${slug}`)}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        {body ? (
          <div
            className="mb-10"
            dangerouslySetInnerHTML={{__html: body.processed}}
          />
        ) : (
          <div className="text-gray-500 mb-10 italic">
            {t('game.no_description')}
          </div>
        )}

        {/* TODO add links to download game */}
      </div>

      {/* IMAGES */}
      <div
        style={{gridArea: hasManyImages ? 'images-lg' : 'images'}}
        className="mb-8"
      >
        {has2Images ? (
          <div className="grid gap-4 grid-cols-2">{renderImages()}</div>
        ) : hasManyImages ? (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 grid-images">
            <ManyImages />
          </div>
        ) : (
          renderImages()
        )}
      </div>

      <div style={{gridArea: 'secondary'}}>
        {/* GAME INFO */}
        <GameInfos game={game} />

        {/* LANGUAGES */}
        {languages.data.length > 0 && (
          <Category title="game.languages" count={languages.data.length}>
            <div className="text-lg">
              {languages.data.map(({name}) => name).join(', ')}
            </div>
          </Category>
        )}

        {/* AWARDS */}
        {/*TODO add award picto*/}
        {/*TODO add award location*/}
        {awards.length > 0 && (
          <Category title="game.awards">
            <ul className="text-lg">
              {awards?.map((award, i) => (
                <li key={i}>
                  <div>{award}</div>
                  {/*<div className="text-gray-500 text-md">location</div>*/}
                </li>
              ))}
            </ul>
          </Category>
        )}

        {/* CREDITS */}
        {credits && (
          <Category title="game.credits">
            <div
              className="formatted"
              dangerouslySetInnerHTML={{__html: credits.processed}}
            />
          </Category>
        )}

        {/* DATA QUALITY */}
        {completeness && (
          <Category
            title="game.completeness"
            className="border-gradient"
            style={{
              '--percentage': `${completeness_percent}%`,
            }}
          >
            <div className="text-2xl font-semibold">
              {completeness_percent}%
            </div>
            <p className="text-lg w-1/2 mb-8">
              {t('game.completeness_description')}
            </p>
            {/*TODO find a correct email*/}
            <a
              href="mailto:email@example.org"
              className="btn border text-md py-3 font-semibold border-gray-850 hover:border-gray-500"
            >
              {t('gos.contact_us')}
            </a>
            <div className="mt-8 text-md text-gray-700">
              * {t('game.completeness_help')}
            </div>
          </Category>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
