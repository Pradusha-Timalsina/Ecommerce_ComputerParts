import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
} from "react-icons/bs";
import "./side.css";

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillArchiveFill /> Products
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGrid3X3GapFill /> Categories
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill /> Customers
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsListCheck /> Orders
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
