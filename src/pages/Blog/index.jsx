import Pagination from "@/components/Pagination";
import React from "react";
import BlogList from "./BlogList";
import useBlog from "./useBLog";

const Blog = () => {
  const { blogListProps, blogPaginationProps, refetchBLog } = useBlog();
  return (
    <>
      <BlogList {...blogListProps} />
      <Pagination {...blogPaginationProps} />
    </>
  );
};

export default Blog;
