import React, { useEffect } from "react";
import useDashboard from "./useDashboard";
import OrderList from "./OrderList";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/paths";
const Order = () => {
  const { orderProps } = useDashboard();
  const { orderMeData, executeReview, dataReview } = orderProps || {};
  const { orders } = orderMeData || [];

  return (
    <>
      <div
        className="tab-pane fade active show"
        id="tab-orders"
        role="tabpanel"
        aria-labelledby="tab-orders-link"
      >
        {orders?.length ? (
          orders?.map((orderList) => {
            return (
              <OrderList
                dataReview={dataReview}
                executeReview={executeReview}
                orderList={orderList}
              />
            );
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
