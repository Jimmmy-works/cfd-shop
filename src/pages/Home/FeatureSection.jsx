import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import ProductCard from "@/components/ProductCard";
import SkeletonLoading from "@/components/SkeletonLoading";
import { useDebounce } from "@uidotdev/usehooks";
const FeatureSection = ({
  categories,
  selectFeaturedSlug,
  featureProduct,
  onSelectFeaturedSlug,
  loadingProduct,
  loadingProductCategories,
}) => {
  const [renderFeaturedProducts, setRenderFeaturedProducts] = useState([]);

  const onChangeTab = (slug) => {
    if (selectFeaturedSlug === slug) return;
    setRenderFeaturedProducts([]);

    onSelectFeaturedSlug?.(slug);
  };

  useEffect(() => {
    const isLoading = setTimeout(() => {
      setRenderFeaturedProducts(featureProduct);
    }, 300);

    return () => {
      clearTimeout(isLoading);
    };
  }, [featureProduct, renderFeaturedProducts]);
  const allLoading = loadingProduct || loadingProductCategories;
  const myLoading = useDebounce(allLoading, 500);
  return (
    <div className="container top" style={{ minHeight: 488 }}>
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Featured Products</h2>
        </div>
        <div className="heading-right">
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            {categories?.length > 0 &&
              categories?.map((category, index) => {
                const { name, slug } = category;
                return (
                  <li key={slug || index} className="nav-item">
                    <a
                      onClick={() => onChangeTab(slug)}
                      className={`nav-link ${
                        selectFeaturedSlug === slug ? "active" : ""
                      }`}
                      id={`top-${slug}-link`}
                      data-toggle="tab"
                      href={`#top-${slug}-tab`}
                      role="tab"
                      aria-controls={`top-${slug}-tab`}
                      aria-selected={` ${
                        selectFeaturedSlug === slug ? "true" : "false"
                      }`}
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="tab-content tab-content-carousel just-action-icons-sm">
        <div
          className="tab-pane p-0 fade show active"
          id="top-all-tab"
          role="tabpanel"
          aria-labelledby="top-all-link"
          // style={{ minHeight: 520 }}
        >
          {renderFeaturedProducts?.length > 0 ? (
            <OwlCarousel
              nav={true}
              dots={false}
              loop={false}
              margin={20}
              mouseDrag={true}
              responsive={{
                0: {
                  items: 2,
                },
                480: {
                  items: 2,
                },
                768: {
                  items: 3,
                },
                992: {
                  items: 4,
                },
                1200: {
                  items: 5,
                },
              }}
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
            >
              {renderFeaturedProducts?.length > 0 &&
                renderFeaturedProducts?.map((category, index) => {
                  return (
                    <ProductCard
                      product={category}
                      key={category?.id || index}
                    />
                  );
                })}
            </OwlCarousel>
          ) : (
            <SkeletonLoading isParagraph={10} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
