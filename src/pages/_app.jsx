import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import {Hydrate} from 'react-query/hydration';
import 'styles/index.css';
import {ReactQueryDevtools} from 'react-query-devtools';
import 'locales/i18n';
import Layout from 'components/Layout';
import * as Sentry from '@sentry/node';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    // enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

const queryCache = new QueryCache();

export default function App({Component, pageProps, err}) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} err={err} />
        </Layout>
        <ReactQueryDevtools initialIsOpen />
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}
