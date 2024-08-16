import { PATHS } from "@/constant/path";
import { formatCurrencyUs } from "@/utils/formatCurrency";
import { Link } from "react-router-dom";
import RatingComp from "@/components/Rating";
import { Empty } from "antd";
import ComponentLoading from "@/components/ComponentLoading";
import useDebounce from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
const ProductList = ({ isLoading, isError, productsList }) => {

const [delayedLoading, setDelayedLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setDelayedLoading(isLoading);
  }, 200); 

  return () => clearTimeout(timer); // Clear timeout khi component unmount
}, [isLoading]);
 
  return (
    <div className="products mb-3">
      {delayedLoading && <ComponentLoading/>}
      <div className="row justify-content-center">
        {productsList.length === 0 && !isLoading ? (
          <Empty description="Not Found Any Product" />
        ) : (
          productsList?.map((product, index) => {
            const { name, price, rating, slug, id, images } = product;
            const detailPath = PATHS.PRODUCTS + `/:${slug}`
            return (
              <div className="col-6 col-md-4 col-lg-4" key={id || index}>
                <div className="product product-2">
                  <figure className="product-media">
                    <Link to={detailPath}>
                      <img
                        src={images[0]}
                        alt="Product image"
                        className="product-image"
                      />
                    </Link>
                    <div className="product-action-vertical">
                      <a
                        href="#"
                        className="btn-product-icon btn-wishlist btn-expandable"
                      >
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                    </div>
                  </figure>
                  <div className="product-body">
                    <h3 className="product-title">
                      <Link to={PATHS.PRODUCT_DETAIL}>{name}</Link>
                    </h3>
                    <div className="product-price">
                      {formatCurrencyUs(price)}
                    </div>
                    <div className="ratings-container">
                      <RatingComp rating={rating} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductList;
