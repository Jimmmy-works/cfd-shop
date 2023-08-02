import instance from "@/utils/Interceptor";
import axios from "axios";

const blogService = {
  getBlog: (query = "") => {
    return instance.get(`/blogs${query}`);
  },

  getBlogUpdatedAt: (query = "") => {
    return instance.get(`/blogs?orderBy=-1&order=updatedAT${query}`);
  },
  getBlogBySlug: (slug = "") => {
    return instance.get(`/blogs/${slug}`);
  },
  getBlogCategories: () => {
    return instance.get(`/blog-categories`);
  },
  getBlogCategoriesBySlug: (slug = "") => {
    return instance.get(`/blog-categories/${slug}`);
  },
  getBlogTags: () => {
    return instance.get(`/blog-tags`);
  },
  getBlogTagsBySlug: (slug = "") => {
    return instance.get(`/blog-tags/${slug}`);
  },
};
export default blogService;
