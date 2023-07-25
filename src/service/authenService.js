import instance from "@/utils/Interceptor";

export const authenService = {
  register: (payload = {}) => {
    return instance.post(`/customer/register`, payload);
  },
  signin: (payload = {}) => {
    return instance.post(`/customer/login`, payload);
  },
  getProfile: (token = "") => {
    return instance.get(`/customer/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  uploadProfile(payload = {}) {
    return instance.put(`/customer/profiles`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  putRefreshToken: (token = "") => {
    return instance.put(`/customer/refresh`, {
      refreshToken: token,
    });
  },
};
