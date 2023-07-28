import React from "react";
import OrderTable from "./OrderTable";
import { Collapse } from "antd";
import moment from "moment/moment";

const OrderList = ({ listOrder, getOrderMe }) => {
  const getItems = listOrder?.map((order, index) => {
    console.log("order", order);
    const { id, updatedAt } = order || {};
    return {
      key: index,
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
            ( {updatedAt && moment(updatedAt).endOf("day").fromNow()} )
          </span>
        </div>
      ),
      children: <OrderTable getOrderMe={getOrderMe} {...order} />,
    };
  });

  return (
    <div className="myorder">
      <h4>My order:</h4>
      <Collapse bordered={false} items={getItems} defaultActiveKey={["0"]} />
    </div>
  );
};

export default OrderList;
