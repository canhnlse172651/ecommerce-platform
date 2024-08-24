import { Link } from "react-router-dom";
import { PATHS } from "@/constant/path";
import Breadcrumb from "@/components/Breadcrumb";
import { productService } from "@/services/productService";
import useQuery from "@/hooks/useQuery";
import { useParams } from "react-router-dom";
import ProductDetailTop from "./Product-detail-top";
import ProductDetailTab from "./Product-detail-tab";
import { useRef, useState } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "@/store/Reducer/cartReducer";
import { localToken } from "@/utils/token";
import { handleShowModal } from "@/store/Reducer/authReducer";
import { MODAL_TYPE } from "@/constant/general";

const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const dispatch = useDispatch();

  const quantityRef = useRef();
  const quantity = quantityRef?.current?.value;

  const {
    data: productDetailData,
    loading: productDetailLoading,
    error: productDetailError,
  } = useQuery(() => productService.getProductDetail(slug));

  const { id : productId, description, shippingReturn, name, price, discount } =
    productDetailData || {};


  const { data: productReviews } = useQuery(
    () => productId && productService.getProductReview(productId),
    [productId]
  );
  
  const handleAddToCart = async() => {
    if (!localToken.get()) {
      dispatch(handleShowModal(MODAL_TYPE.login));
      console.log('🚀10---->', 10);
      return; 
    }
      const quantity = quantityRef.current?.value;

      if (!selectedColor) {
        message.error("Please select the color");
        return;
      } else if (isNaN(quantity) || quantity < 1) {
        message.error("Quantity must be greater than 1");
        return;
      }
      //ADD CART
      const addCartPayload = {
        addId: productId,
        addColor: selectedColor,
        addQuantity: quantity,
        addPrice: price - discount,
      };
      try {
        const res = await dispatch(handleAddCart(addCartPayload)).unwrap();
        if (res) {
          // Reset the inputs (if needed)
          setSelectedColor("");
          quantityRef.current.value = 1; // or any default value
        }
      } catch (error) {
        console.log("error", error);
        message.error("Add To Cart Fail")
      }
  };

  const productTopProps = {
    selectedColor,
    setSelectedColor,
    quantityRef,
    ...productDetailData,
    productDetailLoading,
    handleAddToCart,
    quantity,
  };

  const productTabProps = {
    shippingReturn,
    description,
    productReviews,
  };


  return (
    <main className="main">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}> Home </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCTS}> Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{name}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="page-content">
        <div className="container">
          <ProductDetailTop {...productTopProps}
          
          />
          <ProductDetailTab {...productTabProps} />
        </div>
      </div>
    </main>
  );
};
export default ProductDetail;
