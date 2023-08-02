import { PATHS } from "@/contants/paths";
import { current } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PageLink = ({ slug, blogs, refetchBlogDetail }) => {
  const [currentPost, setCurrentPost] = useState();
  let findBlog = blogs?.findIndex((blog, index) => {
    return blog?.slug === slug;
  });
  // const controlBLog = useCallback(() => {
  const prevBlog = () => {
    setCurrentPost(findBlog - 1);
    // setCurrentPost((prev) => prev - 1);
  };
  const nextBlog = () => {
    setCurrentPost(findBlog + 1);
    // setCurrentPost((prev) => prev + 1);
  };
  if (findBlog < 0) {
    return (findBlog = blogs?.findIndex((blog, index) => {
      console.log("blogs[index]?.slug", blogs[index]?.slug);
      console.log(
        "blogs?.[blogs?.length - 1]?.slug",
        blogs?.[blogs?.length - 1]?.slug
      );
      return blogs[index]?.slug === blogs?.[blogs?.length - 1]?.slug;
    }));
  }
  if (findBlog > blogs?.length - 1) {
    return (findBlog = blogs?.findIndex((blog, index) => {
      return index === 1;
    }));
  }
  console.log("findBlog", findBlog);
  console.log("currentPost", currentPost);
  useEffect(() => {
    if (slug) refetchBlogDetail?.(slug);
  }, [findBlog]);

  return (
    <nav className="pager-nav" aria-label="Page navigation">
      <Link
        to={`${PATHS.BLOG.INDEX}/${blogs?.[findBlog - 1]?.slug}`}
        // to={`${PATHS.BLOG.INDEX}/${
        //   currentPost < 0 || currentPost === -1
        //     ? blogs?.[blogs?.length - 1]?.slug
        //     : blogs?.[currentPost - 1]?.slug
        // }`}
        className="pager-link pager-link-prev"
        // aria-label="Previous"
        // tabIndex={-1}
        onClick={prevBlog}
      >
        Previous Post
        <span className="pager-link-title">
          {blogs?.[findBlog - 1]?.name}
          {/* {currentPost <= 0 || currentPost === -1
            ? blogs?.[blogs?.length - 1]?.name
            : blogs?.[currentPost - 1]?.name} */}
        </span>
      </Link>
      <Link
        onClick={nextBlog}
        className="pager-link pager-link-next"
        to={`${PATHS.BLOG.INDEX}/${blogs?.[findBlog + 1]?.slug}`}
        // to={`${PATHS.BLOG.INDEX}/${
        //   currentPost >= blogs?.length || currentPost === -1
        //     ? blogs?.[0]?.slug
        //     : blogs?.[currentPost + 1]?.slug
        // }`}
        // aria-label="Next"
        // tabIndex={-1}
      >
        Next Post{" "}
        <span className="pager-link-title">
          {blogs?.[findBlog + 1]?.name}
          {/* {currentPost > blogs?.length - 1 || currentPost === -1
            ? blogs?.[0]?.name
            : blogs?.[currentPost + 1]?.name} */}
        </span>
      </Link>
    </nav>
  );
};

export default PageLink;
