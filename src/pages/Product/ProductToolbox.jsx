import { SORT_OPTION } from "@/constant/general";

const ProductToolbox = ({ showNumb, totalNumb, onSortChange }) => {
  const selectOnchange = (event) => {
    const selectedValue = event.target.value;
    onSortChange(selectedValue);
  };

  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          {" "}
          Showing{" "}
          <span>
            {showNumb} of {totalNumb}
          </span>{" "}
          Products{" "}
        </div>
      </div>
      <div className="toolbox-right">
        <div className="toolbox-sort">
          <label htmlFor="sortby">Sort by:</label>
          <div className="select-custom">
            <select
              name="sortby"
              id="sortby"
              className="form-control"
              onChange={selectOnchange}
            >
              <option value={SORT_OPTION.popularity.value} selected>
                {SORT_OPTION.popularity.label}
              </option>
              <option value={SORT_OPTION.pricelow.value}>
                {SORT_OPTION.pricelow.label}
              </option>
              <option value={SORT_OPTION.pricehigh.value}>
                {SORT_OPTION.pricehigh.label}{" "}
              </option>
              <option value={SORT_OPTION.newest.value}>
                {SORT_OPTION.newest.label}
              </option>
              <option value={SORT_OPTION.rating.value}>
                {SORT_OPTION.rating.label}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbox;
