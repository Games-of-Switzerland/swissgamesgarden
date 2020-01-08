import React from 'react';
import {useRouter} from "next/router";
import Layout from "../../containers/Layout";

const Game = game => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      {id}
    </Layout>
  )
};

export default Game;
