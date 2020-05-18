import React from 'react';
import Header from './Header';

const Layout = props => (
  <div>
    <div className="container">
      <Header />
      {props.children}
    </div>
  </div>
);

export default Layout;
