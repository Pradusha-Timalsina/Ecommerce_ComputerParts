import React, { Fragment, useEffect, useState } from "react";
import "./createproduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { Button } from "@material-ui/core";
import StorageIcon from "@mui/icons-material/Storage";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Keyboard",
    "Mouse",
    "Headphone",
    "Hard drive",
    "Monitor",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="grid-view">
        <Sidebar />

        <div className="newProductContainer">
          <h1 className="headingProd">Create Product</h1>
          <form className="newProductForm" encType="multipart/form-data">
            <div>
              <SpellcheckIcon />
              <input type="text" placeholder="Product Name" />
            </div>
            <div>
              <AttachMoneyIcon />
              <input type="number" placeholder="Price" required />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                type="number"
                placeholder="Product Description"
                cols="30"
                rows="1"
              />
            </div>
            <div>
              <AccountTreeIcon />
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="productformfile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button id="createProductBtn" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
      ;
    </Fragment>
  );
};

export default CreateProduct;
