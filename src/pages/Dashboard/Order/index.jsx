import React, { useEffect } from "react";
import OrderList from "./OrderList";
import { useDispatch, useSelector } from "react-redux";
import orderService from "@/service/orderService";
import { authActions } from "@/store/reducer/authReducer";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/paths";

const Order = () => {
  const dispatch = useDispatch();
  const { listOrder } = useSelector((state) => state.auth);
  const getOrderMe = async () => {
    try {
      const res = await orderService.getOrderMe();
      if (res?.data?.data) {
        dispatch(authActions.setOrder(res?.data?.data));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getOrderMe();
  }, []);
  return (
    <div
      className="tab-pane fade active show"
      id="tab-orders"
      role="tabpanel"
      aria-labelledby="tab-orders-link"
    >
      {!listOrder?.orders?.length > 0 ? (
        <>
          <p>No order has been made yet.</p>
          <Link to={PATHS.PRODUCT.INDEX} className="btn btn-outline-primary-2">
            <span>GO SHOP</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </>
      ) : (
        <OrderList getOrderMe={getOrderMe} listOrder={listOrder?.orders} />
      )}
    </div>
  );
};

export default Order;
