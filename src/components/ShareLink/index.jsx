import React from "react";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";

const ShareLink = ({ path, type, title, children, className }) => {
  switch (type) {
    case "facebook":
      return (
        <FacebookShareButton url={path}>
          <a
            style={{ marginRight: "10px" }}
            href="#"
            className={`social-icon ${className}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </FacebookShareButton>
      );
    case "twitter":
      return (
        <TwitterShareButton url={path}>
          <a
            style={{ marginRight: "10px" }}
            href="#"
            className={`social-icon ${className}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </TwitterShareButton>
      );

    case "pinterest":
      return (
        <PinterestShareButton url={path}>
          <a
            style={{ marginRight: "10px" }}
            href="#"
            className={`social-icon ${className}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </PinterestShareButton>
      );
    case "instagram":
      return (
        <>
          <a
            style={{ marginRight: "10px" }}
            href={`${path}`}
            className={`social-icon ${className}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </>
      );
    case "youtube":
      return (
        <a
          style={{ marginRight: "10px" }}
          href={`${path}`}
          className={`social-icon ${className}`}
          title={title}
          target="_blank"
        >
          {children}
        </a>
      );
    case "linkedin":
      return (
        <LinkedinShareButton>
          <a
            style={{ marginRight: "10px" }}
            href={`${path}`}
            className={`social-icon ${className}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </LinkedinShareButton>
      );

    default:
      return (
        <FacebookShareButton url={path}>
          <a
            href="#"
            className={`social-icon ${className}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </FacebookShareButton>
      );
  }
};

export default ShareLink;
