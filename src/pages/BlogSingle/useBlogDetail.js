import useQuery from "@/hooks/useQuery";
import blogService from "@/service/blogService";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useBlog from "../Blog/useBLog";

const useBlogDetail = () => {
  const { search } = useLocation();
  const { slug } = useParams();
  // const { data: dataBLogs, loading: loadingBlogs } = useQuery(
  //   () => blogService.getBlog
  // );
  // const blogs = dataBLogs?.blogs;
  const { blogListProps } = useBlog();
  const {
    data: dataBLogDetail,
    loading: loadingBlogDetail,
    refetch: refetchBlogDetail,
  } = useQuery(() => blogService.getBlogBySlug(slug));
  //Blog Content
  const blogSingleContentProps = {
    dataBLogDetail,
    loadingBlogDetail,
  };
  // Related Post
  const relatedPostProps = {
    slug,
    blogs: blogListProps?.blogs,
  };
  // Control Post
  const controlPostProps = {
    slug,
    blogs: blogListProps?.blogs,
    refetchBlogDetail,
  };
  // useEffect(() => {
  //   refetchBlogDetail?.(blogSingleContentProps?.dataBLogDetail?.slug);
  // }, [slug]);
  return {
    blogSingleContentProps,
    slug,
    relatedPostProps,
    controlPostProps,
  };
};
export default useBlogDetail;
