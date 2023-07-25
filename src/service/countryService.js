import instance from "@/utils/Interceptor";
import axios from "axios";

export const countryService = {
  getCity: () => {
    return instance.get("/provinces");
  },
  getDistrict: (provinceId) => {
    return instance.get(`/districts?province=${provinceId}`);
  },
  getWard: (districtId) => {
    return instance.get(`/wards?district=${districtId}`);
  },
};
