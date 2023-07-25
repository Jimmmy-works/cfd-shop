import axios from "axios";
import { message } from "antd";
import { authenService } from "@/service/authenService";
import { BASE_URL } from "@/contants/environment";
import { LOCAL_STORAGE } from "@/contants/localStorage";

// Tạo một instance của Axios
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 6 * 1000, //miliseconds (ms)
  // so sánh với thời gian hiện tại
  // sử dụng Date.getTime() + (3600 * 1000) => Thời gian hiện tại + 1h => hết hạn token (miliseconds)
});
// Interceptor cho phép can thiệp vào quá trình nhận phản hồi (RESPONSE) từ server.
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Tra ve data error => lay error.config de cau hinh
    const originalRequest = error.config;
    // Nếu mã lỗi là 401 hoặc 403
    console.log(error);

    const _refreshToken = localStorage.getItem(LOCAL_STORAGE.refreshToken);
    if (
      (error.response.status == 401 || error.response.status === 403) &&
      _refreshToken
    ) {
      try {
        // Gọi API để cập nhật token mới
        const data = await authenService.putRefreshToken(_refreshToken);

        const newToken = data?.data?.data.token;
        if (!newToken) throw new Error();

        const newRefreshToken = data?.data?.data.refreshToken;

        // Lưu lại token mới vào local storage
        localStorage.setItem(LOCAL_STORAGE.token, newToken);
        localStorage.setItem(LOCAL_STORAGE.refreshToken, newRefreshToken);

        // // Thay đổi token trong header của yêu cầu ban đầu
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // // Gọi lại yêu cầu ban đầu với token mới
        return instance(originalRequest);
      } catch (error) {
        console.log(error);
        // Xử lý lỗi nếu không thể cập nhật token mới
        // Ví dụ: chuyển hướng người dùng đến trang login
        message.error("Lỗi quyền truy cập, xin vui lòng đăng nhập lại");
        // xoa token tren localstorage
        localStorage.removeItem(LOCAL_STORAGE.refreshToken);
        localStorage.removeItem(LOCAL_STORAGE.token);
      }
    }

    // Nếu lỗi không phải là 401 hoặc 403, trả về lỗi ban đầu
    return Promise.reject(error?.response?.data);
  }
);

// Interceptor cho phép can thiệp vào quá trình gửi yêu cầu (REQUEST) từ server.
instance.interceptors.request.use(
  (config) => {
    // xử lý yêu cầu trước khi gửi đi
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      LOCAL_STORAGE.token
    )}`;
    return config;
  },
  (error) => {
    // xử lý lỗi nếu có
    return Promise.reject(error);
  }
);

export default instance;
