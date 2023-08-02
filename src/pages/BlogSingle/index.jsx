import React, { useEffect } from "react";
import useBlogDetail from "./useBlogDetail";
import RelatedPost from "./RelatedPost";
import PageLink from "./PageLink";
import BlogSingleContent from "./BlogSIngleContent";
import BlogSingleReply from "./BlogSingleReply";
import BlogSingleComment from "./BlogSIngleComment";
import { motion } from "framer-motion";

const BlogSingle = () => {
  const { blogSingleContentProps, slug, relatedPostProps, controlPostProps } =
    useBlogDetail();

  // const container = {
  //     hidden: { opacity: 0 },
  //     show: {
  //       opacity: 1,
  //       transition: { duration: 0.3 },
  //     },
  //   };
  // <motion.div
  //                 variants={container}
  //                 animate={`show`}
  //                 initial={`hidden`}
  //               ></motion.div>
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
