import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constant/path";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";
import CartShipping from "./CartShipping";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  handleRemoveCart,
  handleUpdateCart,
} from "@/store/Reducer/cartReducer";
import { sumArrayNumber } from "@/utils/calculate";
import { SHIPPING_OPTION } from "@/constant/general";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartInfor, cartLoading } = useSelector((state) => state.cart);
 // quantity Ref
  const keepRef = useRef({})
  /// structureClone JS
  const {
    product,
    quantity,
    totalProduct,
    discount,
    shipping,
    total,
    subTotal,
    variant,
  } = cartInfor || {};

  const handleRemoveProduct = (removeIndex) => {
    if (cartLoading || removeIndex < 0) return;
    dispatch(handleRemoveCart({ removeIndex }));
   
  };

  const updateQuantityTimeOut = useRef(); // set time out for delay call API
  const handleUpdateQuantity = (updateQuantity, updateIndex) => {
    const getPayload = () => {
      const newQuantity = quantity.map((quantityItem, index) =>
        index === updateIndex ? updateQuantity : quantityItem
      );
      const newTotalProduct = totalProduct.map((totalProductItem, index) =>
        index === updateIndex
          ? product[updateIndex].price * updateQuantity
          : totalProductItem
      );
      const newSubtotal = sumArrayNumber(newTotalProduct);
      const newTotal = newSubtotal - (discount ?? 0) + (shipping?.price ?? 0);
      return {
        ...cartInfor,
        product: product.map((item) => item.id),
        quantity: newQuantity,
        totalProduct: newTotalProduct,
        subTotal: newSubtotal,
        total: newTotal,
      };
    };

    if (updateQuantityTimeOut.current) {
      clearTimeout(updateQuantityTimeOut.current);
    }

    updateQuantityTimeOut.current = setTimeout(async () => {
      if (!cartLoading && quantity[updateIndex] !== updateQuantity) {
        await dispatch(handleUpdateCart(getPayload())).unwrap()
      }
    }, 300);
  };

  const cartTableProps = {
    products:
      product?.map((item, index) => {
        return {
          ...item,
          quantity: quantity?.[index],
          totalProduct: totalProduct?.[index],
          variant: variant?.[index],
        };
      }) || [],
      keepRef,
    handleRemoveProduct,
    handleUpdateQuantity,
  };

  const handleUpdateShipping = (selectedTypeShip) => {

    
    const shipingOption = SHIPPING_OPTION.find((item) => item.value === selectedTypeShip)
    
    if(shipingOption){
          const updatePayload = {
            ...cartInfor,
            product : product?.map((item) => item.id),
            shipping : {
                typeShip : shipingOption.value,
                price : shipingOption.price
            },
            total : total - (shipping?.price || 0) + shipingOption.price
          }

          dispatch(handleUpdateCart(updatePayload))
    }

  }
  const cartSumaryProps = {
    shipping,
    total,
    subTotal,
    handleUpdateShipping
  }
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}> Home </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCTS}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive> Shopping Cart </Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <CartTable {...cartTableProps} />
              <CartShipping  {...cartSumaryProps}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Cart;
