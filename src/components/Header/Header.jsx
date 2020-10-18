import React from 'react';
import Link from 'next/link';
import {AutoSuggest} from 'components/Search';

const Header = () => {
  const linkProps = {
    className:
      'text-white px-3 py-2 uppercase leading-relaxed hover:text-opacity-75 transition transition:opacity duration-200',
  };
  return (
    <header className="mb-6">
      <h1
        className="leading-none tracking-wide text-lg my-1 mr-6"
        style={{gridArea: 'title'}}
      >
        <Link href="/">
          <a className="text-white uppercase">
            Swiss Games <br />
            Garden
          </a>
        </Link>
      </h1>

      <AutoSuggest className="relative z-50" style={{gridArea: 'search'}} />

      {/* Menu */}
      <div className="flex" style={{gridArea: 'menu'}}>
        <Link href="/about">
          <a {...linkProps}>About</a>
        </Link>
        <Link href="/contact">
          <a {...linkProps}>
            <span>Contact</span>
          </a>
        </Link>
        <Link href="/add">
          <a className="btn btn-white ml-6">Add a game</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
