import { useMainContext } from "@/components/MainContext";
import { PATHS } from "@/contants/paths";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Item = styled.li`
  .my-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    span,
    p {
      transition: color 0.3s ease;
      &:hover {
        color: #fcb941 !important;
      }
    }
  }
`;
const BlogPost = ({ dataPost, blogs }) => {
  const { imageError } = useMainContext();
  return (
    <div className="widget">
      <h3 className="widget-title">Popular Posts</h3>
      <ul className="posts-list">
        {dataPost?.blogs?.length &&
          dataPost?.blogs?.map((post) => {
            const { slug, createdAt, description, image } = post || {};

            return (
              <Item key={post?.id}>
                <figure>
                  <Link to={`${PATHS.BLOG.INDEX}/${slug}`}>
                    <img
                      style={{ height: "80px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = imageError;
                      }}
                      src={image}
                      alt="post"
                    />
                  </Link>
                </figure>
                <div>
                  <span>{moment(createdAt).format("MMMM Do YYYY")}</span>
                  <h4>
                    <Link
                      className="my-desc"
                      to={`${PATHS.BLOG.INDEX}/${slug}`}
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></Link>
                  </h4>
                </div>
              </Item>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogPost;
