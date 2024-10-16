import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constant/path";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import ProductList from "./ProductList";
import ProductToolbox from "./ProductToolbox";
import ProductFillter from "./ProductFillter";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useMutation } from "@/hooks/useMutation";
import { productService } from "@/services/productService";
import { useEffect, useRef } from "react";
import { SORT_OPTION } from "@/constant/general";
import useQuery from "@/hooks/useQuery";
import { RANGE_PRICE } from "@/constant/general";
const PRODUCT_LIMIT = 9;

const Product = () => {
  const { search } = useLocation();

  const queryObject = queryString.parse(search);

  const [_, setSearchParams] = useSearchParams();

  const {
    data: productsData,
    loading: productsLoading,
    error: productError,
    execute: fetchProduct,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMIT}`)
  );

  const productsList = productsData?.data?.products || [];

  const productPagination = productsData?.data?.pagination || {};

  useEffect(() => {
    fetchProduct(search);
  }, [search]);

  const productListProps = {
    productsList,
    isError: productError,
    isLoading: productsLoading,
  };

  const {
    data: cateData,
    loading: cateLoading,
    error: cateError,
  } = useQuery(productService.getCategories);

  const categories = cateData?.products || [];

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMIT,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  const pagiProps = {
    onPagiChange,
    currentPage: Number(productPagination.page || queryObject.page || 1),
    limit: Number(productPagination.limit || 0),
    total: Number(productPagination.total || 0),
  };

  const onSortChange = (sort_type) => {
    const sortQuery = SORT_OPTION[sort_type].queryObject;
    if (sortQuery) {
      updateQueryString({
        ...queryObject,
        ...sortQuery,
        page: 1,
      });
    }
  };
  const toolboxProps = {
    showNumb: productsList?.length || 0,
    totalNumb: productPagination?.total || 0,
    onSortChange,
  };


  const handleCateFillterChange = (cateId = null, isChecked = null) => {
    let newCateQuery;
    if (queryObject.category) {
      if (Array.isArray(queryObject.category)) {
        newCateQuery = [...queryObject.category, cateId];
      } else {
        newCateQuery = [queryObject.category, cateId];
      }
    } else {
      newCateQuery = [cateId];
    }

    if (!!!isChecked) {
      newCateQuery = newCateQuery.filter((category) => category !== cateId);
    }
    if (!!!cateId) {
      newCateQuery = [];
    }

    updateQueryString({
      ...queryObject,
      category: newCateQuery,
      page: 1,
    });
  };

  

  let priceFillterTimeout = useRef();
  const handlePriceFillter = (rangePrice) => {
    if (rangePrice?.length === 2) {
      if (priceFillterTimeout.current) {
        clearTimeout(priceFillterTimeout.current);
      }
      priceFillterTimeout.current = setTimeout(() => {
        updateQueryString({
          ...queryObject,
          minPrice: rangePrice[0].substring(1),
          maxPrice: rangePrice[1].substring(1),
          page: 1,
        });
      }, 500);
    }
  };

  const fillterProps = {
    categories,
    handleCateFillterChange,
    handlePriceFillter,
    activeCate: queryObject.category,
    currentRangePrice : [queryObject.minPrice || RANGE_PRICE.min, queryObject.maxPrice || RANGE_PRICE.max]
   
  };

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}> Home </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolbox {...toolboxProps} />
              <ProductList {...productListProps} />
              <Pagination {...pagiProps} />
            </div>
            <ProductFillter {...fillterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
