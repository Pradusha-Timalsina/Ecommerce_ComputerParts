import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./orderlist.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { getAllOrders, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
export const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  // const deleteOrderHandler = (id) => {
  //   dispatch(deleteOrder(id));
  // };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      // alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.3 },

    { field: "name", headerName: "Product Name", minWidth: 300, flex: 0.4 },

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
      flex: 0,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 150,
      flex: 0,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0,
    },
    {
      field: "date",
      headerName: "Date",
      type: "number",
      minWidth: 270,
      flex: 0,
    },

    {
      field: "actions",
      flex: 0,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
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

  orders &&
    orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((item) => {
        // Convert timestamp to Date object
        const dateObj = new Date(item.createdAt);
        // Extract only the date part
        const dateOnly = dateObj.toISOString().split("T")[0];

        // Extract names from orderItems
        const itemNames = item.orderItems
          .map((orderItem) => orderItem.name)
          .join(", ");

        rows.push({
          id: item._id,
          name: itemNames, // Use the extracted names
          itemsQty: item.orderItems.length,
          user: item.shippingInfo.FullName,
          date: dateOnly,
          amount: item.totalPrice,
          status: item.orderStatus,
        });
      });

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
