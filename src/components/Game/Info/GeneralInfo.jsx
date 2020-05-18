import React from 'react';

const GeneralInfo = ({title, children}) => (
  <div className="game-info-item">
    <h3>{title}</h3>
    {children}
  </div>
);

export default GeneralInfo;
