import React from "react";
import { useMainContext } from "../MainContext";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store/reducer/authReducer";
import { cartActions, updateCart } from "@/store/reducer/cartReducer";
import { message } from "antd";
import { useGoogleLogout } from "react-google-login";

const useHeader = () => {
  const { handleOpenAuthenModalLayout, signOut, userGoogle } = useMainContext();
  const { cartInfo } = useSelector((state) => state.cart || {});
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions?.logout());
    dispatch(cartActions?.clearCart());
    signOut();
  };
  const handleRemoveProductCart = async (removeProductId) => {
    if (removeProductId) {
      let cartPayload = {};
      const findRemoveIndex = cartInfo?.product?.findIndex((productRemove) => {
        return productRemove?.id === removeProductId;
      });
      if (findRemoveIndex > -1) {
        const newProductPayload = cartInfo?.product?.filter(
          (product, index) => index !== findRemoveIndex
        );
        const newQuantityPayload = cartInfo?.quantity?.filter(
          (quantity, index) => index !== findRemoveIndex
        );
        cartPayload = {
          ...cartInfo,
          product: newProductPayload?.map((product) => product?.id),
          quantity: newQuantityPayload,
        };

        const res = await dispatch(updateCart(cartPayload)).unwrap();
        if (res?.id) {
          message.success(`Sản phẩm đã được xóa`);
          // message.success(`${cartInfo?.product[findProductRemove]}`);
        }
      } else {
        message.success(`Không có sản phẩm nào để xóa`);
      }
    }
  };
  const headerMiddleProps = {
    products: cartInfo?.product?.map((product, index) => {
      return {
        ...product,
        quantity: cartInfo?.quantity?.[index] || 1,
      };
    }),
    total: cartInfo?.total,
    totalProduct: cartInfo?.totalProduct,
    handleLogout,
    cartInfo,
    handleRemoveProductCart,
  };
  const headerTopProps = {
    profile,
    handleLogout,
    handleOpenAuthenModalLayout,
    userGoogle,
  };
  return {
    headerTopProps,
    headerMiddleProps,
  };
};

export default useHeader;
