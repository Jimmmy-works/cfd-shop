import SkeletonLoading from "@/components/SkeletonLoading";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/paths";
const MyWrapper = styled.div`
  .entry-img {
    max-height: 283px;
    object-fit: cover;
  }
  .entry-title {
    a {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .entry-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;
const BlogList = ({
  blogs,
  loadingBlog,
  errorBlog,
  blogTagInfo,
  loadingBlogCategories,
  loadingBlogTags,
}) => {
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };
  const mapBlog = blogs?.map((blog) => {
    const { tags } = blog;
    const filterBLogTag = tags?.filter((tag, index) => {
      return tag === blogTagInfo?.id;
    });
    return filterBLogTag;
  });

  const allLoading = loadingBlog || loadingBlogCategories || loadingBlogTags;
  const isLoading = useDebounce(allLoading, 300);
  if ((!isLoading && blogs?.length < 1) || errorBlog) {
    return (
      <div className="entry-container max-col-2">
        <div
          style={{
            maxWidth: "100%",
            width: "100%",
            minHeight: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
          }}
          className="entry-item col-sm-6"
        >
          There is no blog
        </div>
      </div>
    );
  }
  // if (!isLoading & (blogs?.length >= 1)) {
  return (
    <div className="entry-container max-col-2" data-layout="fitRows">
      {!isLoading ? (
        blogs?.length &&
        blogs?.map((blog) => {
          const { updatedAt, name, image, description, id, author, slug } =
            blog || {};
          // const filterBLogTag = tags?.filter((tag, index) => {
          //   console.log("tag", tag);
          //   console.log("filterBLogTag", tag === blogTagInfo?.id);
          //   return tag === blogTagInfo;
          // });
          return (
            <MyWrapper key={id} className="entry-item col-sm-6">
              <motion.div
                variants={container}
                animate={`show`}
                initial={`hidden`}
              >
                <article className="entry entry-grid">
                  <figure className="entry-media">
                    <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>
                      <img
                        className="entry-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = imageError;
                        }}
                        src={image}
                        alt="image desc"
                      />
                    </Link>
                  </figure>
                  <div className="entry-body">
                    <div className="entry-meta">
                      <span>
                        {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                      </span>
                      <span className="meta-separator">|</span>
                      <span className="entry-author">
                        by{" "}
                        <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>{author}</Link>
                      </span>
                    </div>
                    <h2 className="entry-title">
                      <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>{name}</Link>
                    </h2>
                    <div
                      className="entry-content"
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                    <Link
                      to={`${PATHS.BLOG.INDEX}/${slug}`}
                      className="read-more"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              </motion.div>
            </MyWrapper>
          );
        })
      ) : (
        <SkeletonLoading
          isClassName="entry-item col-sm-6"
          isData={blogs}
          isArray={6}
          isParagraph={2}
          isLoading={isLoading}
        />
      )}
    </div>
  );
  // }
  // if (isLoading) {
  //   return (
  //     <div className="entry-container max-col-2" data-layout="fitRows">
  //       <SkeletonLoading
  //         isClassName="entry-item col-sm-6"
  //         isData={blogs}
  //         isArray={6}
  //         isParagraph={2}
  //         isLoading={isLoading}
  //       />
  //       ;
  //     </div>
  //   );
  // }
  // if (!isLoading & (blogs?.length >= 1)) {
  //   return (
  //     <div className="entry-container max-col-2" data-layout="fitRows">
  //       {blogs?.length &&
  //         blogs?.map((blog) => {
  //           const { updatedAt, name, image, description, id, author, slug } =
  //             blog || {};
  //           // const filterBLogTag = tags?.filter((tag, index) => {
  //           //   console.log("tag", tag);
  //           //   console.log("filterBLogTag", tag === blogTagInfo?.id);
  //           //   return tag === blogTagInfo;
  //           // });
  //           return (
  //             <MyWrapper key={id} className="entry-item col-sm-6">
  //               <motion.div
  //                 variants={container}
  //                 animate={`show`}
  //                 initial={`hidden`}
  //               >
  //                 <article className="entry entry-grid">
  //                   <figure className="entry-media">
  //                     <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>
  //                       <img
  //                         className="entry-img"
  //                         onError={(e) => {
  //                           e.target.onerror = null;
  //                           e.target.src = imageError;
  //                         }}
  //                         src={image}
  //                         alt="image desc"
  //                       />
  //                     </Link>
  //                   </figure>
  //                   <div className="entry-body">
  //                     <div className="entry-meta">
  //                       <span>
  //                         {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
  //                       </span>
  //                       <span className="meta-separator">|</span>
  //                       <span className="entry-author">
  //                         by{" "}
  //                         <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>
  //                           {author}
  //                         </Link>
  //                       </span>
  //                     </div>
  //                     <h2 className="entry-title">
  //                       <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>{name}</Link>
  //                     </h2>
  //                     <div
  //                       className="entry-content"
  //                       dangerouslySetInnerHTML={{ __html: description }}
  //                     ></div>
  //                     <Link
  //                       to={`${PATHS.BLOG.INDEX}/${slug}`}
  //                       className="read-more"
  //                     >
  //                       Read More
  //                     </Link>
  //                   </div>
  //                 </article>
  //               </motion.div>
  //             </MyWrapper>
  //           );
  //         })}
  //     </div>
  //   );
  // }
  // if (isLoading) {
  //   return (
  //     <div className="entry-container max-col-2" data-layout="fitRows">
  //       <SkeletonLoading
  //         isClassName="entry-item col-sm-6"
  //         isData={blogs}
  //         isArray={6}
  //         isParagraph={2}
  //         isLoading={isLoading}
  //       />
  //       ;
  //     </div>
  //   );
  // }
};

export default BlogList;
