import React from "react";
import ProductFilter from "./ProductFilter";
import BreadCrumb from "@/components/Breadcrumb";
import ProductToolBox from "./ProductToolBox";
import ProductList from "./ProductList";

import { Link } from "react-router-dom";
import { PATHS } from "@/contants/paths";
import useProduct from "./useProduct";
import Pagination from "@/components/Pagination";

const Product = () => {
  const {
    productListProps,
    productToolBoxProps,
    paginationProps,
    productFilterProps,
  } = useProduct();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <BreadCrumb className={`mb-2`}>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive={true}>Product</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolBox {...productToolBoxProps} />
              <ProductList {...productListProps} />
              <Pagination {...paginationProps} />
            </div>
            <ProductFilter {...productFilterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
