import { BASE_URL } from "@/contants/environment";
import axios from "axios";

export const subscribeService = {
  subscribeDeal: (payload = "") => {
    return axios.post(`${BASE_URL}/subscribes/deals`, payload);
  },
};
