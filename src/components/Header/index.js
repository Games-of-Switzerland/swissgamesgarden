import HeaderSearch from "./HeaderSearch";

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">
        Swiss Games <br/>
        Garden
      </h1>
      <HeaderSearch/>
      <div style={{color: 'var(--white)'}}>menu here</div>
    </header>
  )
};

export default Header;
