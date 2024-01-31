import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./orderlist.css";

import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

import EditIcon from "@mui/icons-material/Edit";

export const OrderList = () => {
  const columns = [
    // { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 0.3 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.2,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greennColor"
          : "reddColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link>
              <EditIcon />
            </Link>

            {/* <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button> */}
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  return (
    <Fragment>
      <div className="dashboard_order_list">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
