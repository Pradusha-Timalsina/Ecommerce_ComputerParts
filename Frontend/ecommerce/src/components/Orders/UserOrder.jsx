import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./userOrder.css";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const UserOrder = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelOrder = () => {
    setOpenDialog(true);
  };

  const handleConfirmCancel = () => {
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Product Name",
      type: "text",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      type: "text",
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.7,
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // const orderId = params.getValue(params.id, 'id');
        // const orderStatus = params.getValue(params.id, 'status');

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/myorder/details`}>
              <LaunchIcon />
            </Link>

            <Fragment>
              <IconButton onClick={handleCancelOrder}>
                <CancelIcon />
              </IconButton>
              <Dialog open={openDialog} onClose={handleCancel}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to cancel this order?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button
                    //   onClick={() => handleConfirmCancel(orderId)}
                    color="primary"
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          </div>
        );
      },
    },
  ];
  const rows = [];

  //   myorders &&
  //     myorders
  //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //       .forEach((item, index) => {
  //         const itemNames = item.orderItems.map((orderItem) => orderItem.name);
  //         const nameString = itemNames.join(', ');
  //         rows.push({
  //           itemsQty: item.orderItems.length,
  //           id: item._id,
  //           name: nameString,
  //           status: item.orderStatus,
  //           amount: item.totalPrice,
  //         });
  //       });

  //   useEffect(() => {
  //     if (error) {

  //       dispatch(errorClear());
  //     }

  //     dispatch(myOrders());
  //   }, [dispatch, alert, error]);

  return (
    <Fragment>
      <div className="userOrderContainer">
        {/* <h1 className="orderHead">My Orders</h1> */}

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="userOrdersTable"
          autoHeight
          autoWidth
        />
      </div>
    </Fragment>
  );
};

export default UserOrder;
