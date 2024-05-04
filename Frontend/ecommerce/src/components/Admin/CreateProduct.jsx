import React from "react";
import { Fragment, useState, useEffect } from "react";
import "./createproduct.css";
import { Button } from "@material-ui/core";
import Sidebar from "./Sidebar";
import StorageIcon from "@mui/icons-material/Storage";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import PaletteIcon from "@mui/icons-material/Palette";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import Alertbar from "../Alert/Alert";
const CreateProduct = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const { categories } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
      setMessage("Product Creates Successfully");
      setStatus("success");
      setOpen(true);
    }
  }, [dispatch, error, navigate, setMessage, setStatus, setOpen, success]);

  const productSummitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "" || !/\S/.test(name)) {
      setMessage("Name cannot be empty or contain only spaces.");
      setStatus("error");
      setOpen(true);
      return;
    }

    if (description.trim() === "" || !/\S/.test(name)) {
      setMessage("Description cannot be empty or contain only spaces.");
      setStatus("error");
      setOpen(true);
      return;
    }

    if (brand.trim() === "" || !/\S/.test(name)) {
      setMessage("Brand cannot be empty or contain only spaces.");
      setStatus("error");
      setOpen(true);
      return;
    }

    if (color.trim() === "" || !/\S/.test(name)) {
      setMessage("Color cannot be empty or contain only spaces.");
      setStatus("error");
      setOpen(true);
      return;
    }

    if (!category) {
      setMessage("Please select a category.");
      setStatus("error");
      setOpen(true);
      return false;
    }
    if (images.length === 0) {
      setMessage("Please select at least one image.");
      setStatus("error");
      setOpen(true);
      return false;
    }

    const newPrice = Number(price);
    if (newPrice <= -1) {
      setMessage("Price value must be a positive number.");
      setStatus("error");
      setOpen(true);
      return;
    } else if (newPrice <= 0) {
      setMessage("Price value must not be 0");
      setStatus("error");
      setOpen(true);
      return;
    }

    const newStock = Number(stock);
    if (newStock <= -1) {
      setMessage("Stock value must be a positive number.");
      setStatus("error");
      setOpen(true);
      return;
    } else if (newStock <= 0) {
      setMessage("Stock value must not be 0");
      setStatus("error");
      setOpen(true);
      return;
    } else {
      setMessage("Product Created Successfully");
      setStatus("success");
      setOpen(true);
    }

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price);
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.set("description", description);
    formData.set("category", category);
    formData.set("brand", brand);
    formData.set("color", color);
    formData.set("stock", stock);

    dispatch(createProduct(formData));
  };

  const productImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);
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
          <form
            className="newProductForm"
            encType="multipart/form-data"
            onSubmit={productSummitHandler}
          >
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => {
                  if (e.target.value.length > 100) {
                    alert.error("Product name cannot exceed 100 characters");
                  } else {
                    setName(e.target.value);
                  }
                }}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
                cols="30"
                rows="1"
              />
            </div>
            <div>
              <BrandingWatermarkIcon />
              <textarea
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Product Brand"
              />
            </div>
            <div>
              <PaletteIcon />
              <textarea
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Product Color"
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose Category</option>
                {categories &&
                  categories.map((option) => (
                    <option key={option._id} value={option.title}>
                      {option.title}
                    </option>
                  ))}
              </select>
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

            <label id="productformfile" htmlFor="fileInput">
              Select Image
              <input
                id="fileInput"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={productImageChange}
                multiple
              />
            </label>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
          <Alertbar
            message={message}
            status={status}
            open={open}
            handleClose={handleClose}
          />
        </div>
      </div>
      ;
    </Fragment>
  );
};

export default CreateProduct;
