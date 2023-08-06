import React, { useEffect } from "react";
import useBlogDetail from "./useBlogDetail";
import RelatedPost from "./RelatedPost";
import PageLink from "./PageLink";
import BlogSingleReply from "./BlogSingleReply";
import BlogSingleContent from "./BlogSingleContent";
import BlogSingleComment from "./BlogSingleComment";

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
