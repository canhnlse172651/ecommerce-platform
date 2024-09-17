import React, { useEffect } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { MESSAGE } from "@/constant/validate";
const CheckoutDiscount = ({addCoupon, handleAddCoupon, handleRemoveCoupon}) => {
 
  useEffect(()=> {
    //  Checkout discount input - toggle label if input is empty etc...
    $('#checkout-discount-input').on('focus', function () {
        // Hide label on focus
        $(this).parent('form').find('label').css('opacity', 0);
    }).on('blur', function () {
        // Check if input is empty / toggle label
        var $this = $(this);

        if ($this.val().length !== 0) {
            $this.parent('form').find('label').css('opacity', 0);
        } else {
            $this.parent('form').find('label').css('opacity', 1);
        }
    });

  },[])

const {
  register,
  handleSubmit,
  reset,
  formState : {errors},

} = useForm({defaultValues : {
  discountCode : addCoupon
}})

  useEffect(()=> {
    reset({
      discountCode : addCoupon
    })
  },[addCoupon])
  
  const _onSubmit = (value) => {
   
      if(value?.discountCode) {
        handleAddCoupon?.(value.discountCode)
      }
  }
  
  return (
   <div>
    <div className="checkout-discount">
      <form action="#">
        <input
          type="text"
          className="form-control"
          required
          id="checkout-discount-input"
          {...register("discountCode",{
            required : MESSAGE.required,
          })}
        />
        <label htmlFor="checkout-discount-input" className="text-truncate" style={{opacity : addCoupon ? 0 : 1, top: "-10px"}}  >
          Have a coupon? <span>Click below to enter your code</span>
        </label>
        <p  className="form-error" >{errors?.discountCode?.message || ""}</p>
      </form>
    </div>
    {
      !!!addCoupon ? (
        <Button  onClick={handleSubmit(_onSubmit)}>Add Voucher</Button>
      ): <Button onClick={handleRemoveCoupon} >Remove</Button>
    }
  
    </div>

  );
};

export default CheckoutDiscount;
