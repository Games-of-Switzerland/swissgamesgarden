import React from 'react';
import Link from 'next/link';
import {AutoSuggest} from 'components/Search';

const Header = () => (
  <header className="header grid gap-4 mx-4 mt-1">
    <h1 className="header-title leading-none tracking-wider text-lg">
      <Link href="/">
        <a className="text-white uppercase">
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
      <Link href="/games">
        <a>
          <span>Games</span>
        </a>
      </Link>
    </div>

    <Link href="/add">
      <a className="btn btn-white">Add a game</a>
    </Link>
  </header>
);

export default Header;
