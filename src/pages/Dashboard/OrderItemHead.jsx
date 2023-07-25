import React from "react";
import styled from "styled-components";
const Head = styled.tr`
  th {
    min-width: 100px;
    width: 100%;
    max-width: max-content;
    border: 0;
  }
`;
const OrderItemHead = () => {
  return (
    <Head>
      <th>Product</th>
      <th className="text-center">Price</th>
      <th className="text-center">Quantity</th>
      <th className="text-center">Total Product</th>
    </Head>
  );
};

export default OrderItemHead;
