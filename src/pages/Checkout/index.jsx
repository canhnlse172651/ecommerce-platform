import Breadcrumb from "@/components/Breadcrumb";
import Link from "antd/es/typography/Link";
import { PATHS } from "@/constant/path";
import CheckoutDiscount from "./CheckoutDiscount";
import CheckoutForm from "./CheckoutForm";
import { orderServices } from "@/services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCart, handleUpdateCart, updateCacheCart } from "@/store/Reducer/cartReducer";
import { message } from "antd";
import { COUPON } from "@/constant/general";
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartInfor, cartLoading } = useSelector((state) => state.cart);

  const handleAddCoupon = async (coupon) => {
    try {
      const couponRes = await orderServices.getVoucher(coupon);
      const couponInfor = couponRes?.data?.data;

      if (couponInfor) {
        const { shipping, subTotal } = cartInfor || {};
        dispatch(
          updateCacheCart({
            ...cartInfor,
            discount: couponInfor?.value || 0,
            discountCode: couponInfor?.code || "",
            total: subTotal - (couponInfor.value || 0) + (shipping?.price || 0),
          })
        );
        message.success(COUPON.addSuccess);
      }
    } catch (error) {
      message.error(COUPON.addFail);
      console.log("🚀error add coupon---->", error);
    }
  };
  const handleRemoveCoupon = () => {
    try {
      if (cartInfor?.discountCode) {
        const { shipping, subTotal } = cartInfor || {};
        dispatch(
          updateCacheCart({
            ...cartInfor,
            discount: 0,
            discountCode: "",
            total: subTotal + (shipping?.price || 0),
          })
        );
        message.success(COUPON.removeSuccess);
      }
    } catch (error) {
      message.error(COUPON.removeFail);
      console.log("🚀error remove coupon---->", error);
    }
  };

  const checkOutDiscountProps = {
    handleAddCoupon,
    handleRemoveCoupon,
    addCoupon: cartInfor?.discountCode,
  };

  const handleCheckout = async (data) => {
    if (data) {
      const { formInfo, cartInfor } = data || {};
      const {
        phone,
        email,
        firstName,
        province,
        district,
        ward,
        street,
        note,
        paymentMethod,
      } = formInfo || {};
      const {
        shipping,
        variant,
        subTotal,
        total,
        product,
        quantity,
        totalProduct,
        discount,
        discountCode,
      } = cartInfor || {};
      const checkoutPayload = {
        address: {
          phone,
          email,
          fullName : firstName,
          street : `${street}, ${ward?.label || ""}, ${district?.label || ""}, ${province?.label || ""}`
        },
        note,
        paymentMethod,
        shipping,
        variant,
        subTotal,
        total,
        product : product?.map((item) => item.id ) || [],
        quantity,
        discount,
        discountCode,
        totalProduct

      };
      // console.log('🚀---->checkoutPayload',checkoutPayload );

      try {
        const res = await orderServices.checkOut(checkoutPayload)
        if(res?.data?.data){
          dispatch(handleGetCart())
          message.success("Checkout successfully")
          // navigate(PATHS.CHECKOUT_SUCCESS)
        }else{
          message.error("Checkout fail")
        }
      }catch(error){
        console.log('🚀error---->', error);
        message.error("Checkout fail")
      }

    }
  };

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}> Home </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <CheckoutDiscount {...checkOutDiscountProps} />
            <CheckoutForm  handleCheckout = {handleCheckout} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
