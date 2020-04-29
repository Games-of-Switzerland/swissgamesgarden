import React from 'react';
import {useRouter} from 'next/router';
import Layout from '../../containers/Layout';

const Person = () => {
  const router = useRouter();
  const {id} = router.query;

  return <Layout>{id}</Layout>;
};

export default Person;
