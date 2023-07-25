import React, { useEffect, useState } from "react";
import useDashboard from "./useDashboard";
import { fomatCurrency } from "@/utils/fomatCurrency";
import OrderItem from "./OrderItem";
import { Collapse } from "antd";
import OrderItemHead from "./OrderItemHead";
import OrderItemFooter from "./OrderItemFooter";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/store/reducer/orderReducer";

const OrderList = ({ orderList, executeReview, dataReview }) => {
  const {
    product,
    quantity,
    total,
    id,
    shipping,
    discount,
    isReview,
    createdAt,
  } = orderList || {};
  const dispatch = useDispatch();
  const { orderInfo } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrder());
  }, [JSON.stringify(orderInfo)]);
  const items = [
    {
      key: 1,
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{id}</span>
          <span></span>
          <span>{moment(`${createdAt}`).startOf("hour").fromNow()}</span>
        </div>
      ),
      children: (
        <>
          <OrderItemHead />
          <OrderItem
            dataReview={dataReview}
            executeReview={executeReview}
            {...orderList}
          />
          <OrderItemFooter {...orderList} />
        </>
      ),
    },
  ];

  return (
    <table className="table table-cart table-mobile">
      <Collapse defaultActiveKey={id} items={items} />
    </table>
  );
};

export default OrderList;
