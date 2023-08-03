import { BASE_URL } from "@/contants/environment";
import useQuery from "@/hooks/useQuery";
import blogService from "@/service/blogService";
import queryString from "query-string";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogTag } from "@/store/reducer/blogReducer";
import moment from "moment";

const BLOG_LIMITS = 6;
const POST_LIMITS = 4;
const useBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { blogTagInfo } = useSelector((state) => state.blog);
  //Query strng
  const { search } = useLocation();
  const queryObject = queryString.parse(search) || {};
  // search Params
  const [searchParams, setSearchParams] = useSearchParams();
  // Update Query String
  const updateQueryString = (queryObject) => {
    const newQuerryString = queryString.stringify({
      ...queryObject,
      limit: BLOG_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQuerryString));
  };
  // Call API
  const { data: dataPost, loading: loadingPost } = useQuery((query) =>
    blogService.getBlogUpdatedAt(query || `&limit=${POST_LIMITS}`)
  );
  const {
    data: dataBlog,
    loading: loadingBlog,
    error: errorBlog,
    refetch: refetchBLog,
  } = useQuery((query) =>
    blogService.getBlog(query || `?limit=${BLOG_LIMITS}`)
  );
  const blogs = dataBlog?.blogs || [];
  const blogPagination = dataBlog?.pagination || {};

  const { data: dataBlogCategories, loading: loadingBlogCategories } = useQuery(
    blogService.getBlogCategories
  );
  const blogCategories = dataBlogCategories?.blogs || [];

  const { data: dataBlogTags, loading: loadingBlogTags } = useQuery(
    blogService.getBlogTags,
    []
  );
  const blogTags = dataBlogTags?.blogs;

  // BLog Pagination Props
  const onChangePagination = (page) => {
    updateQueryString({
      ...queryObject,
      page: page,
    });
  };
  const blogPaginationProps = {
    page: Number(blogPagination?.page || queryObject?.page || 1),
    limit: Number(blogPagination?.limit || 1),
    total: Number(blogPagination?.total || 1),

    onChangePagination,
  };
  // BLog List Props
  const blogListProps = {
    blogs,
    loadingBlog,
    errorBlog,
    blogTagInfo,
    loadingBlogCategories,
    loadingBlogTags,
  };
  //Blog sidebar
  const searchLocation = window.location.search?.search("&search=");
  const valueSearchLoacation = window.location.search
    .substring(searchLocation)
    .slice(8);
  const [searchTerm, setSearchTerm] = useState();
  const onChangeCategories = (cateId) => {
    updateQueryString({ ...queryObject, category: cateId, page: 1 });
    if (slug) {
      updateQueryString({
        ...queryObject,
        category: cateId,
        page: 1,
      });
      window.location.pathname = "/blog";
    }
  };
  const onClearCategories = () => {
    updateQueryString({
      ...queryObject,
      page: 1,
      category: "",
    });
  };
  const onChangeSearch = (search) => {
    if (slug) {
      updateQueryString({
        ...queryObject,
        search: search,
        page: 1,
      });
      window.location.pathname = "/blog";
    }
    updateQueryString({
      ...queryObject,
      search: search,
      page: 1,
    });
  };
  const onChangeTags = async (slug) => {
    try {
      await dispatch(getBlogTag(slug));
    } catch (error) {
      console.log("error", error);
    }
  };
  const blogTagProps = { blogTags, onChangeTags, blogs };
  const blogPostProps = {
    blogs,
    dataPost,
  };
  const blogCategoriesProps = {
    blogCategories,
    onChangeCategories,
    activeCaterories: queryObject?.category,
    onClearCategories,
  };
  const blogSearchProps = {
    onChangeSearch,
    searchTerm,
    setSearchTerm,
  };
  useEffect(() => {
    if (search) refetchBLog?.(search);
  }, [search]);
  return {
    blogListProps,
    blogPaginationProps,
    blogSearchProps,
    blogCategoriesProps,
    blogTagProps,
    refetchBLog,
    blogPostProps,
  };
};
export default useBlog;
