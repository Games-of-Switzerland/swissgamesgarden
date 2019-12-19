import React from 'react';
import {DataSearch, ReactiveBase} from "@appbaseio/reactivesearch";
import fetch from "isomorphic-unfetch";

import '../styles/base.scss';

const Layout = props => {
  return (
    <div className="container">
      {/*<Head>*/}
      {/*  <title>{props.title}</title>*/}
      {/*</Head>*/}
      <ReactiveBase
        app="gos_node_game"
        url="http://localhost:9200"
        credentials="null"
      >
        <DataSearch
          componentId="gameSearch"
          dataField={['title', 'title.keyword']}
          fieldWeights={[1, 3]}
          placeholder="Search games"
          autosuggest={true}
          showClear={true}
        />
        {props.children}
      </ReactiveBase>
    </div>
  );
};

export default Layout;


