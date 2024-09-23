import React from "react";
import "./Layout.scss";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Layout = () => {
  return (
    <div className="layout-cover">
      <div className="layout-container">
        <Sidebar />
        <div className="overview-container">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
