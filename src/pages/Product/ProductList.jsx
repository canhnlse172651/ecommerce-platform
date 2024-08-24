import { PATHS } from "@/constant/path";
import { Empty } from "antd";
import ComponentLoading from "@/components/ComponentLoading";
import useDebounce from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import ProductCart from "@/components/ProductCart";
const ProductList = ({ isLoading, isError, productsList }) => {

const [delayedLoading, setDelayedLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setDelayedLoading(isLoading);
  }, 200); 

  return () => clearTimeout(timer); // Clear timeout khi component unmount
}, [isLoading]);
 
  return (
    <div className="products mb-3">
      {delayedLoading && <ComponentLoading/>}
      <div className="row justify-content-center">
        {productsList.length === 0 && !isLoading ? (
          <Empty description="Not Found Any Product" />
        ) : (
          productsList?.map((product, index) => {
            const { slug, id } = product;
            const detailPath = PATHS.PRODUCTS + `/${slug}`
            return (
              <div className="col-6 col-md-4 col-lg-4" key={id || index}>
                 <ProductCart {...product} detailPath={detailPath}  />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductList;
