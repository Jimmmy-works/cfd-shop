import { THUNK_STATUS } from "@/contants/general";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import { PATHS } from "@/contants/paths";
import { authenService } from "@/service/authenService";
import whiteListService from "@/service/whiteListService";
import { getProfile } from "@/store/reducer/authReducer";
import { updateCart } from "@/store/reducer/cartReducer";
import { whiteListActions } from "@/store/reducer/whiteListReducer";
import { fomatCurrency } from "@/utils/fomatCurrency";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const WishList = () => {
  const dispatch = useDispatch();
  const [renderProfile, setRenderProfile] = useState({});
  const { profile } = useSelector((state) => state.auth);
  const { whiteListInfo } = useSelector((state) => state.whitelist);

  const [errorImage, setErrorImage] = useState(false);
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";

  const { updateStatus, cartInfo } = useSelector((state) => state.cart);
  const onAddToCart = async (id) => {
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
          message.success(`Add to cart success`);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // const onDeleteWhiteList = async (productItem) => {
  //   const findIndexDelete = profile?.whiteList?.filter((whiteList, index) => {
  //     console.log("whiteList", whiteList);
  //     return whiteList?.id !== productItem?.id;
  //   });
  //   console.log("findIndexDelete", findIndexDelete);
  //   try {
  //     const payload = {
  //       ...profile,
  //       whiteList: findIndexDelete,
  //     };
  //     console.log("payload", payload);
  //     const res = await authenService.uploadProfile(payload);
  //     console.log("res", res);
  //     if (res?.data) {
  //       // dispatch(whiteListActions.setWhiteList(res));
  //       dispatch(getProfile());
  //       message.success(`Sản phẩm ${productItem?.name || ""} đã được xóa`);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     message.error(`Đã xảy ra lỗi xin vui lòng thử lại`);
  //   }
  // };
  const onDeleteWhiteList = async (productItem) => {
    const findIndexDelete = profile?.whiteList?.filter((whiteList, index) => {
      return whiteList?.id !== productItem?.id;
    });
    console.log("findIndexDelete", findIndexDelete);
    try {
      const res = await whiteListService.deleteWhiteList(productItem?.id);
      console.log("res", res);
      // if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
      if (res?.data) {
        setRenderProfile(res?.data?.data?.whiteList || {});
        dispatch(whiteListActions.setWhiteList(res));
        dispatch(getProfile());
        message.success(`Sản phẩm ${productItem?.name || ""} đã được xóa`);
      }
    } catch (error) {
      console.log("error", error);
      message.error(`Đã xảy ra lỗi xin vui lòng thử lại`);
    }
  };
  console.log("renderProfile", renderProfile);
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  console.log("whiteListInfo", whiteListInfo);
  console.log("profile", profile);
  return (
    <div
      className="tab-pane fade active show"
      id="tab-wishlist"
      role="tabpanel"
      aria-labelledby="tab-wishlist-link"
    >
      <table className="table table-wishlist table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {profile?.whiteList?.length ? (
            profile?.whiteList?.map((item) => {
              const { price, stock, name, images, slug, id } = item || {};
              return (
                <tr>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={`${PATHS.PRODUCT.INDEX}/${slug}`}>
                          <img
                            onError={() => setErrorImage(true)}
                            src={!errorImage ? images[0] : imageError}
                            alt="Product image"
                          />
                        </Link>
                      </figure>
                      <h3 className="product-title">
                        <Link to={`${PATHS.PRODUCT.INDEX}/${slug}`}>
                          {name}
                        </Link>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    ${fomatCurrency(price)}
                  </td>
                  <td className="stock-col text-center">
                    {!!stock > 0 ? (
                      <span className="in-stock">In stock </span>
                    ) : (
                      <span className="out-of-stock">Out stock</span>
                    )}
                  </td>
                  <td className="action-col">
                    <button
                      onClick={() => onAddToCart(id)}
                      className="btn btn-block btn-outline-primary-2"
                    >
                      <i className="icon-cart-plus" />
                      Add to Cart
                    </button>
                  </td>
                  <td className="remove-col">
                    <button
                      onClick={() => onDeleteWhiteList(item)}
                      className="btn-remove"
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>No whitelist has been yet.</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WishList;
