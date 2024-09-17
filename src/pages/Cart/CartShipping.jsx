import RadioGroup from "@/components/RadioGroup";
import { SHIPPING_OPTION } from "@/constant/general";
import { PATHS } from "@/constant/path";
import { formatCurrencyUs } from "@/utils/formatCurrency";
import React from "react";
import { Link } from "react-router-dom";

const CartShipping = ({ shipping, total, subTotal, handleUpdateShipping }) => {
  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>{formatCurrencyUs(subTotal)}</td>
            </tr>
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>
            <RadioGroup
              onChange={handleUpdateShipping}
              disabled
              defaultValue={
                shipping === null
                  ? "free"
                  : !!shipping?.typeShip
                  ? shipping?.typeShip
                  : ""
              }
            >
              {total > 0 &&
                SHIPPING_OPTION.map((option, index) => {
                  const { label, value, price } = option || {};

                  return (
                    <tr key={value || index} className="sumary-shipping-row">
                      <td>
                        <RadioGroup.Item value={value}>{label}</RadioGroup.Item>
                      </td>
                      <td>{formatCurrencyUs(price)}</td>
                    </tr>
                  );
                })}
            </RadioGroup>
            <tr className="summary-shipping-estimate">
              <td>
                Estimate for Your Country <br />
               <Link to={PATHS.PROFILE.PROFILE_ADDRESS} >Change your address</Link>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>{formatCurrencyUs(total)}</td>
            </tr>
          </tbody>
        </table>
        {subTotal > 0 ? (
          <Link
            to={PATHS.CHECKOUT}
            className="btn btn-outline-primary-2 btn-order btn-block"
          >
            PROCEED TO CHECKOUT
          </Link>
        ) : (
          <></>
        )}
      </div>
      <Link
        to={PATHS.PRODUCTS}
        className="btn btn-outline-dark-2 btn-block mb-3"
      >
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Link>
    </aside>
  );
};

export default CartShipping;
