import React from 'react';

import '../styles/base.scss';
import Header from '../components/Header';

const Layout = props => (
  <div>
    <div className="container">
      <Header />
      {props.children}
    </div>
  </div>
);

export default Layout;
