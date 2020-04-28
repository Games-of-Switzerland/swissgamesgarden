import Link from 'next/link';

import HeaderSearch from './HeaderSearch';
import Menu from './Menu';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">
        <Link href="/">
          <a>
            Swiss Games <br />
            Garden
          </a>
        </Link>
      </h1>
      <HeaderSearch />
      <Menu />
    </header>
  );
};

export default Header;
