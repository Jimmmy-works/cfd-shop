import React from "react";
import styled from "styled-components";
const Tag = styled.div`
  a {
    transition: 0.3s ease !important;
    &:hover {
      background-color: #ffc107;
      color: #fff !important;
    }
  }
`;
const BlogTag = ({ blogTags, onChangeTags }) => {
  const onClickTag = (tag) => {
    onChangeTags(tag?.slug);
  };
  return (
    <div className="sidebar">
      <div className="widget">
        <h3 className="widget-title">Browse Tags</h3>
        <Tag className="tagcloud">
          {blogTags?.length &&
            blogTags?.map((tag, index) => {
              return (
                <a
                  key={tag?.id || index}
                  className="1"
                  onClick={() => onClickTag(tag)}
                >
                  {tag?.name}
                </a>
              );
            })}
        </Tag>
      </div>
    </div>
  );
};

export default BlogTag;
