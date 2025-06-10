import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

/**
 * 布局组件，包含顶部导航栏和侧边栏
 * @returns {JSX.Element} 布局组件
 */
function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout__content">
        <Sidebar />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout; 