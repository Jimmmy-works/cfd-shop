const BLOG_PATH = "/blog";
const PRODUCT_PATH = "/product";
const DASHBOARD_PATH = "/dashboard";
const CHECKOUT_PATH = "/checkout";
export const PATHS = {
  HOME: "/",

  PRODUCT: {
    INDEX: PRODUCT_PATH,
    DETAIL: PRODUCT_PATH + "/:slug",
  },

  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:slug",
    // DETAIL: BLOG_PATH + "/blog-detail",
  },
  CART: "/cart",
  CHECKOUT: {
    INDEX: CHECKOUT_PATH,
    DETAIL: CHECKOUT_PATH + "/detail",
  },

  CONTACT: "/contact",

  ABOUT: "/about",
  DASHBOARD: {
    INDEX: DASHBOARD_PATH,
    ORDER: DASHBOARD_PATH + "/order",
    ADDRESS: DASHBOARD_PATH + "/address",
    WISHLIST: DASHBOARD_PATH + "/wishlist",
  },

  PRIVACYPOLICY: "/privacy-policy",
  FAQ: "/faq",
  PAYMENT_METHOD: "/payment-method",
  RETURN: "/return",
  SHIPPING: "/shipping",
};
