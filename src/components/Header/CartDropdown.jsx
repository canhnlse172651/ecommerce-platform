import { PATHS } from "@/constant/path";
import { formatCurrencyUs } from "@/utils/formatCurrency";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CartDropdown = ({ products, total, shipping, handleRemoveProduct }) => {
  const DropdownContainer = styled.div`
    max-height: 200px; /* Giảm chiều cao để dễ kiểm tra */
    overflow-y: scroll;
    background-color: lightgray;

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 10px;
      border: 2px solid #f1f1f1;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    /* Đối với Firefox */
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  `;

  return (
    <div className="dropdown cart-dropdown">
      <a
        href="#"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <i className="icon-shopping-cart" />
        <span className="cart-count">{products?.length}</span>
      </a>
      <div className="dropdown-menu dropdown-menu-right" style={{ width: 350 }}>
        {products?.length > 0 ? (
          <>
            <DropdownContainer className="dropdown-cart-products">
              {products?.map((item, index) => {
                const { id, images, name, price, slug, quantity, variant } =
                  item || {};
                const detailPath = PATHS.PRODUCTS + `/${slug}`;
                let imagePath = images?.[0];

                console.log("images", images);
                if (imagePath?.split("https")?.length > 2) {
                  imagePath = imagePath?.split("http");
                  imagePath = "https" + imagePath[2];
                }
                return (
                  <>
                    <div className="product" key={id || index}>
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <Link to={detailPath}>{name}</Link>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">{quantity}</span> x{" "}
                          {formatCurrencyUs(price)}
                        </span>
                        <div style={{ display: "flex", alignItems: "center" }}  >
                            <span style={{marginRight:"10px"}} >Color : </span>
                            <span
                          className="product-nav-item active"
                          style={{
                            background: variant, 
                            cursor: "pointer",
                            width: "18px", 
                            height: "18px", 
                            borderRadius: "50%", 
                            border: "1px solid #ccc", 
                            display:"block"
                          }}
                        ></span>
                        </div>
                      </div>
                      <figure className="product-image-container">
                        <Link to={detailPath} className="product-image">
                          <img src={imagePath || ""} alt="product" />
                        </Link>
                      </figure>
                      <a href="#" className="btn-remove" title="Remove Product">
                        <i className="icon-close" />
                      </a>
                    </div>
                  </>
                );
              })}
            </DropdownContainer>
            <div className="dropdown-cart-total">
              <span>Total</span>
              <span className="cart-total-price">
                {formatCurrencyUs(total)}
              </span>
            </div>
            <div className="dropdown-cart-action">
              <a href="cart.html" className="btn btn-primary">
                View Cart
              </a>
              <a href="checkout.html" className="btn btn-outline-primary-2">
                <span>Checkout</span>
                <i className="icon-long-arrow-right" />
              </a>
            </div>
          </>
        ) : (
          <>
            <p>There are no any product in cart</p>
            <Link to={PATHS.PRODUCTS}>Go To Shop</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
