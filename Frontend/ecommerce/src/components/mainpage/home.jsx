import React, { Fragment, useEffect } from "react";
import { Container } from "@mui/material";
import Heropage from "../homepage/HeroPage";
import ProductCard from "../products/ProductCard";
import "./home.css";
import { Link } from "react-router-dom";
import { getProductHome } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../layout/Loader/Loader";
import Promotions from "../homepage/Promotion";
import { styled } from "@mui/system";
import Category from "../homepage/Category";

const StyledContainer = styled(Container)`
  width: 100%;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products //redux ko state bata products fetch gareko
  );

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProductHome());
  }, [dispatch]);

  const styles = {
    container: {
      display: "flex",
      margin: "3vmax auto",
      width: "80vw",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: "100%",
    },

    h2: {
      textAlign: "center",
      fontFamily: "Roboto",
      fontSize: "1.4vmax",
      borderBottom: "1px solid",
      width: "20vmax",
      padding: "1vmax",
      margin: "5vmax auto",
      color: "rgb(0, 0, 0, 0.7)",
      marginTop: "10px",
      marginBottom: "20px",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.5rem 1.5rem",
      fontSize: "1.1rem",
      color: "#fff",
      backgroundColor: "#000000",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      margin: "0 auto",
      marginBottom: "10px",
    },
    categoryContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifContent: "space-between",
      gap: "20px",
      margin: "0 auto",
      maxWidth: "1200px",
    },
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Heropage />
          <Promotions />
          <StyledContainer>
            <h2 className="h2" style={styles.h2}>
              Categories
            </h2>
            <div
              className="home_container"
              id="container"
              style={styles.categoryContainer}
            >
              {categories &&
                categories.map((category) => (
                  <Category category={category} key={category._id} />
                ))}
            </div>
          </StyledContainer>
          <h2 className="h2">Products</h2>
          <div className="home_container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
          <Link to="/products/page" style={{ textDecoration: "none" }}>
            <button type="button" className="view_more">
              View more
            </button>
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
