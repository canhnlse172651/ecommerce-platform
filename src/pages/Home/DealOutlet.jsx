import { PATHS } from "@/constant/path";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCart from "@/components/ProductCart";

import React from "react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { formatCurrencyUs } from "@/utils/formatCurrency";

const DealOutlet = ({listDealProduct}) => {

   

    // Tìm sản phẩm có discount lớn nhất
const productWithMaxDiscount = listDealProduct?.reduce((max, product) => {
    return product.discount > max.discount ? product : max;
  }, listDealProduct[0]); // Khởi tạo với sản phẩm đầu tiên

  const { 
    name,
    price,
   
    slug,
   
    images,
    discount,
    
} = productWithMaxDiscount || {}
  
let imagePath = images?.[0];
// Tìm vị trí của "https://" cuối cùng trong chuỗi
const lastOccurrence = imagePath?.lastIndexOf("https://");
// Lấy URL từ vị trí "https://" cuối cùng
if (lastOccurrence > -1) {
  imagePath = imagePath.substring(lastOccurrence);
}
  const detailPath = PATHS.PRODUCTS + `/${slug}`;
  
  return (
    <div className="bg-light deal-container pt-7 pb-7 mb-5">
      <div className="container">
        <div className="heading text-center mb-4">
          <h2 className="title">Deals &amp; Outlet</h2>
          <p className="title-desc">Today’s deal and more</p>
        </div>
        <div className="row">
          <div className="col-lg-6 deal-col">
            <div
              className="deal"
              style={{
                backgroundImage:
                `url(${imagePath})`,
                backgroundSize: 'contain', // Đặt kích thước để hình ảnh vừa vặn
                backgroundRepeat: 'no-repeat', // Ngăn không cho hình ảnh lặp lại
                backgroundPosition: 'right', // Đặt hình ảnh ở giữa
              
               
              }}
            >
              <div className="deal-top">
                <h2>Deal of the Day.</h2>
                <h4>The big deal </h4>
              </div>
              <div className="deal-content">
                <h3 className="product-title">
                  <Link to={detailPath}>
                   {name}
                  </Link>
                </h3>
                <div className="product-price">
                  
                  <div style={{marginRight:"20px"}} className="old-price">Was {formatCurrencyUs(price)}</div>
                  <div className="new-price">Now {formatCurrencyUs(price - discount)}</div>
                </div>
                <Link to={PATHS.PRODUCTS} className="btn btn-link">
                  <span>Shop Now</span>
                  <i className="icon-long-arrow-right" />
                </Link>
              </div>
              <div className="deal-bottom">
                <div className="deal-countdown" data-until="+10h" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="products">
              <div className="row">
                <Swiper
                  modules={[Navigation]} // import modules here
                  spaceBetween={5}
                  slidesPerView={2}
                  pagination={{ clickable: true }}
                  
                  loop={true}
                  speed={3000} // transition scroll (800ms)
                  navigation // using navigation
                >
                  {listDealProduct?.map((product, index) => {
                    const { slug } = product || {};
                    const detailPath = PATHS.PRODUCTS + `/${slug}`;

                    return (
                      <SwiperSlide style={{ gap: "50px" }} key={index}>
                        <ProductCart
                          {...product}
                          detailPath={detailPath}
                          homeStyle
                          deal
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="more-container text-center mt-3 mb-0">
          <Link to={PATHS.PRODUCTS} className="btn btn-outline-dark-2 btn-round btn-more">
            <span>Shop more</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealOutlet;
