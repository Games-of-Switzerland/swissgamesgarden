import Layout from 'components/Layout';
import 'locales/i18n';
import {DefaultSeo} from 'next-seo';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {Hydrate} from 'react-query/hydration';
import 'styles/index.css';import Head from 'next/head'

const queryClient = new QueryClient();

export default function App({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Swiss Games Garden</title>
        </Head>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_CH',
            site_name: 'Swiss Games Garden',
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {process.env.NODE_ENV !== 'production' &&
          <ReactQueryDevtools initialIsOpen />}
      </Hydrate>
    </QueryClientProvider>
  );
}
