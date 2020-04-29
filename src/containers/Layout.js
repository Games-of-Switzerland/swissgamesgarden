import React from 'react';

import '../styles/base.scss';
import Header from '../components/Header';
import {StateProvider} from '../context/store';
import {SearchkitManager, SearchkitProvider} from 'searchkit';
import config from '../config';

const searchkit = new SearchkitManager(`${config.QUERY_GAMES_URL}`);

const Layout = props => (
  <StateProvider>
    <SearchkitProvider searchkit={searchkit}>
      <div className="container">
        <Header />
        {props.children}
      </div>
    </SearchkitProvider>
  </StateProvider>
);

export default Layout;
