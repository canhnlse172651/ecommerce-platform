import Input from "@/components/Input";
import { MESSAGE, REGEX } from "@/constant/validate";
import useAddress from "@/hooks/useAddress";
import removeVietnameseAccent from "@/utils/removeAccent";
import { message, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authenService } from "@/services/authenService";
import dayjs from "dayjs";
import { handleGetProfile } from "@/store/Reducer/authReducer";
const AccoutDetail = () => {
  const { profile } = useSelector((state) => state.auth);
  const {
    firstName,
    phone,
    lastName,
    district,
    province,
    ward,
    street,
    email,
    birthday,
  } = profile || {};

  console.log('🚀---->profile',profile );

  const dispatch = useDispatch();
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
      lastName,
      birthday,
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
      lastName,
      birthday: birthday
        ? dayjs(birthday || "01-01-2000")
            .format("YYYY/MM/DD")
            .replaceAll("/", "-")
        : "",
    }),
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

  const _onSubmit = async (data) => {
   
    
    try {
      const res = await authenService.updateProfile(data);

      if (res.status === 200) {
        message.success("Update profile success");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      console.log("error", error);
      message.error("Update profile fail");
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form
        action="#"
        className="account-form"
        onSubmit={handleSubmit(_onSubmit)}
      >
        <div className="row">
          <div className="col-sm-4">
            <Input
              label="Your first name"
              required
              {...register("firstName", {
                required: MESSAGE.required,
              })}
              error={errors?.firstName?.message || ""}
            />
          </div>
          <div className="col-sm-4">
            <Input
              label="Your last name"
              required
              {...register("lastName", {
                required: MESSAGE.required,
              })}
              error={errors?.lastName?.message || ""}
            />
          </div>
          <div className="col-sm-4">
            <Input
              label="Your email address"
              disabled
              required
              {...register("email", {
                validate: {
                  required: (value) => value !== "" || MESSAGE.required,
                  validEmail: (value) =>
                    value === "" || REGEX.email.test(value) || MESSAGE.email,
                },
              })}
              error={errors?.email?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
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
          <div className="col-sm-6">
            <Input
              label="Your Birthday"
              type="date"
              required
              {...register("birthday", {
                required: MESSAGE.required,
              })}
              error={errors?.birthday?.message || ""}
            />
          </div>
        </div>
        <div
          className="row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="col-sm-3">
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
                      style={{
                        minHeight: 23,
                        marginTop: "10px",
                        lineHeight: "1.5",
                      }}
                    >
                      {" "}
                      {errors?.province?.message}{" "}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-3">
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
                      value={districtId}
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
                      style={{
                        minHeight: 23,
                        marginTop: "10px",
                        lineHeight: "1.5",
                      }}
                    >
                      {" "}
                      {errors?.district?.message}{" "}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-3">
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
                      value={wardId}
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
                      style={{
                        minHeight: 23,
                        marginTop: "10px",
                        lineHeight: "1.5",
                      }}
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
        <Input
          label="Current password (leave blank to leave unchanged)"
          type="password"
          {...register("password", {})}
          error={errors?.password?.message || ""}
        />

        <Input
          label="New password"
          type="password"
          {...register("newPassword", {
            validate: (value) => {
              const currentPassword = getValues("password");
              return (
                value === currentPassword ||
                "new passwords not allow match with current password"
              );
            },
          })}
          error={errors?.newPassword?.message || ""}
        />
        <Input
          label="Your confirm password"
          type="password"
          {...register("confirmPassword", {
            validate: (value) => {
              const newPassword = getValues("newPassword");

              return value === newPassword || "Passwords do not match"; // Kiểm tra confirmPassword khớp với newPassword
            },
          })}
          error={errors?.confirmPassword?.message || ""}
        />

        <button type="submit" className="btn btn-outline-primary-2">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default AccoutDetail;
