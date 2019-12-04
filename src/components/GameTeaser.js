import React from 'react';
import PropTypes from 'prop-types';
import './GameTeaser.scss';
import Link from "next/link";

const GameTeaser = ({game}) => {
  return (
    <Link href="/games/[id]" as={`/games/${game.id}`}>
      <a className="game-teaser">
        <picture>
          <source srcSet={game.img.sm} media="(max-width: 720px)" />
          <source srcSet={game.img.lg} media="(min-width: 1200px)" />
          <img src={game.img.md} alt={game.title} />
        </picture>
        <div className="game-teaser-content">
          <div>{game.studio}</div>
          <div style={{justifySelf: 'end'}}>{game.year}</div>
          <h2 style={{gridColumn: 'title'}}>{game.title}</h2>
          <div className="badges" style={{gridColumn: 'platforms'}}>
            {game.platforms && game.platforms.map((platform, i) =>
              <span key={i} className="link link-badge">{platform}</span>
            )}
          </div>
          <div>
            {game.genres && game.genres.map((genre, i) =>
              <button key={i} className="link link-underline">{genre}</button>
            )}
          </div>
          <div className="font-weight-semibold" style={{justifySelf: 'end'}}>
            {game.players && game.players.join('-')} <span aria-label="player controller">🎮</span>
          </div>
        </div>
      </a>
    </Link>
  )
};

GameTeaser.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.shape({
      sm: PropTypes.string.isRequired,
      md: PropTypes.string.isRequired,
      lg: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
    studio: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    players: PropTypes.arrayOf(PropTypes.number).isRequired,
  })
};

export default GameTeaser;
