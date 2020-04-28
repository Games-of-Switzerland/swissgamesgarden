import React from 'react';

import '../styles/base.scss';
import Header from '../components/Header';
import {StateProvider} from '../context/store';

const Layout = props => (
  <StateProvider>
    <div className="container">
      <Header />
      {props.children}
    </div>
  </StateProvider>
);

export default Layout;
