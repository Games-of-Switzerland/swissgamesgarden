import i18next from 'i18next';
import {useDebounce} from 'hooks';

import GamePadIcon from 'svg/gamepad.svg';
import PersonIcon from 'svg/person.svg';
import StudioIcon from 'svg/studio.svg';

const Highlight = ({text, highlight}) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="text-white font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const getSuggestionData = (hit, value) => {
  let data = {};
  switch (hit._source.bundle) {
    case 'game':
      data = {
        icon: <GamePadIcon width="1.5rem" className="text-red-500" />,
        text: <Highlight text={hit._source.title} highlight={value} />,
        value: hit._source.title,
        kind: i18next.t('content_type.game'),
      };
      break;
    case 'people':
      data = {
        icon: <PersonIcon width="1.5rem" className="text-green-500" />,
        text: <Highlight text={hit._source.fullname} highlight={value} />,
        value: hit._source.fullname,
        kind: i18next.t('content_type.people'),
      };
      break;
    case 'studio':
      data = {
        icon: <StudioIcon width="1.5rem" className="text-purple-500" />,
        text: <Highlight text={hit._source.name} highlight={value} />,
        value: hit._source.name,
        kind: i18next.t('content_type.studio'),
      };
      break;
  }

  return {
    score: hit._score,
    path: hit._source.path,
    ...data,
  };
};

export const getAutocomplete = async (key, value) => {
  if (!value) return [];

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTOCOMPLETE}?q=${value}`
  );
  const results = await response.json();
  return results.aggregations.bundles.bundle.buckets
    .reduce((acc, bucket) => [...acc, ...bucket.top.hits.hits], [])
    .sort((a, b) => b._score - a._score)
    .map(hit => getSuggestionData(hit, value));
};

export const useAutocomplete = value => {
  const debouncedAutocomplete = useDebounce(getAutocomplete, 300);

  return data || [];
};
