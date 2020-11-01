import React from 'react';
import GameTeaser from './GameTeaser';

export default {
  title: 'Games|Path Teaser',
  component: GameTeaser,
  decorators: [storyFn => <div style={{maxWidth: 391}}>{storyFn()}</div>],
  excludeStories: /.*Data$/,
};

export const gameData = {
  id: '1',
  nid: 1,
  studio: 'Studio name',
  year: 2019,
  title: 'Path title',
  platforms: ['ps4', 'steam'],
  genres: ['rpg', 'adventure'],
  players: [1, 2],
};

export const Standard = () => <GameTeaser {...gameData} />;
