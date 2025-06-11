import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

/**
 * Layout component with header and sidebar
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components
 * @returns {JSX.Element} Layout component
 */
function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout__content">
        <Sidebar />
        <main className="layout__main">
          {children}
        </main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout; 