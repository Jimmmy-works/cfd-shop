import { BASE_URL } from "@/contants/environment";
import axios from "axios";

const productService = {
  getProduct: (query = "") => {
    return axios.get(`${BASE_URL}/products${query}`);
  },
  getProductBySlug: (slug = "") => {
    return axios.get(`${BASE_URL}/products/${slug}`);
  },
  getCategories: () => {
    return axios.get(`${BASE_URL}/product-categories`);
  },
  getCategoriesBySlug: (slug = "") => {
    return axios.get(`${BASE_URL}/product-categories/${slug}`);
  },
};

export default productService;
