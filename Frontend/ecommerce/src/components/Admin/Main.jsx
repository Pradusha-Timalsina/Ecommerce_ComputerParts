import React, { useState, Fragment } from "react";
import "./main.css";
import Sidebar from "./Sidebar";
import Navbar from "../homepage/Navbar";
import Dashboard from "./Dashboard";

export const Main = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Fragment>
      <div className="grid-container">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Dashboard />
      </div>
    </Fragment>
  );
};
