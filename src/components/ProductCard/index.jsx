import { PATHS } from "@/contants/paths";
import { fomatCurrency } from "@/utils/fomatCurrency";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Skeleton, message } from "antd";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { useMainContext } from "../MainContext";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { THUNK_STATUS } from "@/contants/general";
import { getCart, updateCart } from "@/store/reducer/cartReducer";
import { useDebounce } from "@uidotdev/usehooks";
import SkeletonLoading from "../SkeletonLoading";
const ImageWrapper = styled.div`
  .ant-image {
    display: block;
  }
`;
const ProductCard = ({ product, isProductLoading }) => {
  const [errorImage, setErrorImage] = useState(false);
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";

  const container = {
    hidden: { opacity: 0, top: 50 },
    show: {
      opacity: 1,
      top: 0,
      transition: { duration: 0.4 },
    },
  };
  const { updateStatus } = useSelector((state) => state.cart);
  const { cartInfo } = useSelector((state) => state.cart);
  const { slug, title, id, images, rating } = product || {};
  const dispatch = useDispatch();
  const onAddToCart = async () => {
    const isLogin = localStorage.getItem(LOCAL_STORAGE.token);
    try {
      if (!isLogin) {
        handleOpenAuthenModalLayout();
      } else if (id && updateStatus !== THUNK_STATUS.pending) {
        let cartPayload = {};
        if (cartInfo.id) {
          const matchIndex = cartInfo?.product?.findIndex(
            (productMatched) => productMatched?.id === id
          );
          // mọi động tác đều cần đến ID => phải có id hiện thời của product để xử lí
          // const newProductPayload = cartInfo?.product?.map(
          //   (product) => product?.id
          // );
          const newProductPayload = cartInfo?.product?.map(
            (product) => product?.id
          );

          const newQuantityPayload = [...cartInfo?.quantity];

          if (matchIndex > -1) {
            newQuantityPayload[matchIndex] = (
              Number(newQuantityPayload[matchIndex]) + 1
            ).toString();
          } else {
            newProductPayload.push(id);
            newQuantityPayload.push("1");
          }
          cartPayload = {
            ...cartInfo,
            quantity: newQuantityPayload,
            product: newProductPayload,
          };
        } else {
          cartPayload = {
            product: [id],
            quantity: ["1"],
          };
        }
        const resUpdateCart = await dispatch(updateCart(cartPayload)).unwrap();
        if (resUpdateCart?.id) {
          message?.success(`Add to cart success`);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <motion.div
      variants={container}
      animate={`show`}
      initial={`hidden`}
      className="product product-2"
    >
      <ImageWrapper className="product-media">
        <Link
          to={PATHS.PRODUCT.INDEX + `/${slug}`}
          style={{ minHeight: 275, display: "flex" }}
        >
          {images?.length ? (
            <img
              src={!errorImage ? images[0] : imageError}
              onError={() => setErrorImage(true)}
              alt="Product image"
              className="product-image"
              style={{ display: " flex", objectFit: "cover" }}
            />
          ) : (
            <Image
              className="ant-image"
              width={"100%"}
              height={"100%"}
              fallback="https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280"
            />
          )}

          {/* {images?.length || !errorImage ? (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
              style={{ display: " flex", objectFit: "cover" }}
            />
        
          ) : (
            <Image
              onError={() => setErrorImage(true)}
              className="ant-image"
              width={"100%"}
              height={"100%"}
              fallback="https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280"
            />
          )
        
          } */}
        </Link>
        <div className="product-action-vertical">
          <a className="btn-product-icon btn-wishlist btn-expandable">
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a
            style={{ zIndex: 1000 }}
            className="btn-product btn-cart"
            onClick={onAddToCart}
            title="Add to cart"
          >
            <span>add to cart</span>
          </a>
        </div>
      </ImageWrapper>
      <div className="product-body">
        <h3
          className="product-title"
          style={{
            height: "42.2px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <Link to={PATHS.PRODUCT.INDEX + `/${slug}`}>{product?.name}</Link>
        </h3>
        <div className="product-price">${fomatCurrency(product?.price)} </div>
        <div className="ratings-container">
          <div className="ratings">
            <div className="ratings-val" style={{ width: `${rating * 20}%` }} />
          </div>
          <span className="ratings-text">( 2 Reviews )</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
