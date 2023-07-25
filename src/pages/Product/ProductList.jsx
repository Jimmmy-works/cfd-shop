import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import useDebounce from "@/hooks/useDebounce";
import useDebounceHook from "@/hooks/useDebounceHook";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import SkeletonLoading from "@/components/SkeletonLoading";
const ProductList = ({
  isProductLoading,
  isProductError,
  products,
  isProductCategoriesLoading,
  search,
}) => {
  const container = {
    hidden: { opacity: 0, top: 100 },
    show: {
      opacity: 1,
      top: 0,
      transition: { duration: 0.4 },
    },
  };
  if ((!isProductLoading && products?.length < 1) || isProductError) {
    return (
      <div className="products mb-3">
        <div
          style={{
            minHeight: 250,
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
          }}
          className="row justify-content-center"
        >
          There is no products
        </div>
      </div>
    );
  }
  const allLoading = isProductCategoriesLoading || isProductLoading;
  const isLoading = useDebounce(allLoading, 400);

  return (
    <div className="products mb-3">
      <div className="row justify-content-center">
        {!isLoading ? (
          products?.length > 0 &&
          products?.map((product, index) => {
            return (
              <motion.div
                variants={container}
                animate={`show`}
                initial={`hidden`}
                // animate={{ y: 0 }}
                // initial={{ y: -100 }}
                key={product?.id || index}
                className="col-6 col-md-4 col-lg-4"
              >
                <ProductCard product={product} />
              </motion.div>
            );
          })
        ) : (
          <SkeletonLoading
            isClassName='  "col-6 col-md-4 col-lg-4'
            isData={products}
            isArray={9}
            isParagraph={2}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
