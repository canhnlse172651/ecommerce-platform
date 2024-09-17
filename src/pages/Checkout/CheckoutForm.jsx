import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";
import { MESSAGE, REGEX } from "@/constant/validate";
import { Select } from "antd";
import removeVietnameseAccent from "@/utils/removeAccent";
import useAddress from "@/hooks/useAddress";
import { formatCurrencyUs } from "@/utils/formatCurrency";
import { PATHS } from "@/constant/path";
import { Link } from "react-router-dom";

const CheckoutForm = ({ handleCheckout }) => {
  const { profile } = useSelector((state) => state.auth);
  const { cartInfor, cartLoading } = useSelector((state) => state.cart);

  const { firstName, phone, district, province, ward, street, email } =
    profile || {};
  const {
    product,
    subTotal,
    shipping,
    total,
    quantity,
    variant,
    totalProduct,
    discount,
    discountCode,
  } = cartInfor || {};
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const renderProductProps =
    product?.map((item, index) => {
      return {
        ...item,
        quantity: quantity?.[index],
        variant: variant?.[index],
        totalProduct: totalProduct?.[index],
      };
    }) || [];

  const {
    provinceId,
    districtId,
    wardId,
    provinces,
    districts,
    wards,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
  } = useAddress();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      firstName,
      phone,
      district,
      province,
      ward,
      street,
      email,
    },
  });

  useEffect(() => {
    if (!profile) return;

    reset?.({
      firstName,
      phone,
      district,
      province,
      ward,
      street,
      email,
    });
    handleProvinceChange(province),
      handleDistrictChange(district),
      handleWardChange(ward);
  }, [profile]);

  const _onProvinceChange = (value, option) => {
    handleProvinceChange?.(value);
  };

  const _onDistrictChange = (value, option) => {
    handleDistrictChange?.(value);
  };

  const _onWardChange = (value, option) => {
    handleWardChange(value);
  };

  const _onSubmit = (data) => {
    const formInfo = {
      ...data,
      province: provinces.find((item) => item.value === provinceId),
      district: districts.find((item) => item.value === districtId),
      ward: wards.find((item) => item.value === wardId),
      paymentMethod,
      cartInfor,
    };

    handleCheckout?.({
      formInfo: {
        ...data,
        province: provinces.find((item) => item.value === provinceId),
        district: districts.find((item) => item.value === districtId),
        ward: wards.find((item) => item.value === wardId),
        paymentMethod,
      },
      cartInfor,
    });
  };
  const _onError = (errors) => {
    console.log("🚀 Validation Errors---->", errors); // validation error
  };
  return (
    <form
      action="#"
      className="checkout-form"
      onSubmit={handleSubmit(_onSubmit, _onError)}
    >
      <div className="row">
        <div className="col-lg-9">
          <h2 className="checkout-title">Billing Details</h2>
          <div className="row">
            <div className="col-sm-4">
              <Input
                label="Your Full Name"
                required
                {...register("firstName", {
                  required: MESSAGE.required,
                })}
                error={errors?.firstName?.message || ""}
              />
            </div>
            <div className="col-sm-4">
              <Input
                label="Your number phones"
                required
                {...register("phone", {
                  required: MESSAGE.required,
                  pattern: {
                    value: REGEX.phone,
                    message: MESSAGE.phone,
                  },
                })}
                error={errors?.phone?.message || ""}
              />
            </div>
            <div className="col-sm-4">
              <Input
                label="Your email address"
                required
                {...register("email", {
                  validate: {
                    required: (value) => value !== "" || MESSAGE.required, // Kiểm tra required trước
                    validEmail: (value) =>
                      value === "" || REGEX.email.test(value) || MESSAGE.email, // Nếu không rỗng, kiểm tra pattern
                  },
                })}
                error={errors?.email?.message || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <Controller
                name="province"
                control={control}
                rules={{
                  required: MESSAGE.required,
                }}
                render={({ field, formState: { errors } }) => {
                  return (
                    <>
                      <label>Province/City *</label>
                      <Select
                        className="customSelect"
                        suffixIcon={<></>}
                        showSearch
                        value={provinceId}
                        placeholder="Select a Province/City"
                        optionFilterProp="children"
                        onChange={(value) => {
                          field.onChange(value); // Cập nhật giá trị vào form
                          _onProvinceChange(value); // Thay đổi giá trị province
                        }}
                        filterOption={(input, option) => {
                          return removeVietnameseAccent(option?.label ?? "")
                            .toLowerCase()
                            .includes(
                              removeVietnameseAccent(input).toLowerCase()
                            );
                        }}
                        options={provinces}
                      />
                      <p
                        className="form-error"
                        style={{ minHeight: 23, marginTop: "10px" }}
                      >
                        {" "}
                        {errors?.province?.message}{" "}
                      </p>
                    </>
                  );
                }}
              />
            </div>
            <div className="col-sm-4">
              <Controller
                name="district"
                control={control}
                rules={{
                  required: MESSAGE.required,
                }}
                render={({ field, formState: { errors } }) => {
                  return (
                    <>
                      <label>District/Town*</label>
                      <Select
                        className="customSelect"
                        suffixIcon={<></>}
                        showSearch
                        placeholder="Select a District/Town"
                        optionFilterProp="children"
                        onChange={(value) => {
                          field.onChange(value); // Cập nhật giá trị vào form
                          _onDistrictChange(value); // Thay đổi giá trị province
                        }}
                        filterOption={(input, option) => {
                          return removeVietnameseAccent(option?.label ?? "")
                            .toLowerCase()
                            .includes(
                              removeVietnameseAccent(input).toLowerCase()
                            );
                        }}
                        options={districts}
                      />
                      <p
                        className="form-error"
                        style={{ minHeight: 23, marginTop: "10px" }}
                      >
                        {" "}
                        {errors?.district?.message}{" "}
                      </p>
                    </>
                  );
                }}
              />
            </div>
            <div className="col-sm-4">
              <Controller
                name="ward"
                control={control}
                rules={{
                  required: MESSAGE.required,
                }}
                render={({ field, formState: { errors } }) => {
                  return (
                    <>
                      <label>Wards/street*</label>
                      <Select
                        className="customSelect"
                        suffixIcon={<></>}
                        showSearch
                        placeholder="Select a Ward/street*"
                        optionFilterProp="children"
                        onChange={(value, option) => {
                          field.onChange(value); // Cập nhật giá trị vào form
                          _onWardChange(value); // Thay đổi giá trị province
                        }}
                        filterOption={(input, option) => {
                          return removeVietnameseAccent(option?.label ?? "")
                            .toLowerCase()
                            .includes(
                              removeVietnameseAccent(input).toLowerCase()
                            );
                        }}
                        options={wards}
                      />
                      <p
                        className="form-error"
                        style={{ minHeight: 23, marginTop: "10px" }}
                      >
                        {" "}
                        {errors?.ward?.message}{" "}
                      </p>
                    </>
                  );
                }}
              />
            </div>
          </div>
          <Input
            label="Your street address"
            required
            {...register("street", {
              required: MESSAGE.required,
            })}
            error={errors?.street?.message || ""}
          />

          <textarea
            type="text"
            {...register("note")}
            className="form-control"
            cols={20}
            rows={4}
            placeholder="Notes about your order"
          />
          <div className="custom-control">
            <input
              type="checkbox"
              className="custom-control-input"
              id="checkout-create-acc"
            />
            <label
              className="custom-control-label"
              htmlFor="checkout-create-acc"
            >
              Create an account?
            </label>
          </div>
        </div>
        <aside className="col-lg-3">
          <div className="summary">
            <h3 className="summary-title">Your Order</h3>
            <table className="table table-summary">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total Product</th>
                </tr>
              </thead>
              <tbody>
                {renderProductProps.map((item, index) => {
                  const {
                    quantity,
                    totalProduct,
                    variant,
                    price,
                    name,
                    slug,
                    subTotal,
                    shipping,
                  } = item || {};
                  const detailPath = PATHS.PRODUCTS + `/${slug}`;
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={detailPath}>{name}</Link>
                        <p>
                          {quantity} x {formatCurrencyUs(price)}
                        </p>
                      </td>
                      <td>{formatCurrencyUs(totalProduct)}</td>
                    </tr>
                  );
                })}

                {shipping ? (
                  <tr>
                    <td>Shipping:</td>
                    <td>
                      {shipping?.typeShip} - {formatCurrencyUs(shipping?.price)}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>Shipping:</td>
                    <td>
                      <Link to={PATHS.CART}>Select Shipping</Link>
                    </td>
                  </tr>
                )}
                {!!discountCode && (
                  <tr>
                    <td>Discout:</td>
                    <td>
                      {discountCode} - {formatCurrencyUs(discount)}
                    </td>
                  </tr>
                )}
                <tr className="summary-subtotal">
                  <td>Subtotal:</td>
                  <td>{formatCurrencyUs(subTotal)}</td>
                </tr>
                <tr className="summary-total">
                  <td>Total:</td>
                  <td>{formatCurrencyUs(total)}</td>
                </tr>
              </tbody>
            </table>
            <div className="accordion-summary" id="accordion-payment">
              <label>
                <input
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod("card")}
                  type="radio"
                  name="payment"
                  value={paymentMethod}
                />{" "}
                Payment with card
              </label>
              <label>
                <input
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod("cash")}
                  type="radio"
                  name="payment"
                  value={paymentMethod}
                />{" "}
                Payment with cash
              </label>
            </div>

            {product?.length === 0 ? (
              <></>
            ) : (
              <button
                type="submit"
                className="btn btn-outline-primary-2 btn-order btn-block"
              >
                <span className="btn-text">Place Order</span>
                <span className="btn-hover-text">Proceed to Checkout</span>
              </button>
            )}
          </div>
        </aside>
      </div>
    </form>
  );
};

export default CheckoutForm;
