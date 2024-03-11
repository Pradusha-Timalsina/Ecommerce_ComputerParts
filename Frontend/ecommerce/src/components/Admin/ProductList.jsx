import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "./productList.css";
import { useEffect } from "react";
import { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

export const ProductList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

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
      // alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  // const deleteProductHandler = (id) => {
  //   dispatch(deleteProduct(id));
  // };

  const columns = [
    {
      field: "id",
      headerName: "S. N.",
      minWidth: 190,
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productId = params.getValue(params.id, "productId");
        return (
          <Fragment>
            <Link to={`/admin/product/${productId}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(productId)}>
              <DeleteIcon />
            </Button>

            <Link to={`/admin/stock/${productId}`}><AddBoxIcon /></Link>
          </Fragment>
        );
      },
    },
  ];

  let counter = 1;
  const rows = [];

  products &&
    products
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((prod) => {
        rows.push({
          id: counter++,
          stock: prod.stock,
          price: prod.price,
          name: prod.name,
          productId: prod._id,
        });
      });

  return (
    <Fragment>
      <div className="dashboard_product_list">
        <Sidebar />
        <div className="productcontainer">
          <h1 className="heading">All Products</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
