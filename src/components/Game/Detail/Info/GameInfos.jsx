import Link from 'next/link';
import {useTranslation} from 'react-i18next';
import {cleanURL} from 'utils/url';
import {GameInfo} from './index';

const StandardLinksList = ({links}) =>
  links && (
    <ul>
      {links.map(({title, uri, link, social_network}, i) => {
        const url = uri || link;
        const name = title || social_network;
        return (
          <li key={i}>
            <a
              className='link-dotted truncate inline-block max-w-truncated-link'
              href={url}
              target='_blank'
              rel='noreferrer nofollow'
            >
              {name || cleanURL(url)}
            </a>
          </li>
        );
      })}
    </ul>
  );

const GameInfos = ({game}) => {
  const {t} = useTranslation();

  const {
    contextual_links,
    studios,
    releases_normalized: releases = [],
    website,
    locations,
    cantons,
    publishers,
    sponsors,
    social_networks,
    members,
    sources,
    article_links,
  } = game;

  const renderStudioPeople = ({title, field_path, id}) =>
    (
      <Link href={field_path} key={id}>
        <a
          className='text-white hover:text-opacity-75 transition transition:opacity duration-200'>
          {title}
        </a>
      </Link>
    );

  const gameInfos = [
    {
      title: 'game.contextual_links',
      content: contextual_links?.length > 0 && (
        <div className='flex flex-wrap -mr-2'>
          {contextual_links.map(({type, url}, i) => (
            <a
              key={i}
              className='btn btn-white mr-2 mb-2'
              href={url}
              target='_blank'
              rel='noreferrer nofollow'
            >
              {t(`game.contextual_link.${type}`)}
            </a>
          ))}
        </div>
      ),
      count: contextual_links?.length,
    },
    {
      title: 'game.studios',
      content: studios?.data.map(renderStudioPeople),
      count: studios?.data.length,
    },
    {
      title: 'game.members',
      content: members?.data.map(renderStudioPeople),
      count: members?.data.length,
      childrenClass: 'flex flex-col',
    },
    {
      title: 'game.locations',
      content: locations?.data.map(({name}) => name).join(', '),
      count: locations?.data.length,
    },
    {
      title: 'game.cantons',
      content: cantons?.data.map(({name}) => name).join(', '),
      count: cantons?.data.length,
    },
    {
      title: 'game.releases',
      content: releases.length > 0 && (
        <ul>
          {releases.map(({year, platforms}) => (
            <li key={`release-${year}`} className='leading-none mb-2'>
              <span>{year || t('game.unreleased')}</span>{' '}
              <span className='text-sm text-gray-500'>
                ·{' '}
                {Object.values(platforms).map(
                  ({name, state}) =>
                    t(`platforms.${name}`) +
                    (state && state !== 'released'
                      ? ` (${t(`state.${state}`)})`
                      : ''),
                ).join(', ')}
              </span>
            </li>
          ))}
        </ul>
      ),
      count: releases.length,
    },
    {
      title: 'game.publishers',
      content: publishers?.data.map(({name}) => name).join(', '),
      count: publishers?.data.length,
    },
    {
      title: 'game.website',
      content: website?.uri && (
        <a
          className='truncate link-dotted max-w-full inline-block leading-6'
          href={website.uri}
          target='_blank'
          rel='noreferrer nofollow'
        >
          {cleanURL(website.uri)}
        </a>
      ),
    },
    {
      title: 'game.sponsors',
      content: sponsors?.data.map(({name}) => name).join(', '),
      count: sponsors?.data.length,
    },
    {
      title: 'game.social_networks',
      content: <StandardLinksList links={social_networks} />,
      count: social_networks?.length,
    },
    {
      title: 'game.sources',
      content: <StandardLinksList links={sources} />,
      count: sources?.length,
    },
    {
      title: 'game.article_links',
      content: <StandardLinksList links={article_links} />,
      count: article_links?.length,
    },
  ];

  // Stop here if none have any content
  if (gameInfos.every(info => !info.content)) return null;

  return (
    <div className='mb-16'>
      <h2 className='section-title'>{t('game.information')}</h2>
      <div className='grid grid-cols-2 mb-5 gap-x-3 gap-y-8'>
        {gameInfos.filter(({count}) => count === undefined || count > 0).
        map(({title, content, count, childrenClass}, i) => (
          <GameInfo key={i} title={t(title, {count})} childrenClass={childrenClass}>
            {content}
          </GameInfo>
        ))}
      </div>
    </div>
  );
};

export default GameInfos;
