import instance from "@/utils/Interceptor";

const whiteListService = {
  addWhiteList: (payload = "") => {
    return instance.post(`/customer/white-list`, payload);
  },
  deleteWhiteList: (payload = "") => {
    return instance.delete(`/customer/white-list`, {
      data: { product: payload },
    });
  },
};

export default whiteListService;
