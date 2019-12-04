import React from 'react';
import GameTeaser from "./GameTeaser";

export default {
  title: 'Games|Game Teaser',
  component: GameTeaser,
  decorators: [storyFn => <div style={{ maxWidth: 391 }}>{storyFn()}</div>],
  excludeStories: /.*Data$/,
};

export const gameData = {
  title: "Don't Kill Her",
  name: "Test",
};

export const Standard = () => <GameTeaser game={gameData} />;
