import React from 'react';
import {useRouter} from 'next/router';
import Layout from '../../containers/Layout';

const Studio = () => {
  const router = useRouter();
  const {id} = router.query;
  console.log(router.query);

  return <Layout>{id}</Layout>;
};

export default Studio;
