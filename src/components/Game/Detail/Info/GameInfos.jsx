import {useTranslation} from 'react-i18next';
import {cleanURL} from 'utils/url';
import {GameInfo} from './index';

const StandardLinksList = ({links}) =>
  links && (
    <ul>
      {links.map(({title, uri}, i) => (
        <li key={i}>
          <a
            className="link-dotted truncate inline-block max-w-truncated-link"
            href={uri}
            target="_blank"
            rel="noreferrer nofollow"
          >
            {title || cleanURL(uri)}
          </a>
        </li>
      ))}
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
    publishers,
    sponsors,
    social_networks,
    members,
    sources,
    article_links,
  } = game;

  const gameInfos = [
    {
      title: 'game.contextual_links',
      content: contextual_links?.length > 0 && (
        <div className="flex flex-wrap -mr-2">
          {contextual_links.map(({type, url}, i) => (
            <a
              key={i}
              className="btn btn-white mr-2 mb-2"
              href={url}
              target="_blank"
              rel="noreferrer nofollow"
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
      content: studios?.data.map(({title}) => title).join(', '),
      count: studios?.data.length,
    },
    {
      title: 'game.members',
      content: members?.data.map(({title}) => title).join(', '),
      count: members?.data.length,
    },
    {
      title: 'game.locations',
      content: locations?.data.map(({name}) => name).join(', '),
      count: locations?.data.length,
    },
    {
      title: 'game.releases',
      content: releases.length > 0 && (
        <ul>
          {releases.map(({year, platforms}) => (
            <li key={`release-${year}`} className="leading-none mb-2">
              <span>{year || t('game.unreleased')}</span>{' '}
              <span className="text-sm text-gray-500">
                ·{' '}
                {Object.values(platforms)
                  .map(
                    ({name, state}) =>
                      t(`platforms.${name}`) +
                      (state && state !== 'released'
                        ? ` (${t(`state.${state}`)})`
                        : '')
                  )
                  .join(', ')}
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
      content: website && (
        <a
          className="truncate link-dotted max-w-full inline-block leading-6"
          href={website.uri}
          target="_blank"
          rel="noreferrer nofollow"
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
    <div className="mb-16">
      <h2 className="section-title">{t('game.information')}</h2>
      <div className="grid grid-cols-2 mb-5 gap-x-3 gap-y-8">
        {gameInfos
          .filter(({count}) => count === undefined || count > 0)
          .map(({title, content, count}, i) => (
            <GameInfo key={i} title={t(title, {count})}>
              {content}
            </GameInfo>
          ))}
      </div>
    </div>
  );
};

export default GameInfos;
