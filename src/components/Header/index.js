import HeaderSearch from "./HeaderSearch";

import './Header.scss';
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">
        <Link href="/">
          <a>Swiss Games <br/>
            Garden</a>
        </Link>
      </h1>
      <HeaderSearch/>
      <div style={{color: 'var(--white)'}}>menu here</div>
    </header>
  )
};

export default Header;
