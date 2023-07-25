import React, { useEffect } from "react";
import useDashboard from "./useDashboard";
import OrderList from "./OrderList";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/paths";
import { useDispatch, useSelector } from "react-redux";
import orderService from "@/service/orderService";
import { authActions } from "@/store/reducer/authReducer";
const Order = () => {
  const dispatch = useDispatch();
  const { listOrder } = useSelector((state) => state.auth);
  const getOrders = async () => {
    try {
      const res = await orderService.getOrderMe();
      console.log("res", res);
      if (res?.data?.data) {
        dispatch(authActions.setOrder(res.data.data));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  if (!listOrder) return null;
  return (
    <>
      <div
        className="tab-pane fade active show"
        id="tab-orders"
        role="tabpanel"
        aria-labelledby="tab-orders-link"
      >
        {listOrder?.orders?.length ? (
          listOrder?.orders?.map((orderList) => {
            return <OrderList orderList={orderList} />;
          })
        ) : (
          <>
            <p>No order has been made yet.</p>
            <Link
              to={`${PATHS.PRODUCT.INDEX}`}
              className="btn btn-outline-primary-2"
            >
              <span>GO SHOP</span>
              <i className="icon-long-arrow-right" />
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Order;
