import React from 'react';

import '../styles/base.scss';
import Header from '../components/Header';
import {StateProvider} from '../context/store';
import {SearchkitManager, SearchkitProvider} from 'searchkit';

const searchkit = new SearchkitManager(`${process.env.ELASTIC_URL}`, {
  searchUrlPath: '',
});

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
