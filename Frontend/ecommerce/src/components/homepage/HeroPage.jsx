import React from "react";
import "./heropage.css";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const Heropage = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop={true}
      effect={"slide"}
      sx={{ display: "flex" }}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="Hero-container">
          <div className="first-half">
            <h1>Nvidia RTX 2080</h1>
            <p>For better gaming experience</p>
            <Link to="/products/page" style={{ textDecoration: "none" }}>
              <button type="submit">Shop More</button>
            </Link>
          </div>
          <div className="second-half">
            <img src="https://images.nvidia.com/aem-dam/Solutions/geforce/news/geforce-rtx-graphics-cards/geforce-rtx-2080-technical-photography-angled-003.png" />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="Hero-container">
          <div className="first-half">
            <h1>Intel I9 13th gen</h1>
            <p>For better gaming experience</p>
            <Link to="/products/page" style={{ textDecoration: "none" }}>
              <button type="submit">Shop More</button>
            </Link>
          </div>
          <div className="second-half">
            <img src="https://itechstore.com.np/_ipx/w_1536&f_png/img/product/ff197841-b7ab-4aab-9cd2-a1276ef42f13/13th-gen-intel-core-i9-13900k-desktop-processor.png" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Heropage;
