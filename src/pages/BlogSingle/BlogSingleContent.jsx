import ShareLink from "@/components/ShareLink";
import SkeletonLoading from "@/components/SkeletonLoading";
import { useDebounce } from "@uidotdev/usehooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const SocialWrapper = styled.div`
  .social-icon {
    width: 13px;
    display: flex;
    margin-right: 6px !important;
  }
`;
const BlogSingleContent = ({
  dataBLogDetail,
  loadingBlogDetail,
  refetchBlogDetail,
}) => {
  const shareURL = window.location.href;
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";

  const { author, description, name, image, updatedAt } = dataBLogDetail || {};
  const isLoading = useDebounce(loadingBlogDetail, 300);

  return (
    <article className="entry single-entry">
      {!isLoading ? (
        <div className="entry-body">
          <figure className="entry-media">
            <img
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = imageError;
              }}
              src={image ? image : imageError}
              alt="image desc"
            />
          </figure>
          <h1 className="entry-title entry-title-big">{name}</h1>
          <div className="entry-meta">
            <span>{moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
            <span className="meta-separator">|</span>
            <span className="entry-author">
              by <a href="#">{author}</a>
            </span>
          </div>
          <div
            className="entry-content editor-content"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          <div className="entry-footer row no-gutters flex-column flex-md-row">
            <div className="col-md">
              <div className="entry-tags">
                <span>Tags:</span>
                <a href="#">photography</a>
                <a href="#">style</a>
              </div>
            </div>
            <div className="col-md-auto mt-2 mt-md-0">
              <SocialWrapper className="social-icons social-icons-color">
                <span className="social-label">Share this post:</span>
                <ShareLink
                  path={shareURL}
                  type="facebok"
                  className="social-icon social-facebook"
                  title="Facebook"
                >
                  <i className="icon-facebook-f" />
                </ShareLink>
                <ShareLink
                  type="twitter"
                  path={shareURL}
                  className="social-icon social-twitter"
                  title="Twitter"
                >
                  <i className="icon-twitter" />
                </ShareLink>
                <ShareLink
                  type="pinterest"
                  path={shareURL}
                  className=" social-iconsocial-pinterest"
                  title="Pinterest"
                >
                  <i className="icon-pinterest" />
                </ShareLink>
                <ShareLink
                  type="linkedin"
                  path={shareURL}
                  className="social-icon social-linkedin"
                  title="Linkedin"
                >
                  <i className="icon-linkedin" />
                </ShareLink>
              </SocialWrapper>
            </div>
          </div>
        </div>
      ) : (
        <div className="entry-body">
          <SkeletonLoading
            isImageStyle={{ minHeight: "600px" }}
            isData={dataBLogDetail}
            isArray={1}
            isParagraph={2}
            isLoading={isLoading}
          />
        </div>
      )}
    </article>
  );
};

export default BlogSingleContent;
