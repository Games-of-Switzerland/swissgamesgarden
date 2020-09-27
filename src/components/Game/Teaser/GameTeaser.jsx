import React from 'react';
import Link from 'next/link';

const GameTeaser = ({game}) => {
  const {title, path, studios} = game;
  return (
    <div className="bg-gray-900">
      {studios && (
        <div>
          {studios.map(({name}) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      )}
      <Link href={path} as={path}>
        <a>
          <div className="bg-white">{title}</div>
        </a>
      </Link>
    </div>
  );
};

export default GameTeaser;
