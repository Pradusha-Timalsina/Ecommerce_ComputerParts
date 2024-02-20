import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteCategory,
  getAllCategory,
} from "../../actions/categoryAction";
import { CATEGORY_DELETE_RESET } from "../../constants/categoryConstants";
import Sidebar from "./Sidebar";

export const CategoryList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, categories } = useSelector((state) => state.categories);

  const { error: deleteError, isDeleted } =
    useSelector((state) => state.category) || {};

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Category Deleted Successfully");
      navigate("/admin/categories");
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    dispatch(getAllCategory());
  }, [dispatch, alert, error, isDeleted, deleteError, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "S. N.",
      minWidth: 190,
      flex: 0.3,
    },
    {
      field: "title",
      headerName: "Category Name",
      minWidth: 350,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const categoryId = params.getValue(params.id, "categoryId");
        return (
          <Fragment>
            <Button onClick={() => deleteCategoryHandler(categoryId)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  let counter = 1;
  const rows = [];

  categories &&
    categories
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((cate) => {
        rows.push({
          id: counter++,
          title: cate.title,
          slug: cate.slug,
          categoryId: cate._id,
        });
      });

  return (
    <Fragment>
      <div className="grid_view_categories">
        <Sidebar />
        <div className="productcontainer">
          <h1 className="heading">All Categories</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="categoryTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
