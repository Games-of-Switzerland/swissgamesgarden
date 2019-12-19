import React from 'react';

import '../styles/base.scss';
import Header from "../components/Header";

const Layout = props => {
  return (
    <div className="container">
      <Header/>
      {props.children}
    </div>
  );
};

export default Layout;


