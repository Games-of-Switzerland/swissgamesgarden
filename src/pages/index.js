import React from 'react'
import Layout from '../containers/Layout';
import fetch from "isomorphic-unfetch";
import Search from "../components/Search";
import HeaderTitle from "../components/Header/HeaderTitle";

const Home = ({games}) => {
  return (
    <Layout>
      <h1>Toolbar here</h1>
      <Search/>
      {/*<HeaderTitle/>*/}
      {/*{games.map(game => {*/}
      {/*  const {body, title, id} = game.attributes;*/}
      {/*  return (*/}
      {/*    <div key={game.id}>*/}
      {/*      <h2>{title}</h2>*/}
      {/*      <div dangerouslySetInnerHTML={{__html: body.processed}}/>*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
    </Layout>
  );
};

Home.getInitialProps = async function() {
  const res = await fetch('http://api.gos.test/jsonapi/node/game');
  const data = await res.json();

  return {
    games: data.data,
  };
};

export default Home;
