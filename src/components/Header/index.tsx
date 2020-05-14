import React from 'react';
import Link from 'next/link';

import styles from './header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.headerTitle}>
      <Link href="/">
        <a>
          Swiss Games <br />
          Garden
        </a>
      </Link>
    </h1>
    {/*<HeaderSearch />*/}

    {/* Menu */}
    <div className={styles.headerMenu}>
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
