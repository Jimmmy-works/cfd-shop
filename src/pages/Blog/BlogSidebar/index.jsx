import React, { useEffect } from "react";
import BLogSearch from "./BLogSearch";
import BlogCategories from "./BlogCategories";
import BlogPost from "./BlogPost";
import BlogBanner from "./BlogBanner";
import BlogTag from "./BlogTag";
import useBlog from "../useBLog";

const BlogSidebar = () => {
  const {
    blogSearchProps,
    blogCategoriesProps,
    blogTagProps,
    blogPostProps,
    refetchBLog,
  } = useBlog();

  return (
    <aside className="col-lg-3">
      <BLogSearch {...blogSearchProps} />
      <BlogCategories {...blogCategoriesProps} />
      <BlogPost {...blogPostProps} />
      <BlogBanner />
      <BlogTag {...blogTagProps} />
    </aside>
  );
};

export default BlogSidebar;
