import instance from "@/utils/Interceptor";
const checkoutService = {
  getCoupon: (query = "") => {
    return instance.get(`/orders/voucher/${query}`);
  },
  getOrder: () => {
    return instance.get(`/orders/me`);
  },
  getOrderById: (id = "") => {
    return instance.get(`/orders/${id}/me`);
  },
  checkout: (payload = {}) => {
    return instance.post(`/orders`, payload);
  },
};

export default checkoutService;
