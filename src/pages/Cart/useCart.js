import { SHIPPING_OPTIONS, THUNK_STATUS } from "@/contants/general";
import useForceRender from "@/hooks/useForceRender";
import { updateCart } from "@/store/reducer/cartReducer";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export const useCart = () => {
  const { cartInfo, updateStatus } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [productCurrent, setProductCurrent] = useState([]);
  const rerender = useForceRender();
  const { profile } = useSelector((state) => state.auth);
  /// Cart Table Props
  useEffect(() => {
    const { product, quantity } = cartInfo || {};
    if (product && quantity) {
      const modifyProducts = product?.map((productItem, index) => {
        return {
          ...productItem,
          quantity: quantity[index],
        };
      });
      setProductCurrent(modifyProducts);
    }
  }, [cartInfo]);
  const onUpdateQuantity = async (updateValue, updateIndex) => {
    const updateProduct =
      productCurrent.map((product, index) => {
        return updateIndex === index
          ? {
              ...product,
              quantity: updateValue,
            }
          : {
              ...product,
            };
      }) || [];
    if (
      cartInfo?.id &&
      updateStatus !== THUNK_STATUS.pending &&
      updateProduct?.length > 0
    ) {
      try {
        let newPayload = {};
        const newProductPayload = updateProduct.map((product) => {
          return product?.id;
        });
        const newQuantityPayload = updateProduct.map((product) => {
          return (product?.quantity).toString();
        });
        newPayload = {
          ...cartInfo,
          product: newProductPayload,
          quantity: newQuantityPayload,
        };
        const res = await dispatch(updateCart(newPayload)).unwrap();
        setProductCurrent(updateProduct);
      } catch (error) {
        console.log("error", error);
        message.error(`Đã xảy ra lỗi, vui lòng thử lại sau`);
        rerender();
      }
    }
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
  const cartTableProps = {
    product: productCurrent,
    cartInfo,
    onUpdateQuantity,
    handleRemoveProductCart,
  };
  //// CartSumary Props
  const onUpdateShipping = async (value) => {
    const selectedShipping = SHIPPING_OPTIONS?.find(
      (option) => option?.value === value
    );
    if (
      cartInfo?.id &&
      updateStatus === THUNK_STATUS.fulfilled &&
      selectedShipping
    ) {
      try {
        let newPayload = {};
        const newProductPayload = cartInfo?.product?.map(
          (product) => product?.id
        );
        newPayload = {
          ...cartInfo,
          product: newProductPayload,
          shipping: {
            typeShip: selectedShipping?.value,
            price: selectedShipping?.price,
          },
        };
        const res = await dispatch(updateCart(newPayload)).unwrap();
      } catch (error) {
        console.log("error", error);
        message.error(`Đã xảy ra lỗi, xin vui lòng thử lại`);
      }
    }
  };
  const cartSumaryProps = {
    total: cartInfo?.total,
    subTotal: cartInfo?.subTotal,
    onUpdateShipping,
    typeShip: cartInfo?.shipping?.typeShip,
    priceShip: cartInfo?.shipping?.price,
    profile,
  };
  return { cartTableProps, cartSumaryProps };
};
