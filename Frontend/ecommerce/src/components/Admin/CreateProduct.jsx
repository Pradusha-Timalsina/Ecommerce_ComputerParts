import React, { Fragment } from "react";
import "./createproduct.css";
import { Button } from "@material-ui/core";
import StorageIcon from "@mui/icons-material/Storage";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "./Sidebar";

const CreateProduct = () => {
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
              <input type="number" placeholder="Stock" required />
            </div>

            <div id="productformfile">
              <input type="file" name="avatar" accept="image/*" multiple />
            </div>

            {/* <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> */}

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
