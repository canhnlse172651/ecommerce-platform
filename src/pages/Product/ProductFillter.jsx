import { Empty } from "antd";
import { useEffect, useRef } from "react";
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import "nouislider/dist/nouislider.css"; 
import { RANGE_PRICE } from "@/constant/general";

const ProductFillter = ({
  categories = [],
  activeCate,
  handleCateFillterChange,
  handlePriceFillter,
  currentRangePrice
}) => {

  const priceSliderRef = useRef(null);

  useEffect(() => {
    if (priceSliderRef.current && typeof noUiSlider === "object") {
      noUiSlider.create(priceSliderRef.current, {
        start: currentRangePrice,
        connect: true,
        step: 50,
        margin: 200,
        range: {
          min:  RANGE_PRICE.min ,
          max:  RANGE_PRICE.max,
        },
        tooltips: true,
        format: wNumb({
          decimals: 0,
          prefix: "$",
        }),
      });

      priceSliderRef.current.noUiSlider.on("update", function (values, handle) {
        document.getElementById("filter-price-range").innerText = values.join(
          " - "
        );
        handlePriceFillter(values)
      });
    }

    return () => {
      if (priceSliderRef.current && priceSliderRef.current.noUiSlider) {
        priceSliderRef.current.noUiSlider.destroy();
      }
    };
  }, []);
 
  return (
    <aside className="col-lg-3 order-lg-first">
      <div className="sidebar sidebar-shop">
        <div className="widget widget-clean">
          <label>Filters:</label>
          <a style={{cursor:"pointer"}} className="sidebar-filter-clear" onClick={(e) => {
            e.preventDefault();
            handleCateFillterChange()
          }} >
            Clean All
          </a>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <a
              data-toggle="collapse"
              href="#widget-1"
              role="button"
              aria-expanded="true"
              aria-controls="widget-1"
            >
              {" "}
              Category{" "}
            </a>
          </h3>
          <div className="collapse show" id="widget-1">
            <div className="widget-body">
              <div className="filter-items filter-items-count">
                {categories?.length === 0 ? (
                  <Empty description="Not Found Any Categories" />
                ) : (
                  categories?.map((cate, index) => {
                    return (
                      <div key={index || cate?.id}>
                     
                          <input
                            type="checkbox"
                            style={{cursor:"pointer"}}
                            className="custom-control-input"
                            id= {cate?.id}
                            onChange={(e) => {
                              handleCateFillterChange(cate.id,e.target.checked)
                            }}
                            checked = {activeCate?.includes(cate?.id)}
                          />
                          <label
                           style={{
                            fontWeight: 400,
                            color: "#1a1a1a",
                            cursor: "pointer",
                          }}
                            htmlFor={cate?.id}
                          >
                            {cate?.name || ""}
                          </label>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <a
              data-toggle="collapse"
              href="#widget-2"
              role="button"
              aria-expanded="true"
              aria-controls="widget-5"
            >
              {" "}
              Price{" "}
            </a>
          </h3>
          <div className="collapse show" id="widget-2">
            <div className="widget-body">
              <div className="filter-price">
                <div className="filter-price-text">
                  {" "}
                  Price Range: <span id="filter-price-range" />
                </div>
                <div id="price-slider" ref={priceSliderRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductFillter;
