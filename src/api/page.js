import {deserialise, query} from 'kitsu-core';
import {QueryClient, useQuery} from 'react-query';
import {dehydrate} from 'react-query/hydration';

export const getPage = async ({queryKey}) => {
  const queryUrl = query({
    filter: {
      field_path: `/pages/${queryKey[1]}`,
    },
    fields: {
      'node--page': 'title,body',
    },
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JSONAPI}/node/page?${queryUrl}`
  ).catch(err => {
    console.log(err);
  });
  const data = await res.json();

  return (await deserialise(data).data[0]) || null;
};

export const usePage = path => {
  return useQuery(['page', path], getPage);
};

export const prefetchPage = async ({path, query}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['page', path], getPage, {});

  return (
    queryClient && {
      props: {
        path,
        dehydratedState: dehydrate(queryClient),
      },
    }
  );
};
