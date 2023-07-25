import { PATHS } from "@/contants/paths";
import { Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ImageWrapper = styled.div`
  .ant-image {
    display: block;
  }
`;
const ProductCardDetail = ({ product, onRemoveProuductCart }) => {
  return (
    <div className="product">
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
          <span className="cart-product-qty">{product?.quantity}</span> x $
          {product?.price}
        </span>
      </div>
      <figure className="product-image-container">
        <Link
          to={`${PATHS.PRODUCT.INDEX}/${product?.slug}`}
          className="product-image"
        >
          {/* {!product?.images.length > 0 ? (
            <img src="/images/product/OiHydtocbOywzTY4eIS3i-download.jpg" />
          ) : ( */}
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
};

export default ProductCardDetail;
