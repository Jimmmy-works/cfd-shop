import CheckBox from "@/components/Checkbox";
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  .my-heading {
    transition: color 0.3s ease !important;
    &:hover {
      color: #fcb941 !important;
    }
  }
`;
const List = styled.ul`
  .my-style {
    transition: color 0.3s ease !important;
    &:hover {
      color: #fcb941 !important;
    }
  }
`;
const BlogCategories = ({
  blogCategories,
  onChangeCategories,
  activeCaterories,
  onClearCategories,
}) => {
  const [isShowCategories, setIsShowCategories] = useState(true);
  const onToggleCategories = () => {
    setIsShowCategories(!isShowCategories);
  };
  const onChangeFilter = (cateId) => {
    onChangeCategories(cateId);
  };
  return (
    <div className="widget widget-cats">
      <Title className="my-title">
        <h3 className="widget-title">Categories</h3>
        <a onClick={onClearCategories} className="widget-title my-heading">
          Clear
        </a>
      </Title>
      <List>
        {blogCategories?.length &&
          blogCategories?.map((cate) => {
            return (
              <li onClick={() => onChangeFilter(cate?.id)} key={cate?.id}>
                <a
                  onClick={onToggleCategories}
                  className={`${
                    cate?.id === activeCaterories ? "active" : ""
                  } my-style`}
                >
                  {cate?.name || ""}
                  {/* <span>2</span> */}
                </a>
              </li>
            );
          })}
      </List>
    </div>
  );
};

export default BlogCategories;
