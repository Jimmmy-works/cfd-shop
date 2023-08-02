import ProductCard from "@/components/ProductCard";
import React, { useCallback, useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { HOT_PRODUCT_TAB } from "./useHome";
import SkeletonLoading from "@/components/SkeletonLoading";
import useDebounce from "@/hooks/useDebounce";
import { libraryFunc } from "@/assets/js/main";
const HotProductSection = ({
  onSelectHotProductTab,
  selectHotProductTab,
  hotProducts,
  refetchProduct,
  loadingProduct,
  loadingProductCategories,
  loadingHome,
}) => {
  const [renderProducts, setRenderProducts] = useState([]);
  const skeletonLoading = () => {
    return (
      <SkeletonLoading
        // isClassName="product product-2"
        isClassName="col-6 col-md-4 col-lg-4"
        isData={renderProducts}
        isArray={9}
        isParagraph={2}
        isLoading={myLoading}
        itemStyles={{ width: "100%" }}
      />
    );
  };
  const onChangeTab = (tabs) => {
    if (tabs === selectHotProductTab) return;
    setRenderProducts([]);
    onSelectHotProductTab?.(tabs);
  };
  useEffect(() => {
    if (hotProducts?.length) return setRenderProducts(hotProducts);
    const isLoading = setTimeout(() => {
      setRenderProducts(hotProducts);
    }, 300);
    return () => {
      clearTimeout(isLoading);
    };
  }, [renderProducts, hotProducts]);
  const allLoading = loadingProduct || loadingProductCategories || loadingHome;
  const myLoading = useDebounce(allLoading, 500);
  return (
    <div className="container featured" style={{ minHeight: 580 }}>
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectHotProductTab === HOT_PRODUCT_TAB.featured ? "active" : ""
            }`}
            onClick={() => onChangeTab(HOT_PRODUCT_TAB.featured)}
          >
            Featured
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectHotProductTab === HOT_PRODUCT_TAB.sale ? "active" : ""
            }`}
            onClick={() => onChangeTab(HOT_PRODUCT_TAB.sale)}
          >
            On Sale
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              selectHotProductTab === HOT_PRODUCT_TAB.top ? "active" : ""
            }`}
            onClick={() => onChangeTab(HOT_PRODUCT_TAB.top)}
          >
            Top Rated
          </a>
        </li>
      </ul>
      <div className="tab-content tab-content-carousel">
        <div
          className={`tab-pane p-0 fade 
         ${renderProducts?.length > 0 ? "show active" : ""}`}
          id="products-featured-tab"
          role="tabpanel"
          aria-labelledby="products-featured-link"
        >
          {!myLoading && renderProducts?.length ? (
            <OwlCarousel
              nav={true}
              dots={true}
              loop={false}
              margin={20}
              mouseDrag={true}
              responsive={{
                0: {
                  items: 2,
                },
                600: {
                  items: 2,
                },
                992: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
            >
              {renderProducts?.length &&
                renderProducts?.map((hotProduct, index) => {
                  return (
                    <ProductCard
                      product={hotProduct}
                      key={hotProduct?.id || index}
                    />
                  );
                })}
            </OwlCarousel>
          ) : (
            <div>
              <SkeletonLoading
                isClassName="product product-2"
                isData={renderProducts}
                isArray={1}
                isParagraph={2}
                isLoading={myLoading}
                itemStyles={{ width: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotProductSection;
