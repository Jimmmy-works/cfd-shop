import BreadCrumb from "@/components/Breadcrumb";
import { PATHS } from "@/contants/paths";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useProductDetail from "./useProductDetail";
import { fomatCurrency } from "@/utils/fomatCurrency";
import QuantityInput from "@/components/Input/QuantityInput";
import ShareLink from "@/components/ShareLink";
import ViewZoomImages from "@/components/ViewZoomImages";
import Tab from "@/components/Tab/Tab";
import ProductDetailReview from "./ProductDetailReview";
const ProductDetail = ({}) => {
  const {
    dataReview,
    dataProductDetail,
    loadingProductDetail,
    productDetailForm,
    onAddToCart,
  } = useProductDetail();
  const {
    id,
    name,
    slug: slugProductDetail,
    title,
    description,
    shippingReturn,
    price,
    rating,
    stock,
    images,
    color,
    category,
  } = dataProductDetail || {};
  console.log("dataProductDetail", dataProductDetail);
  const shareURL = window.location.href;
  const [quantityValue, setQuantityValue] = useState("1");
  return (
    <main className="main">
      <BreadCrumb className={`mb-2`}>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item>
          <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive={true}>{slugProductDetail}</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="container">
          <div className="product-details-top">
            <div className="row">
              <div className="col-md-6">
                <ViewZoomImages images={images ?? []} />
              </div>
              <div className="col-md-6">
                <div className="product-details">
                  <h1 className="product-title">{name}</h1>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div
                        className="ratings-val"
                        style={{ width: `${rating * 100}%` }}
                      />
                    </div>
                    <a
                      className="ratings-text"
                      href="#product-review-link"
                      id="review-link"
                    >
                      ( {dataReview?.length} )
                    </a>
                  </div>
                  <div className="product-price"> ${fomatCurrency(price)} </div>
                  <div
                    className="product-content"
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                  <div className="details-filter-row details-row-size">
                    <label>Color:</label>
                    <div className="product-nav product-nav-dots">
                      {color?.length &&
                        color.map((colorItem, index) => {
                          return (
                            <div
                              onClick={() =>
                                productDetailForm?.setValue("color", colorItem)
                              }
                              key={index}
                              className="product-nav-item"
                              style={{ background: `${colorItem}` }}
                            >
                              <span className="sr-only">Color name</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Qty:</label>
                    <div className="product-details-quantity">
                      <QuantityInput
                        onChange={(value) => setQuantityValue(value)}
                        max={stock}
                      ></QuantityInput>
                    </div>
                  </div>
                  <div className="product-details-action">
                    <a
                      onClick={() => onAddToCart(quantityValue)}
                      className="btn-product btn-cart"
                    >
                      <span>add to cart</span>
                    </a>
                    <div className="details-action-wrapper">
                      <a
                        href="#"
                        className="btn-product btn-wishlist"
                        title="Wishlist"
                      >
                        <span>Add to Wishlist</span>
                      </a>
                    </div>
                  </div>
                  <div className="product-details-footer">
                    <div className="product-cat">
                      <span>Category:</span>
                      <Link to={PATHS.PRODUCT.INDEX}> {category?.name}</Link>
                    </div>
                    <div
                      style={{ gap: "5px" }}
                      className="social-icons social-icons-sm"
                    >
                      <span className="social-label">Share:</span>
                      <ShareLink type="facebook" path={shareURL}>
                        <i className="icon-facebook-f" />
                      </ShareLink>
                      <ShareLink type="twitter" path={shareURL} title="Twitter">
                        <i className="icon-twitter" />
                      </ShareLink>
                      <ShareLink
                        path={shareURL}
                        type="facebook"
                        title="Instagram"
                      >
                        <i className="icon-instagram" />
                      </ShareLink>
                      <ShareLink
                        path={shareURL}
                        type="pinterest"
                        title="Pinterest"
                      >
                        <i className="icon-pinterest" />
                      </ShareLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tab>
            <Tab.Header>
              <Tab.HeaderItem>Description</Tab.HeaderItem>
              <Tab.HeaderItem>Shipping &amp Returns</Tab.HeaderItem>
              <Tab.HeaderItem>Review ({dataReview?.length})</Tab.HeaderItem>
            </Tab.Header>
            <Tab.Content>
              <Tab.ContentItem>
                <div
                  className="product-desc-content"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              </Tab.ContentItem>
              <Tab.ContentItem>
                <div
                  className="product-desc-content"
                  dangerouslySetInnerHTML={{ __html: shippingReturn }}
                ></div>
              </Tab.ContentItem>
              <Tab.ContentItem>
                <ProductDetailReview dataReview={dataReview} />
              </Tab.ContentItem>
            </Tab.Content>
          </Tab>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
