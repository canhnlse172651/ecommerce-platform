import { productService } from "@/services/productService";

import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useMutation } from "@/hooks/useMutation";
import { useEffect, useRef } from "react";
import Featured from "./Featured";
import { getNewestProducts } from "@/utils/getNewestProducts";
import Newest from "./Newest";
import { PATHS } from "@/constant/path";
import Banner from "./Banner";
import DealOutlet from "./DealOutlet";
import useQuery from "@/hooks/useQuery";

const PRODUCT_LIMIT = 15;
const QUERY = `?limit=${PRODUCT_LIMIT}&featured=${true}`;

const Home = () => {
  const { search } = useLocation();

  const copiedProductDataRef = useRef(null);
  const queryObject = queryString.parse(search);

  const [_, setSearchParams] = useSearchParams();

  const {
    data: topProductData,
    loading: topProductLoading,
    error: topProductError,
    execute: fetchTopProduct,
  } = useMutation((query) => productService.getProducts(query || `${QUERY}`));

  const listTopProduct = topProductData?.data?.products || [];

  if (!copiedProductDataRef.current && topProductData) {
    copiedProductDataRef.current = topProductData?.data?.products || [];
  }

  const newestProducts = getNewestProducts(copiedProductDataRef.current);

  const { data: DealProductData, error } = useQuery(productService.getProducts);

  const listDealProduct = DealProductData?.products.filter(
    (item) => item.discount !== 0
  );
 

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMIT,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  useEffect(() => {
    // Khi lần đầu tải trang, thiết lập giá trị mặc định nếu không có tham số tìm kiếm
    if (!Object.keys(queryObject).length) {
      updateQueryString({ featured: true, limit: PRODUCT_LIMIT });
    } else {
      fetchTopProduct(search);
    }
  }, [search]);

  const handleTabChange = (tab) => {
    updateQueryString({
      ...queryObject,
      featured: tab.featured,
      onSale: tab.onSale,
      topRated: tab.topRated,
    });
  };

  const featureProps = {
    handleTabChange,
    listTopProduct,
    queryObject,
  };

  console.log('🚀---->listDealProduct', listDealProduct);

  return (
    <main className="main">
      <Banner />
      <Featured {...featureProps} />

      <div className="mb-7 mb-lg-11" />

      <DealOutlet listDealProduct={listDealProduct} />

      <div className="container">
        <div
          className="owl-carousel mt-5 mb-5 owl-simple"
          data-toggle="owl"
          data-owl-options='{
                                      "nav": false, 
                                      "dots": false,
                                      "margin": 30,
                                      "loop": false,
                                      "responsive": {
                                          "0": {
                                              "items":2
                                          },
                                          "420": {
                                              "items":3
                                          },
                                          "600": {
                                              "items":4
                                          },
                                          "900": {
                                              "items":5
                                          },
                                          "1024": {
                                              "items":6
                                          }
                                      }
                                  }'
        >
          <a href="#" className="brand">
            <img src="assets/images/brands/1.png" alt="Brand Name" />
          </a>
          <a href="#" className="brand">
            <img src="assets/images/brands/2.png" alt="Brand Name" />
          </a>
          <a href="#" className="brand">
            <img src="assets/images/brands/3.png" alt="Brand Name" />
          </a>
          <a href="#" className="brand">
            <img src="assets/images/brands/4.png" alt="Brand Name" />
          </a>
          <a href="#" className="brand">
            <img src="assets/images/brands/5.png" alt="Brand Name" />
          </a>
          <a href="#" className="brand">
            <img src="assets/images/brands/6.png" alt="Brand Name" />
          </a>
        </div>
      </div>
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <Newest newestProducts={newestProducts} />

      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <div className="icon-boxes-container mt-2 mb-2 bg-transparent">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rocket" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Free Shipping</h3>
                  <p>Orders $50 or more</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-rotate-left" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Free Returns</h3>
                  <p>Within 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-info-circle" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">Get 20% Off 1 Item</h3>
                  <p>when you sign up</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="icon-box icon-box-side">
                <span className="icon-box-icon text-dark">
                  <i className="icon-life-ring" />
                </span>
                <div className="icon-box-content">
                  <h3 className="icon-box-title">We Support</h3>
                  <p>24/7 amazing services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className="cta cta-separator cta-border-image cta-half mb-0"
          style={{
            backgroundImage: "url(assets/images/demos/demo-3/bg-2.jpg)",
          }}
        >
          <div className="cta-border-wrapper bg-white">
            <div className="row">
              <div className="col-lg-6">
                <div className="cta-wrapper cta-text text-center">
                  <h3 className="cta-title">Shop Social</h3>
                  <p className="cta-desc">
                    Donec nec justo eget felis facilisis fermentum. Aliquam
                    porttitor mauris sit amet orci.{" "}
                  </p>
                  <div className="social-icons social-icons-colored justify-content-center">
                    <a
                      href="#"
                      className="social-icon social-facebook"
                      title="Facebook"
                      target="_blank"
                    >
                      <i className="icon-facebook-f" />
                    </a>
                    <a
                      href="#"
                      className="social-icon social-twitter"
                      title="Twitter"
                      target="_blank"
                    >
                      <i className="icon-twitter" />
                    </a>
                    <a
                      href="#"
                      className="social-icon social-instagram"
                      title="Instagram"
                      target="_blank"
                    >
                      <i className="icon-instagram" />
                    </a>
                    <a
                      href="#"
                      className="social-icon social-youtube"
                      title="Youtube"
                      target="_blank"
                    >
                      <i className="icon-youtube" />
                    </a>
                    <a
                      href="#"
                      className="social-icon social-pinterest"
                      title="Pinterest"
                      target="_blank"
                    >
                      <i className="icon-pinterest" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cta-wrapper text-center">
                  <h3 className="cta-title">Get the Latest Deals</h3>
                  <p className="cta-desc">
                    and <br />
                    receive <span className="text-primary">$20 coupon</span> for
                    first shopping{" "}
                  </p>
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your Email Address"
                        aria-label="Email Adress"
                        required
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary btn-rounded"
                          type="submit"
                        >
                          <i className="icon-long-arrow-right" />
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-error text-left">
                    Please fill in this field
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
