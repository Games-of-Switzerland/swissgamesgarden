import HeaderSearch from "./HeaderSearch";

import './Header.scss';
import Link from "next/link";
import Menu from "./Menu";

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
      <Menu/>
    </header>
  )
};

export default Header;
