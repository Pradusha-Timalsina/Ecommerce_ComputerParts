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
import { TreeView, TreeItem } from "@material-ui/lab";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";

import { Link } from "react-router-dom";
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
          <Link to="/admin/dashboard">
            <BsGrid1X2Fill /> Dashboard
          </Link>
        </li>
        {/* <li className="sidebar-list-item">
          <a href="">
            <BsFillArchiveFill /> Products
          </a>
        </li> */}

        <div className="treeViewContainer">
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
            className="treeView"
          >
            <TreeItem
              nodeId="1"
              label="Products"
              classes={{ label: "treeItemLabel" }}
            >
              <Link
                to="/admin/products"
                className="treeItemLink"
                style={{ textDecoration: "none" }}
              >
                <TreeItem
                  nodeId="2"
                  label="All Products"
                  icon={<PostAddIcon />}
                  classes={{
                    label: "treeItemLabel",
                    content: "treeItemContent",
                  }}
                />
              </Link>

              <Link
                to="/admin/create/product"
                className="treeItemLink"
                style={{ textDecoration: "none" }}
              >
                <TreeItem
                  nodeId="3"
                  label="Create Product"
                  icon={<AddIcon />}
                  classes={{
                    label: "treeItemLabel",
                    content: "treeItemContent",
                  }}
                />
              </Link>
            </TreeItem>
          </TreeView>
        </div>

        <li className="sidebar-list-item">
          <Link to="/admin/categories">
            <BsFillGrid3X3GapFill /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/users">
            <BsPeopleFill /> Customers
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/orders">
            <BsListCheck /> Orders
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
