import { formatCurrencyUs } from "@/utils/formatCurrency";
import { Empty } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "@/constant/path";

import { message, Modal } from "antd";

const CartTable = ({
  products,
  handleRemoveProduct,
  handleUpdateQuantity,
  keepRef
}) => {
  const { confirm } = Modal;

  const _onRemoveClick = (e, removeIndex) => {
    e?.preventDefault();
    e?.stopPropagation();
    const removeProduct = products?.[removeIndex] || {};

    confirm({
      title: "Do you want remove this product",
      content: (
        <>
          <p>{`${removeProduct?.name || ""}`}</p>
          <p>{`${removeProduct?.quantity || 0}  x ${formatCurrencyUs(
            removeProduct.price
          )}`}</p>
        </>
      ),
      onOk() {
        if (removeIndex > -1) {
          handleRemoveProduct(removeIndex);
        }
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const _onChangeQuantity = (e, updateIndex) => {
    e?.preventDefault();
    e?.stopPropagation();
    const value = e.target.value;
    handleUpdateQuantity(value, updateIndex);
  };


  return (
    <div className="col-lg-9">
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th> Discount </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products?.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{ textAlign: "center", padding: "20px 0" }}
              >
                <Empty
                  description="No item on your cart"
                  style={{ margin: "0 auto" }}
                />
              </td>
            </tr>
          ) : (
            products?.map((item, index) => {
              const {
                name,
                price,
                variant,
                totalProduct,
                images,
                discount,
                slug,
                id,
                quantity
              } = item;
              const detailPath = PATHS.PRODUCTS + `/${slug}`;
              let imagePath = images?.[0];
              // Tìm vị trí của "https://" cuối cùng trong chuỗi
              const lastOccurrence = imagePath?.lastIndexOf("https://");
              // Lấy URL từ vị trí "https://" cuối cùng
              if (lastOccurrence > -1) {
                imagePath = imagePath.substring(lastOccurrence);
              }
              return (
                <tr>
                  <td className="product-col" key={index + Math.random()}>
                    <div className="product">
                      <figure className="product-media">
                        <Link to={detailPath}>
                          <img src={imagePath} alt="Product image" />
                        </Link>
                      </figure>
                      <h3 className="product-title">
                        <Link to={detailPath}>{name}</Link>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span
                            style={{ marginRight: "10px", marginTop: "5px" }}
                          >
                            Color :{" "}
                          </span>
                          <span
                            className="product-nav-item active"
                            style={{
                              background: variant,
                              cursor: "pointer",
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              border: "1px solid #ccc",
                              display: "block",
                              marginTop: "5px",
                            }}
                          ></span>
                        </div>
                      </h3>
                    </div>
                  </td>

                  <td className="price-col">{formatCurrencyUs(price)}</td>
                  <td className="quantity-col">
                    <div className="cart-product-quantity">
                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        max={100}
                        step={1}
                        data-decimals={0}
                        required
                        style={{
                          height: "30px",
                          maxWidth: "70%",
                          textAlign: "center",
                          padding: "5px",
                        }}
                        value={keepRef.current?.[id]?.value || quantity}
                        ref={(thisRef) => {
                          keepRef.current[id] = thisRef
                        }}
                        onChange={(e) => { 
                          _onChangeQuantity(e,index);
                        }}
                      />
                    </div>
                  </td>

                  <td className="price-col">{formatCurrencyUs(discount)}</td>
                  <td className="total-col">
                    {formatCurrencyUs(totalProduct)}
                  </td>
                  <td className="remove-col">
                    <button
                      className="btn-remove"
                      onClick={(e) =>{
                        _onRemoveClick(e, index);
                      }}
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
