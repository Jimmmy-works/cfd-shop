import { PATHS } from "@/contants/paths";
import { fomatCurrency } from "@/utils/fomatCurrency";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../Button";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/reducer/cartReducer";
import { Image, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { styled } from "styled-components";
import ProductCardDetail from "../ProductCardDetail";
const ImageWrapper = styled.div`
  .ant-image {
    display: block;
  }
`;
const HeaderMiddle = ({
  products,
  total,
  totalProduct,
  handleRemoveProductCart,
}) => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem(LOCAL_STORAGE.token);
  const onRemoveProuductCart = (product) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <p>{`${product?.name || ""}`}</p>
          <p>{`${product?.quantity} x ${product?.price}`}</p>
        </>
      ),
      onOk() {
        handleRemoveProductCart(product?.id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    if (!isLogin) {
      dispatch(cartActions?.clearCart());
    }
  }, [isLogin]);

  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button className="mobile-menu-toggler">
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <NavLink to={PATHS.HOME} className="logo">
            <img
              src="/src/assets/images/logo.svg"
              alt="Molla Logo"
              width={160}
            />
          </NavLink>
        </div>
        <nav className="main-nav">
          <ul className="menu">
            <li>
              <NavLink to={PATHS.HOME}>Home</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCT.INDEX}>Product</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG.INDEX}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          {/* <div className="header-search">
            <a href="#" className="search-toggle" role="button" title="Search">
              <i className="icon-search" />
            </a>
            <form action="#" method="get">
              <div className="header-search-wrapper">
                <label htmlFor="q" className="sr-only">
                  Search
                </label>
                <input
                  type="search"
                  className="form-control"
                  name="q"
                  id="q"
                  placeholder="Search in..."
                  required=""
                />
              </div>
            </form>
          </div> */}
          <div className="dropdown cart-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <i className="icon-shopping-cart" />
              {totalProduct && (
                <span className="cart-count">{totalProduct}</span>
              )}
            </a>
            <div
              style={{ overflowY: "scroll", maxHeight: 500 }}
              className="dropdown-menu dropdown-menu-right"
            >
              <div className="dropdown-cart-products">
                {products?.length > 0 &&
                  products?.map((product, index) => {
                    return (
                      <div key={product?.id || index} className="product">
                        <div className="product-cart-details">
                          <h4 className="product-title">
                            <Link
                              style={{
                                display: "-webkit-box",
                                webkitLineClamp: "2",
                                webkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: " ellipsis",
                              }}
                              to={`${PATHS.PRODUCT.INDEX}/${product?.slug}`}
                            >
                              {product?.name || ""}
                            </Link>
                          </h4>
                          <span className="cart-product-info">
                            <span className="cart-product-qty">
                              {product?.quantity}
                            </span>{" "}
                            x ${product?.price}
                          </span>
                        </div>
                        <figure className="product-image-container">
                          <Link
                            to={`${PATHS.PRODUCT.INDEX}/${product?.slug}`}
                            className="product-image"
                          >
                            <ImageWrapper>
                              <Image
                                fallback="https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280"
                                alt="product"
                              />
                            </ImageWrapper>
                            {/* )} */}
                          </Link>
                        </figure>
                        <a
                          onClick={() => onRemoveProuductCart(product)}
                          className="btn-remove"
                          title="Remove Product"
                        >
                          <i className="icon-close" />
                        </a>
                      </div>
                    );
                  })}
              </div>
              <div className="dropdown-cart-total">
                <span>Total</span>
                <span className="cart-total-price">
                  ${fomatCurrency(total)}
                </span>
              </div>
              <div
                style={{ display: "flex", gap: 6 }}
                className="dropdown-cart-action"
              >
                {products?.length > 0 ? (
                  <>
                    <Button link={PATHS.CART}>View Cart</Button>
                    <Button link={PATHS.CHECKOUT.DETAIL} variant="outline">
                      <span>CHECKOUT</span>
                      <i className="icon-long-arrow-right" />
                    </Button>
                  </>
                ) : (
                  <p>There no product in cart</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
