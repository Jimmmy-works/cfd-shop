import { BASE_URL } from "@/contants/environment";
import useQuery from "@/hooks/useQuery";
import blogService from "@/service/blogService";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const BlogTag = ({ blogTags, onChangeTags }) => {
  const onClickTag = (tag) => {
    onChangeTags(tag?.slug);
  };
  return (
    <div className="sidebar">
      <div className="widget">
        <h3 className="widget-title">Browse Tags</h3>
        <div className="tagcloud">
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
        </div>
      </div>
    </div>
  );
};

export default BlogTag;
