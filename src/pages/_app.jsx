import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import {Hydrate} from 'react-query/hydration';
import 'styles/index.css';
import {ReactQueryDevtools} from 'react-query-devtools';
import 'locales/i18n';
import Layout from 'components/Layout';

const queryCache = new QueryCache();

export default function App({Component, pageProps}) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen />
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}
