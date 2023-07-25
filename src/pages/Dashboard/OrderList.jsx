import React from "react";
import OrderItem from "./OrderItem";
import { Collapse } from "antd";
import OrderItemHead from "./OrderItemHead";
import OrderItemFooter from "./OrderItemFooter";
import moment from "moment/moment";
import styled from "styled-components";
const Table = styled.table`
  .ant-collapse-header {
    align-items: center !important;
  }
`;
const OrderList = ({ orderList }) => {
  const {
    product,
    quantity,
    total,
    id,
    shipping,
    discount,
    isReview,
    updatedAt,
    note,
  } = orderList || {};
  console.log("orderList", orderList);
  const items = [
    {
      key: 1,
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            Order Code:
            <span style={{ fontSize: 16, fontWeight: 600, paddingLeft: 6 }}>
              {id}
            </span>
          </div>
          <span style={{ paddingLeft: 10 }}>
            ( {updatedAt ? moment(updatedAt).endOf("day").fromNow() : ""} )
          </span>
        </div>
      ),
      children: (
        <>
          <OrderItemHead dataOrder={orderList} />
          <OrderItem {...orderList} />
          <OrderItemFooter {...orderList} />
        </>
      ),
    },
  ];

  return (
    <Table className="table table-cart table-mobile">
      <Collapse defaultActiveKey={id} items={items} />
    </Table>
  );
};

export default OrderList;
