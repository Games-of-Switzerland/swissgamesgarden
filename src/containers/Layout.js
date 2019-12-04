import React from 'react';
import Head from "next/head";

import '../styles/base.scss';

const Layout = props => (
  <div>
    {/*<Head>*/}
    {/*  <title>{props.title}</title>*/}
    {/*</Head>*/}
    {props.children}
  </div>
);

export default Layout;


