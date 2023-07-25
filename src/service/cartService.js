import instance from "@/utils/Interceptor";
export const cartService = {
  getCart: () => {
    return instance.get(`/carts/me`);
  },
  updateCart: (payload = {}) => {
    return instance.put(`/carts`, payload);
  },
};
