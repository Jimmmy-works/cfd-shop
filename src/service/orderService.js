import instance from "@/utils/Interceptor";
const orderService = {
  getOrderMe: () => {
    return instance.get(`/orders/me`);
  },
  getReviewById: (id = "") => {
    return instance.get(`/reviews/product/${id}`);
  },
  postReview: (payload = {}) => {
    return instance.post(`/reviews`, payload);
  },
};
export default orderService;
