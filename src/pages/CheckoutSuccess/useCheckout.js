import { PAYMENT_MENTHOD, THUNK_STATUS } from "@/contants/general";
import { PATHS } from "@/contants/paths";
import checkoutService from "@/service/checkoutService";
import { cartActions } from "@/store/reducer/cartReducer";
import { checkout, getOrder } from "@/store/reducer/orderReducer";
import { mapAddress } from "@/utils/convert";
import { message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useCheckout = () => {
  const { cartInfo } = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { checkoutStatus } = useSelector((state) => state.order);
  const form = useForm();
  const navigate = useNavigate();
  // Checkout Coupon Props
  const onAddCoupon = async (coupon) => {
    if (coupon) {
      try {
        const res = await checkoutService.getCoupon(coupon);
        const couponInfo = res?.data?.data;
        const newPayload = {
          ...cartInfo,
          discountCode: couponInfo?.code || "",
          discount: couponInfo?.value || 0,
          total:
            cartInfo?.subTotal -
            (couponInfo?.value || 0) +
            (cartInfo?.shipping?.price || 0),
        };
        dispatch(cartActions.updateCacheCart(newPayload));
        message.success(`Coupon ${coupon} sử dụng thành công`);
      } catch (error) {
        console.log("error", error);
        message.error(`Coupon đã được sử dụng hoặc không tồn tại`);
      }
    }
  };
  const onRemoveCoupon = async (callback) => {
    try {
      const newPayload = {
        ...cartInfo,
        discountCode: "",
        discount: 0,
        total: cartInfo?.subTotal + (cartInfo?.shipping?.price || 0),
      };
      dispatch(cartActions.updateCacheCart(newPayload));
      message.success(`Xóa coupon thành công`);
      callback();
    } catch (error) {
      console.log("error", error);
      message.error(`Không có coupon `);
    }
  };
  const couponCheckoutProps = {
    onAddCoupon,
    onRemoveCoupon,
    isCoupon: cartInfo.discountCode,
    isCouponDiscout: cartInfo.discount,
  };

  //Checkout Sumary Props
  const [paymetMethod, setPaymentMethod] = useState(
    cartInfo?.paymetMethod || PAYMENT_MENTHOD.cash
  );
  const modProduct = cartInfo?.product?.map((product, index) => {
    return {
      ...product,
      quantity: cartInfo?.quantity?.[index],
    };
  });
  const onCheckout = async () => {
    const {
      shipping,
      subTotal,
      product,
      totalProduct,
      discountCode,
      quantity,
      discount,
      total,
      variant,
    } = cartInfo || {};
    const { phone, email, fullName, street, note } = form?.getValues() || {};
    const productPayload = product?.map((prouductItem) => prouductItem?.id);
    const orderPayload = {
      address: {
        phone: phone || "",
        email: email || "",
        fullName: fullName || "",
        street: street || "",
      },
      product: productPayload,
      shipping: shipping,
      variant: variant,
      subTotal: subTotal,
      quantity: quantity,
      total: total,
      totalProduct: totalProduct,
      discountCode: discountCode,
      discount: discount,
      paymentMethod: paymetMethod || "",
      note: form.watch("note") || "",
    };
    try {
      if (
        orderPayload?.product?.length > 0 &&
        checkoutStatus !== THUNK_STATUS.pending
      ) {
        const res = dispatch(checkout(orderPayload)).unwrap();
        if (res) {
          message.success(`Đơn hàng đã được xác nhận`);
          navigate(`${PATHS.CHECKOUT.INDEX}?id=${res?.id}`);
          dispatch(cartActions.clearCart());
        } else {
          message.error(
            `Đã xảy ra lỗi, hãy kiểm tra đầy đủ các thông tin đặt hàng`
          );
        }
      }
    } catch (error) {
      console.log("error", error);
      message.error(
        `Đã xảy ra lỗi, hãy kiểm tra đầy đủ các thông tin đặt hàng`
      );
    }
  };
  const onPlaceOrder = () => {
    if (!!!cartInfo?.shipping?.typeShip) {
      message?.error(`Xin vui lòng chọn phương thức vận chuyển`);
    } else if (!!!paymetMethod) {
      message?.error(`Xin vui lòng chọn phương thức thanh toán`);
    } else if (!!!cartInfo?.product?.length) {
      message?.error(`Không có sản phẩm để thanh toán`);
    } else {
      const checkout = form?.handleSubmit(onCheckout);
      checkout();
    }
  };

  useEffect(() => {
    if (Object.values(PAYMENT_MENTHOD).includes(cartInfo?.paymetMethod)) {
      setPaymentMethod(cartInfo?.paymetMethod);
    }
  }, [cartInfo?.paymetMethod]);

  const checkoutSumaryProps = {
    cartInfo,
    modProduct,
    onPlaceOrder,
    paymetMethod,
    onChangePaymentMethod: setPaymentMethod,
  };
  const mapAddressM = (provinces, districts, wards) => {
    const findProvince = provinces?.find((province) => {
      return province.value === form.watch("province") || "";
    });
    const findDistrict = districts?.find((district) => {
      return district.value === form.watch("district") || "";
    });
    const findWard = wards?.find((ward) => {
      return ward.value === form.watch("ward") || "";
    });

    return { findDistrict, findProvince, findWard };
  };
  useEffect(() => {
    if (profile?.id) {
      const payload =
        {
          fullName: profile?.firstName,
          email: profile?.email,
          phone: profile?.phone,
          province: profile?.province,
          district: profile?.district,
          street: profile?.treet,
          ward: profile?.ward,
        } || {};
      form?.reset(payload);
    }
  }, [profile]);
  // Checkout Billing Detail

  const checkoutBillingDetail = { form, profile: profile || {}, mapAddressM };
  return { couponCheckoutProps, checkoutSumaryProps, checkoutBillingDetail };
};
export default useCheckout;
