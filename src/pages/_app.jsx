import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import {Hydrate} from 'react-query/hydration';
import 'styles/index.css';
import {ReactQueryDevtools} from 'react-query-devtools';
import 'locales/i18n';
import Layout from 'components/Layout';
import React from 'react';
import {DefaultSeo} from 'next-seo';

const queryCache = new QueryCache();

export default function App({Component, pageProps}) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <DefaultSeo
          dangerouslySetAllPagesToNoFollow={
            process.env.NEXT_PUBLIC_ENV !== 'production'
          }
          dangerouslySetAllPagesToNoIndex={
            process.env.NEXT_PUBLIC_ENV !== 'production'
          }
          openGraph={{
            type: 'website',
            locale: 'en_CH',
            site_name: 'Games of Switzerland',
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen />
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}
