import { BASE_URL } from "@/contants/environment";
import axios from "axios";

export const homeService = {
  getProduct: (query = "") => {
    return axios.get(`${BASE_URL}/products${query}`);
  },
  getProductBySlug: (slug = "") => {
    return axios.get(`${BASE_URL}/products/${slug}`);
  },
  getProductCategories: (query = "") => {
    return axios.get(`${BASE_URL}/product-categories${query}`);
  },
  getProductCategoriesBySlug: (slug = "") => {
    return axios.get(`${BASE_URL}/product-categories/${slug}`);
  },
  getPage: (namePage = "") => {
    return axios.get(`${BASE_URL}/pages/${namePage}`);
  },
};
