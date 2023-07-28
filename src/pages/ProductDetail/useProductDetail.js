import { useMainContext } from "@/components/MainContext";
import { THUNK_STATUS } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import useQuery from "@/hooks/useQuery";
import orderService from "@/service/orderService";
import productService from "@/service/productService";
import { updateCart } from "@/store/reducer/cartReducer";
import { message } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { cartInfo, updateStatus } = useSelector((state) => state.cart);
  const { handleOpenAuthenModalLayout } = useMainContext();
  const productDetailForm = useForm();
  const { data: dataProductDetail, loading: loadingProductDetail } = useQuery(
    () => productService.getProductBySlug(slug),
    [slug]
  );
  const onAddToCart = async (quantityValue) => {
    const isLogin = localStorage.getItem(LOCAL_STORAGE.token);
    const id = dataProductDetail?.id;
    if (!isLogin) {
      handleOpenAuthenModalLayout();
    } else if (dataProductDetail?.id && updateStatus !== THUNK_STATUS.pending) {
      try {
        let newPayload = {};
        if (cartInfo?.id) {
          const matchIndex = cartInfo?.product?.findIndex(
            (product) => product?.id === dataProductDetail?.id
          );
          //// Current Payload
          const currentColor = productDetailForm.getValues("color");
          //// New Payload
          const newProductPayload = cartInfo?.product.map(
            (product) => product?.id
          );
          const newQuantityPayload = [...cartInfo?.quantity];
          const newColorPayload = [...(cartInfo?.color ?? [])];
          if (matchIndex > -1) {
            newQuantityPayload[matchIndex] = (
              Number(newQuantityPayload[matchIndex]) + Number(quantityValue)
            ).toString();
            newColorPayload[matchIndex];
            newPayload = {
              ...cartInfo,
              product: newProductPayload,
              quantity: newQuantityPayload,
            };
          } else {
            newProductPayload.push(id);
            newQuantityPayload.push(quantityValue);
            newColorPayload.push(currentColor);
          }
          newPayload = {
            product: newProductPayload,
            quantity: newQuantityPayload,
            color: newColorPayload,
            subTotal: 0,
            total: 0,
            totalProduct: ["string"],
            discount: 0,
            paymentMethod: "string",
          };
        } else {
          newPayload = {
            product: [id],
            quantity: [quantityValue],
          };
        }
        const res = await dispatch(updateCart(newPayload)).unwrap();
        if (res?.id) {
          message.success(`Đã thêm sản phẩm vào giỏ hàng`);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const { data: dataReview, refetch: refetchReview } = useQuery(
    orderService.getReviewById
  );

  useEffect(() => {
    if (dataProductDetail?.id) {
      refetchReview(dataProductDetail?.id);
    }
  }, [dataProductDetail]);

  return {
    dataReview,
    dataProductDetail,
    loadingProductDetail,
    productDetailForm,
    onAddToCart,
  };
};

export default useProductDetail;
