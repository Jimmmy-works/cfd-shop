import CheckBox from "@/components/Checkbox";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ProductFilter = ({
  categories,
  isError,
  isLoading,
  onChangeCategories,
  activeCategories,
}) => {
  const [isShowCategories, setIsShowCategories] = useState(true);
  const onToggleCategories = () => {
    setIsShowCategories(!isShowCategories);
  };
  const onChangeFilter = (cateId, isChecked) => {
    if (isChecked) {
      onChangeCategories(cateId);
    } else {
      onChangeCategories("");
    }
  };
  const onClean = () => {
    onChangeCategories("");
  };
  return (
    <aside className="col-lg-3 order-lg-first">
      <div className="sidebar sidebar-shop">
        <div className="widget widget-clean">
          <label>Filters:</label>
          <a onClick={onClean} className="sidebar-filter-clear">
            Clean All
          </a>
        </div>
        <div className="widget widget-collapsible">
          <h3 onClick={onToggleCategories} className="widget-title">
            <a
              className={`${isShowCategories ? "collapse " : "collapsed"}`}
              aria-expanded={`${isShowCategories ? "true" : "false"}`}
            >
              Category
            </a>
          </h3>
          <div
            className={`collapse ${isShowCategories ? "show" : ""}`}
            id="widget-1"
          >
            <div className="widget-body">
              <div className="filter-items filter-items-count">
                {categories?.length > 0 &&
                  categories?.map((category, index) => {
                    return (
                      <div
                        key={category?.id || category?.slug || index}
                        className="filter-item"
                      >
                        <div className="custom-control custom-checkbox">
                          <CheckBox
                            id={category?.id || index}
                            checked={activeCategories === category?.id}
                            onChange={(e) => {
                              onChangeFilter(category?.id, e.target.checked);
                            }}
                            className="custom-control-input"
                            label={category?.name || ""}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilter;
