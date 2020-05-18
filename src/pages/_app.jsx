import React from 'react';

import '../styles/base.scss';

export default function App({Component, pageProps}) {
  return <Component {...pageProps} />;
}
