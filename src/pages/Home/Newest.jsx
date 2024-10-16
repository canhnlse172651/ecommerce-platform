import { PATHS } from "@/constant/path";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCart from "@/components/ProductCart";
import { Navigation } from "swiper/modules"; 

import React from "react";

const Newest = ({ newestProducts }) => {
  return (
    <div className="container">
      <div className="heading">
        <div className="heading-left">
          <h2 className="title">Newest Products</h2>
        </div>
        <div style={{marginTop:"30px"}} >
          <Swiper
          modules={[Navigation]} // import modules here
            spaceBetween={5}
            slidesPerView={4}
            pagination={{ clickable: true }}
            speed={2000} // transition scroll (800ms)
            navigation
          >
            {newestProducts?.map((product, index) => {
              const { slug } = product || {};
              const detailPath = PATHS.PRODUCTS + `/${slug}`;

              return (
                <SwiperSlide style={{ gap: "50px" }} key={index}>
                  <ProductCart {...product} detailPath={detailPath} homeStyle />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Newest;
