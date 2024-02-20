import React from "react";
import appstore from "../images/appstore.png";
import playstore from "../images/playstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div class="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="appstore" />
      </div>

      <div class="midFooter">
        <h1>TECHTROVE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; MePradusha</p>
      </div>

      <div class="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/pradushathegreat">Instagram</a>
        <a href="http://instagram.com/pradushathegreat">Youtube</a>
        <a href="http://instagram.com/pradushathegreat">Facebook</a>
      </div>
    </footer>
  );
};
export default Footer;
