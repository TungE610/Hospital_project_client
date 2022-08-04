import React from "react";
import {Outlet} from "react-router-dom";
import styles from './Layout.module.css'
import Login from './login/Login'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};

export default Layout;