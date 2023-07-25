import Select from "@/components/SelectCustom/Select";
import { SORT_OPTION } from "@/contants/general";
import React, { useState } from "react";

const ProductToolBox = ({ showNumb, totalNumb, onChangeSort, activeSort }) => {
  const onChangeTab = (e) => {
    onChangeSort(e.target.value);
  };
  return (
    <div className="toolbox">
      <div className="toolbox-left">
        {showNumb ? (
          <div className="toolbox-info">
            Showing <span>{`${showNumb} of ${totalNumb} `}</span>
            Products
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="toolbox-right">
        <div className="toolbox-sort">
          <label htmlFor="sortby">Sort by:</label>
          <Select
            defaultValue={SORT_OPTION?.popularity?.value}
            onClick={onChangeTab}
            options={[
              SORT_OPTION?.popularity,
              SORT_OPTION?.pricelow,
              SORT_OPTION?.pricehigh,
              SORT_OPTION?.newest,
              SORT_OPTION?.rating,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductToolBox;
