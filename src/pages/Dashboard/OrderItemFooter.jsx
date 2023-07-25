import { fomatCurrency } from "@/utils/fomatCurrency";
import React from "react";
import { styled } from "styled-components";
const Foot = styled.tr`
  th {
    min-width: 100px;
    width: 100%;
    max-width: max-content;
    border: 0;
  }
`;
const OrderItemFooter = ({ quantity, total, id, shipping, discount }) => {
  return (
    <Foot>
      <th className="text-center"></th>
      <th>Discount: +${fomatCurrency(discount)}</th>
      <th className="text-center">
        Shipping: -${fomatCurrency(shipping?.price)}
      </th>
      <th className="text-center">
        Total: <span style={{ color: "#fcb941" }}>${fomatCurrency(total)}</span>
      </th>
    </Foot>
  );
};

export default OrderItemFooter;
