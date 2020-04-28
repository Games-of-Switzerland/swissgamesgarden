import React from 'react';
import {HitsStats} from 'searchkit';

// The search stats.
const Stats = ({hitsCount}) => (
  <p className="mb-spacer lead" data-qa="hits-stats">
    <strong data-qa="info">{hitsCount} games</strong>
  </p>
);

export default () => <HitsStats component={Stats} />;
