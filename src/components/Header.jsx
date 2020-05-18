import React from 'react';
import Link from 'next/link';
import AutoSuggest from './AutoSuggest';

const Header = () => (
  <header className="header">
    <h1 className="header-title">
      <Link href="/">
        <a>
          Swiss Games <br />
          Garden
        </a>
      </Link>
    </h1>
    <AutoSuggest />

    {/* Menu */}
    <div className="header-menu">
      <Link href="/about">
        <a>
          <span>About</span>
        </a>
      </Link>
      <Link href="/contact">
        <a>
          <span>Contact</span>
        </a>
      </Link>
    </div>

    <Link href="/add">
      <a className="btn btn-white">Add a game</a>
    </Link>
  </header>
);

export default Header;
