import { PATHS } from "@/constant/path";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCart from "@/components/ProductCart";
const TAB = [
  {
    label: "Featured",
    value: { featured: true },
  },
  {
    label: "On Sale",
    value: { onSale: true },
  },
  {
    label: "Top Rated",
    value: { topRated: true },
  },
];

const Featured = ({ handleTabChange, listTopProduct, queryObject,handleAddToCart }) => {
  const onChangeTab = (tab) => {
    handleTabChange?.(tab);
  };

  return (
    <div className="container featured">
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        {TAB.map((item, index) => {
          return (
            <li className="nav-item" key={index}>
              <a
                className={`nav-link ${
                  Object.keys(item.value).every(
                    (key) => queryObject[key] === String(item.value[key])
                  )
                    ? "active"
                    : ""
                }`}
                id="products-featured-link"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChangeTab(item.value);
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="gellery-tab">
        <Swiper
          modules={[Autoplay]} // import modules here
          spaceBetween={5}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={3000} // transition scroll (800ms)
          // navigation // using navigation
        >
          {listTopProduct?.map((product, index) => {
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
  );
};

export default Featured;
