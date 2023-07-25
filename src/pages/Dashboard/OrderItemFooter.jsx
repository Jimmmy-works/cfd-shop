import { fomatCurrency } from "@/utils/fomatCurrency";
import React from "react";
import { styled } from "styled-components";
const Foot = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 40px;
  .footer__text {
    font-size: 1.6rem;
    span {
      font-weight: 600;
    }
  }
`;
const OrderItemFooter = ({ subTotal, total, shipping, discount }) => {
  return (
    <Foot>
      <p className="footer__text">
        subTotal: <span> ${fomatCurrency(subTotal)}</span>
      </p>
      <p className="footer__text">
        Discount: <span> +${fomatCurrency(discount)}</span>
      </p>
      <p className="footer__text">
        Shipping: <span> -${fomatCurrency(shipping?.price)}</span>
      </p>
      <p className="footer__text">
        Total: <span>${fomatCurrency(total)}</span>
      </p>
    </Foot>
  );
};

export default OrderItemFooter;
