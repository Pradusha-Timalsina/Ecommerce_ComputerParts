import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeOneCompare } from "../../../Redux/compareProductSlice";
import React, { useEffect, useState } from "react";
import "./comparecard.css";

const CompareCard = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const [description, setDescription] = useState("");

  const handleRemove = () => {};

  //   useEffect(() => {
  //     const textContent = document.createElement("div");
  //     textContent.innerHTML = data.description;
  //     const plainText = textContent.innerText;
  //     setDescription(plainText);
  //   }, [data]);

  return (
    <div className="compare-card-container">
      <div className="image-container">
        <img
          className="image"
          //   onClick={() => navigate(`/product/${data._id}`)}
          //   src={data.images[0]?.url}
          alt="Product"
        />
      </div>
      <h3 className="title">title</h3>
      <div className="product-info-container">
        <div className="info">
          {" "}
          Price <span className="value"> RS 2000</span>
        </div>
        <div className="info">
          {" "}
          InStock <span className="value">quantity</span>
        </div>
        <div className="info">
          {" "}
          Brand <span className="value">brand</span>
        </div>
        <div className="info">
          {" "}
          Sales <span className="value">sold</span>
        </div>
        <div className="info">
          {" "}
          Rating <span className="value">ratings</span>
        </div>
      </div>
      <div className="product-desc-container">
        <div className="info">Description</div>
        <div className="desc">LOL</div>
      </div>
      <button className="delete-btn">REMOVE</button>
    </div>
  );
};

export default CompareCard;
