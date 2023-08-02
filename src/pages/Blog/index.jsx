import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BlogList from "./BlogList";
import useBlog from "./useBLog";

const Blog = () => {
  const { search } = useLocation();
  const { blogListProps, blogPaginationProps, refetchBLog } = useBlog();

  useEffect(() => {
    if (search) refetchBLog?.(search);
  }, [search]);
  return (
    <>
      <BlogList {...blogListProps} />
      <Pagination {...blogPaginationProps} />
    </>
  );
};

export default Blog;
