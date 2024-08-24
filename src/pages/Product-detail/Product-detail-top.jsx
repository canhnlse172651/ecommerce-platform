import { formatCurrencyUs } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import ParseHtml from "@/components/ParseHtml";
import RatingComp from "@/components/Rating";
import { Link } from "react-router-dom";
import { PATHS } from "@/constant/path";
import ShareLink from "@/components/ShareLink";
import { Empty, message } from "antd";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { localToken } from "@/utils/token";

const ProductDetailTop = ({
  category,
  stock,
  images,
  name,
  price,
  color,
  description,
  rating,
  productDetailLoading,
  handleAddToCart,
  selectedColor,
  setSelectedColor,
  quantityRef,
}) => {
  const [mainImage, setMainImage] = useState(images?.[0]);

  const pathUrl = window.location.href;

  const _onChangeMainImage = (image) => {
    setMainImage(image);
  };

  const _onColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <div className="product-gallery product-gallery-vertical">
            <div className="row">
              <figure className="product-main-image">
                <Zoom >
                  <img
                    id="product-zoom"
                    src={mainImage || images?.[0]}
                    alt="product image"
                    width="500"
                    style={{ width: "100%" }}
                  />
                </Zoom>
              </figure>
              <div id="product-zoom-gallery" className="product-image-gallery">
                {images?.length === 0 ? (
                  <Empty description="Not Found Any Image" />
                ) : (
                  images?.map((image, index) => {
                    return (
                      <a
                        className={`product-gallery-item ${
                          image === mainImage ? "active" : ""
                        }`}
                        href="#"
                        data-image="assets/images/products/single/1.jpg"
                        data-zoom-image="assets/images/products/single/1-big.jpg"
                        key={index}
                        onClick={(e) => _onChangeMainImage(image)}
                      >
                        <img src={image} alt="Dark yellow lace" />
                      </a>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
            <div className="ratings-container">
              <RatingComp rating={rating} />
            </div>
            <div className="product-price"> {formatCurrencyUs(price)}</div>
            <div className="product-content">
              <ParseHtml htmlString={description} />
            </div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <div className="product-nav product-nav-dots">
                {color?.map((color) => {
                  return (
                    <div
                      className={`product-nav-item active`}
                      style={{
                        background: color,
                        border:
                          selectedColor === color
                            ? "1px solid #fcb941"
                            : "none",
                        cursor: "pointer",
                      }}
                      key={color}
                      onClick={(e) => _onColorChange(color)}
                    >
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Quantity:</label>
              <div
                className="product-details-quantity"
                style={{ marginLeft: "10px" }}
              >
                <input
                  style={{ display: "block" }}
                  type="number"
                  id="qty"
                  className="form-control"
                  defaultValue={1}
                  min={1}
                  max={stock}
                  step={1}
                  data-decimals={0}
                  required
                  ref={quantityRef}
                  onInput={(e) => {
                    if (e.target.value > stock) {
                      message.error("Quantity Exceeds Stock");
                      e.target.value = stock > 0 ? stock : 1;
                    } else if (e.target.value < 1) {
                      e.target.value = 1;
                    }
                  }}
                />
              </div>
            </div>
            <div className="product-details-action">
              <a className="btn-product btn-cart" onClick={handleAddToCart}  >
                <span style={{cursor:"pointer"}} >add to cart</span>
              </a>
              <div className="details-action-wrapper">
                <a
                  href="#"
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                >
                  <span style={{cursor:"pointer"}}>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category: </span>
                <Link
                  to={
                    category?.id && PATHS.PRODUCTS + `?category=${category?.id}`
                  }
                  style={{ color: "black" }}
                >
                  {" "}
                  {category?.name}
                </Link>
              </div>
              <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>

                <ShareLink title="facebook" path={pathUrl}>
                  {" "}
                  <i className="icon-facebook-f" />
                </ShareLink>

                <ShareLink title="twitter" path={pathUrl}>
                  {" "}
                  <i className="icon-twitter" />
                </ShareLink>

                <ShareLink title="instagram" path={pathUrl}>
                  {" "}
                  <i className="icon-instagram" />
                </ShareLink>

                <ShareLink title="pinterest" path={pathUrl}>
                  {" "}
                  <i className="icon-pinterest" />
                </ShareLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTop;
