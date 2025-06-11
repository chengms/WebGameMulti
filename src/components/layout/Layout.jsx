import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

/**
 * 布局组件，包含顶部导航栏和侧边栏
 * @param {Object} props 组件属性
 * @param {React.ReactNode} props.children 子组件
 * @returns {JSX.Element} 布局组件
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