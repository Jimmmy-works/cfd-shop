import useQuery from "@/hooks/useQuery";
import blogService from "@/service/blogService";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import useBlog from "../Blog/useBLog";
import queryString from "query-string";
const POST_LIMITS = 4;
const useBlogDetail = () => {
  const { slug } = useParams();
  const { blogListProps } = useBlog();
  //// Call API

  const {
    data: dataBLogDetail,
    loading: loadingBlogDetail,
    refetch: refetchBlogDetail,
  } = useQuery(() => blogService.getBlogBySlug(slug), [], {
    preventDefaultCall: true,
  });

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
  const windowHref = window.location.href;
  useEffect(() => {
    if (slug) refetchBlogDetail?.(slug ?? "");
  }, [slug]);
  // useEffect(() => {
  //   if (slug) refetchBlogDetail?.(blogSingleContentProps?.dataBLogDetail?.slug);
  // }, [slug]);
  return {
    blogSingleContentProps,
    slug,
    relatedPostProps,
    controlPostProps,
  };
};
export default useBlogDetail;
