import React, { Component, Fragment } from "react";

import DetailsThumb from "../Utils/DetailsThumb";
import "./productdetails.css";
import Navbar from "../homepage/Navbar";

class ProductDetails extends Component {
  state = {
    products: [
      {
        _id: "1",
        title: "KeyBoard",
        src: [
          "https://images.unsplash.com/photo-1555532538-dcdbd01d373d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1928&q=80",
          "https://images.pexels.com/photos/1714205/pexels-photo-1714205.jpeg?cs=srgb&dl=pexels-josh-sorenson-1714205.jpg&fm=jpg",
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
          "https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        ],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        price: 23,

        count: 1,
      },
    ],
    index: 0,
  };

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  componentDidMount() {
    const { index } = this.state;
    this.myRef.current.children[index].className = "active";
  }

  render() {
    const { products, index } = this.state;
    return (
      <Fragment>
        <Navbar />
        <div className="app">
          {products.map((item) => (
            <div className="details" key={item._id}>
              <div className="big-img">
                <img src={item.src[index]} alt="" />
              </div>

              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                  <span>Rs.{item.price}</span>
                </div>

                <p>{item.description}</p>
                <p>{item.content}</p>

                <DetailsThumb
                  images={item.src}
                  tab={this.handleTab}
                  myRef={this.myRef}
                />

                <div className="increase_button">
                  <div className="add_and_Delete">
                    <button>-</button>
                    <input type="number" value="1" readOnly />
                    <button>+</button>
                  </div>
                </div>

                <button className="cart">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default ProductDetails;
