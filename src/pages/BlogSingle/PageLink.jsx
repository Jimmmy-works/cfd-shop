import { PATHS } from "@/contants/paths";
import { current } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const PageLink = ({ slug, blogs, refetchBlogDetail }) => {
  const [currentPost, setCurrentPost] = useState();
  const [slugBlog, setSlugBlog] = useState(slug);
  const navigate = useNavigate();
  let findBlog = blogs?.findIndex((blog, index) => {
    return blog?.slug === slug;
  });
  if (findBlog === undefined || findBlog < 0) {
    console.log("1111111111", 1111111111);
    return (findBlog = blogs?.findIndex((blog, index) => {
      return blogs?.[blogs?.length - 1]?.slug;
    }));
  }
  const origin = window?.location?.origin;

  // const clearHref = () => {
  //   return window.location.href;
  // };
  // const prevBlog = () => {
  //   if (findBlog >= 0) {
  //     return navigate(
  //       `${origin}${PATHS.BLOG.INDEX}/${blogs?.[findBlog - 1]?.slug}`
  //     );
  //   } else if (findBlog < 0) {
  //     return navigate(
  //       `${origin}${PATHS.BLOG.INDEX}/${blogs?.[blogs?.length - 1]?.slug}`
  //     );
  //   }
  // };
  // const nextBlog = () => {
  //   if (findBlog >= 0) {
  //     return navigate(
  //       `${origin}${PATHS.BLOG.INDEX}/${blogs?.[findBlog + 1]?.slug}`
  //     );
  //   } else if (findBlog < 0) {
  //     return navigate(`${origin}${PATHS.BLOG.INDEX}/${blogs?.[0]?.slug}`);
  //   }
  // };

  console.log("findBlog", findBlog);
  console.log("blogs", blogs);

  return (
    <>
      {blogs?.length && (
        <nav className="pager-nav" aria-label="Page navigation">
          <a
            // href={
            //   findBlog < 0
            //     ? `${origin}${PATHS.BLOG.INDEX}/${
            //         blogs?.[blogs?.length - 1]?.slug
            //       }`
            //     : `${origin}${PATHS.BLOG.INDEX}/${blogs?.[findBlog - 1]?.slug}`
            // }
            href={`${origin}${PATHS.BLOG.INDEX}/${blogs?.[findBlog - 1]?.slug}`}
            className="pager-link pager-link-prev"
            // aria-label="Previous"
            // tabIndex={-1}
          >
            Previous Post
            <span className="pager-link-title">
              {findBlog < 0
                ? blogs?.[blogs?.length - 1]?.name
                : blogs?.[findBlog - 1]?.name}
            </span>
          </a>
          <a
            href={`${origin}${PATHS.BLOG.INDEX}/${blogs?.[findBlog + 1]?.slug}`}
            // href={
            //   findBlog > blogs?.length - 1
            //     ? `${origin}${PATHS.BLOG.INDEX}/${blogs?.[0]?.slug}`
            //     : `${origin}${PATHS.BLOG.INDEX}/${blogs?.[findBlog + 1]?.slug}`
            // }
            className="pager-link pager-link-next"
          >
            Next Post{" "}
            <span className="pager-link-title">
              {findBlog > blogs?.length - 1
                ? blogs?.[0]?.name
                : blogs?.[findBlog + 1]?.name}
            </span>
          </a>
        </nav>
      )}
    </>
  );
};

export default PageLink;
