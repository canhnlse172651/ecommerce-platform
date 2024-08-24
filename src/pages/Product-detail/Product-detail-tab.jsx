import { useState } from "react";
import ParseHtml from "@/components/ParseHtml";
import { generateRandomUsername } from "@/utils/generalUserName";
import { formartDate } from "@/utils/formartDate";
import RatingComp from "@/components/Rating";
const TAB = [
  { key: "des", value: "Description" },
  { key: "ShipAndReturn", value: "Shipping And Returns" },
  { key: "reviews", value: "Reviews" },
];

// convert TAB array to TAB object
const tabObject = TAB.reduce((acc, { key, value }) => {
  acc[key] = value;
  return acc;
}, {});

const ProductDetailTab = ({
  shippingReturn,
  description,
  productReviews = [],
}) => {
  const [selectTab, setSelectTab] = useState(tabObject.des);

  const _onTabChange = (tab) => {
    {
      setSelectTab(tab);
    }
  };

  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        {TAB.map((tab, index) => {
          return (
            <li
              className="nav-item"
              key={index}
              onClick={(e) => _onTabChange(tab.value)}
            >
              <a
                className={`nav-link ${
                  selectTab === tab.value ? "active" : ""
                }`}
                id="product-desc-link"
                data-toggle="tab"
                href="#product-desc-tab"
                role="tab"
                aria-controls="product-desc-tab"
                aria-selected="true"
              >
                {tab.value}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {selectTab === tabObject.des && (
          <div
            className="tab-pane fade show active"
            id="product-desc-tab"
            role="tabpanel"
            aria-labelledby="product-desc-link"
          >
            <div className="product-desc-content">
              <h3>Description</h3>

              <ParseHtml htmlString={description} />
            </div>
          </div>
        )}
        {selectTab === tabObject.ShipAndReturn && (
          <div
            className="tab-pane fade show active"
            id="product-desc-tab"
            role="tabpanel"
            aria-labelledby="product-desc-link"
          >
            <div className="product-desc-content">
              <ParseHtml htmlString={shippingReturn} />
            </div>
          </div>
        )}
        {selectTab === tabObject.reviews && (
          <div
            className="tab-pane fade show active"
            id="product-review-tab"
            role="tabpanel"
            aria-labelledby="product-review-link"
          >
            <div className="reviews">
              <h3>Reviews ({productReviews?.length})</h3>

              {productReviews?.map((review, index) => {
                const {
                  id,
                  rate,
                  order,
                  updatedAt,
                  description: reviewerDes,
                  title,
                } = review || {};
                return (
                  <div className="review" key={index}>
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">
                            {generateRandomUsername().substring(0, 5) +
                              order.substring(20)}
                          </a>
                        </h4>
                        <div className="ratings-container">
                          <RatingComp rating={rate} />
                        </div>
                        <span className="review-date">
                          {formartDate(updatedAt, "MM/DD/YYYY")}
                        </span>
                      </div>
                      <div className="col">
                        <h4>{title}</h4>
                        <div className="review-content">
                          <ParseHtml
                            htmlString={
                              reviewerDes ||
                              '<p style={{ color: "black" }}>Good job</p>'
                            }
                          />
                        </div>
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (0){" "}
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0){" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailTab;
