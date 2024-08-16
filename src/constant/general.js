
export const MODAL_TYPE = {
  login: "login",
  register: "register",
};

export const SORT_OPTION = {
  popularity: {
    value: "popularity",
    label: "Most Popular",
    queryObject: { orderBy: undefined, order: undefined },
  },
  pricelow: {
    value: "pricelow",
    label: "Price Low to High",
    queryObject: { orderBy: "price", order: 1 },
  },

  pricehigh: {
    value: "pricehigh",
    label: "Price High to Low",
    queryObject: { orderBy: "price", order: "-1" },
  },

  newest: {
    value: "newest",
    label: "Newest",
    queryObject: { orderBy: "createAt", order: "-1" },
  },

  rating: {
    value: "rating",
    label: "Most Rated",
    queryObject: { orderBy: "rating", order: "-1" },
  },
};


export const RANGE_PRICE = {
    max : 4400,
    min : 12
}