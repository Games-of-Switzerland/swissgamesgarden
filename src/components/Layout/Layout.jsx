import React from 'react';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';

const Layout = props => (
  <div className="max-w-screen-xl mx-auto p-4">
    <Header />
    {props.children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
