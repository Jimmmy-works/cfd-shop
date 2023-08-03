import React, { useEffect } from "react";
import useBlogDetail from "./useBlogDetail";
import RelatedPost from "./RelatedPost";
import PageLink from "./PageLink";
import BlogSingleContent from "./BlogSIngleContent";
import BlogSingleReply from "./BlogSingleReply";
import BlogSingleComment from "./BlogSIngleComment";

const BlogSingle = () => {
  const { blogSingleContentProps, slug, relatedPostProps, controlPostProps } =
    useBlogDetail();
  return (
    <>
      <BlogSingleContent {...blogSingleContentProps} />
      <PageLink {...controlPostProps} />
      <RelatedPost {...relatedPostProps} />
      <BlogSingleComment />
      <BlogSingleReply />
    </>
  );
};

export default BlogSingle;
