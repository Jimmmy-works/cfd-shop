import BreadCrumb from "@/components/Breadcrumb";
import { PATHS } from "@/contants/paths";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useProductDetail from "./useProductDetail";
import { fomatCurrency } from "@/utils/fomatCurrency";
import QuantityInput from "@/components/Input/QuantityInput";
import ShareLink from "@/components/ShareLink";
import ViewZoomImages from "@/components/ViewZoomImages";
const ProductDetail = ({}) => {
  const { dataProductDetail, productDetailForm, onAddToCart } =
    useProductDetail();
  const {
    id,
    name,
    slug: slugProductDetail,
    title,
    description,
    price,
    rating,
    stock,
    images,
    color,
    category,
  } = dataProductDetail || {};
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
                      ( 2 Reviews )
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
          <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="product-desc-link"
                  data-toggle="tab"
                  href="#product-desc-tab"
                  role="tab"
                  aria-controls="product-desc-tab"
                  aria-selected="true"
                >
                  Description
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="product-shipping-link"
                  data-toggle="tab"
                  href="#product-shipping-tab"
                  role="tab"
                  aria-controls="product-shipping-tab"
                  aria-selected="false"
                >
                  Shipping &amp; Returns
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="product-review-link"
                  data-toggle="tab"
                  href="#product-review-tab"
                  role="tab"
                  aria-controls="product-review-tab"
                  aria-selected="false"
                >
                  Reviews (2)
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="product-desc-tab"
                role="tabpanel"
                aria-labelledby="product-desc-link"
              >
                <div className="product-desc-content">
                  <h3>Product Information</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                    erat ut turpis. Suspendisse urna viverra non, semper
                    suscipit, posuere a, pede. Donec nec justo eget felis
                    facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                    Aenean dignissim pellentesque felis. Phasellus ultrices
                    nulla quis nibh. Quisque a lectus. Donec consectetuer ligula
                    vulputate sem tristique cursus.{" "}
                  </p>
                  <ul>
                    <li>
                      Nunc nec porttitor turpis. In eu risus enim. In vitae
                      mollis elit.{" "}
                    </li>
                    <li>Vivamus finibus vel mauris ut vehicula.</li>
                    <li>
                      Nullam a magna porttitor, dictum risus nec, faucibus
                      sapien.
                    </li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                    erat ut turpis. Suspendisse urna viverra non, semper
                    suscipit, posuere a, pede. Donec nec justo eget felis
                    facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                    Aenean dignissim pellentesque felis. Phasellus ultrices
                    nulla quis nibh. Quisque a lectus. Donec consectetuer ligula
                    vulputate sem tristique cursus.{" "}
                  </p>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="product-shipping-tab"
                role="tabpanel"
                aria-labelledby="product-shipping-link"
              >
                <div className="product-desc-content">
                  <h3>Delivery &amp; returns</h3>
                  <p>
                    We deliver to over 100 countries around the world. For full
                    details of the delivery options we offer, please view our{" "}
                    <a href="#">Delivery information</a>
                    <br /> We hope you’ll love every purchase, but if you ever
                    need to return an item you can do so within a month of
                    receipt. For full details of how to make a return, please
                    view our <a href="#">Returns information</a>
                  </p>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="product-review-tab"
                role="tabpanel"
                aria-labelledby="product-review-link"
              >
                <div className="reviews">
                  <h3>Reviews (2)</h3>
                  <div className="review">
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">Samanta J.</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                          </div>
                        </div>
                        <span className="review-date">6 days ago</span>
                      </div>
                      <div className="col">
                        <h4>Good, perfect size</h4>
                        <div className="review-content">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ducimus cum dolores assumenda asperiores
                            facilis porro reprehenderit animi culpa atque
                            blanditiis commodi perspiciatis doloremque,
                            possimus, explicabo, autem fugit beatae quae
                            voluptas!
                          </p>
                        </div>
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (2){" "}
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0){" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="review">
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">John Doe</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                        <span className="review-date">5 days ago</span>
                      </div>
                      <div className="col">
                        <h4>Very good</h4>
                        <div className="review-content">
                          <p>
                            Sed, molestias, tempore? Ex dolor esse iure hic
                            veniam laborum blanditiis laudantium iste amet. Cum
                            non voluptate eos enim, ab cumque nam, modi, quas
                            iure illum repellendus, blanditiis perspiciatis
                            beatae!
                          </p>
                        </div>
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (0){" "}
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0){" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
