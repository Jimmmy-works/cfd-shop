export const SORT_OPTION = {
  popularity: {
    value: "popularity",
    label: "Most Popular",
    queryObject: {
      order: undefined,
      orderBy: undefined,
    },
  },
  pricelow: {
    value: "pricelow",
    label: "Price Low to High",
    queryObject: {
      orderBy: "price",
      order: 1,
    },
  },
  pricehigh: {
    value: "pricehigh",
    label: "Price High to Low",
    queryObject: {
      orderBy: "price",
      order: -1,
    },
  },
  newest: {
    value: "newest",
    label: "Newest",
    queryObject: {
      orderBy: "createdAT",
      order: -1,
    },
  },
  rating: {
    value: "rating",
    label: "Most Rated",
    queryObject: {
      orderBy: "rating",
      order: -1,
    },
  },
};

export const THUNK_STATUS = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};
export const SHIPPING_OPTIONS = [
  {
    value: "free",
    label: "Free Shipping:",
    price: 0,
  },
  {
    value: "standard",
    label: "Standard:",
    price: 10,
  },
  { value: "express", label: "Express:", price: 20 },
];
export const PAYMENT_MENTHOD = {
  cash: "cash",

  card: "card",
};
export const MOBILE_OPTION = {
  menu: {
    label: "MENU",
    tab: "menu",
  },
  category: {
    label: "CATEGORIES",
    tab: "category",
  },
};
export const FEATURED_SECTION = {
  all: {
    label: "All",
    tab: "all",
  },
  tv: {
    label: "TV",
    tab: "TV",
  },
  computer: {
    label: "Computers",
    tab: "Computers",
  },
  tablet_phone: {
    label: "Tablets & Phone",
    tab: "Tablets & Cell Phones",
  },
  smart_watch: {
    label: "Smart Watch",
    tab: "Smartwatches",
  },
  accessory: {
    label: "Accessories",
    tab: "Accessories",
  },
};
