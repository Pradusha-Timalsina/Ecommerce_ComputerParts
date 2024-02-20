import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { useDispatch, useSelector } from "react-redux";
import "./category.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";
import { clearErrors, createCategory } from "../../actions/categoryAction";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.createCategory
  );

  const [title, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      console.log("Category Created Successfully");
      navigate("/admin/categories");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, alert, navigate, error, success]);

  const productSummitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("title", title);
    formData.append("image", image);

    dispatch(createCategory(formData));
  };

  // const createProductImagesChange = (e) => {
  //   e.preventDefault();
  //   const files = e.target.files[0];
  //   setImage(files);
  // };
  const createProductImagesChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file); // Assuming you want to store the file object itself
    if (file) {
      setImagePreview(file.name); // Set image preview to the file name
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Fragment>
      <div className="grid_view_category">
        <Sidebar />
        <div className="categoryContainer">
          <h1 className="headingProd">Add Category</h1>
          <form
            className="categoryForm"
            encType="multipart/form-data"
            onSubmit={productSummitHandler}
          >
            <div>
              <SpellcheckIcon />
              <input
                placeholder="Category Name"
                type="text"
                value={title}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div id="categoryyy">
              {/* {imagePreview && (
                <div className="image-preview">
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Category Preview" />
                  </div>
                </div>
              )} */}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                id="categoryImage"
                onChange={createProductImagesChange}
              />
              <label htmlFor="categoryImage" className="custom-file-upload">
                Choose File
              </label>
              {imagePreview && <div>Selected file: {imagePreview}</div>}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Add
            </Button>
          </form>
        </div>
      </div>
      ;
    </Fragment>
  );
};

export default Category;
