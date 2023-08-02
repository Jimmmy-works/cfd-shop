import { BASE_URL } from "@/contants/environment";
import instance from "@/utils/Interceptor";
import axios from "axios";

export const subscribeService = {
  subscribeDeal: (payload = "") => {
    return instance.post(`/subscribes/deals`, payload);
  },
  subscribeContact: (payload = "") => {
    return instance.post(`/subscribes`, payload);
  },
};
