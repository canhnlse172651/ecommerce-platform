import React from "react";
import { formatCurrencyUs } from "@/utils/formatCurrency";
import { Link } from "react-router-dom";
import RatingComp from "@/components/Rating";
import { PATHS } from "@/constant/path";

const ProductCart = ({name, price, rating, slug, id, images, detailPath}) => {
  return (
    <div className="product product-2">
      <figure className="product-media">
        <Link to={detailPath}>
          <img src={images[0]} alt="Product image" className="product-image" />
        </Link>
        <div className="product-action-vertical">
          <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a href="#" className="btn-product btn-cart" title="Add to cart">
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={PATHS.PRODUCT_DETAIL}>{name}</Link>
        </h3>
        <div className="product-price">{formatCurrencyUs(price)}</div>
        <div className="ratings-container">
          <RatingComp rating={rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
