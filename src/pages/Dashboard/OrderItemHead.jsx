import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Table = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  border: 1px solid #999;
  padding: 10px;
  .mytable {
    &__wrapper {
      width: 100%;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      &-content {
        width: 100%;
        min-width: 100px;
        span {
          color: #000;
          font-weight: 500;
          margin-left: 6px;
        }
      }
    }
  }
  th {
    border: 0;
  }
`;
const Head = styled.tr`
  th {
    min-width: 100px;
    width: 100%;
    max-width: max-content;
    border: 0;
  }
  td {
    border: 0;
  }
`;
const OrderItemHead = ({ dataOrder }) => {
  const { profile } = useSelector((state) => state.auth);
  const { name, street, email, phone } = profile || {};
  const { shipping, note } = dataOrder || {};
  return (
    <>
      <Table className="mytable">
        <div className="mytable__wrapper">
          <p className="mytable__wrapper-content">
            Name: <span>{`${name}`}</span>
          </p>
          <p className="mytable__wrapper-content">
            Email: <span>{`${email}`}</span>
          </p>
          <p className="mytable__wrapper-content">
            Note: <span>{`${note}`}</span>
          </p>
        </div>
        <div className="mytable__wrapper">
          <p className="mytable__wrapper-content">
            Phone: <span>{`${phone}`}</span>
          </p>
          <p className="mytable__wrapper-content">
            Address:<span>{`${street}`}</span>
          </p>
          <p className="mytable__wrapper-content">
            Type Shipping: <span> {`${shipping?.typeShip}`}</span>
          </p>
        </div>
      </Table>
      <Head>
        <th>Product</th>
        <th className="text-center">Price</th>
        <th className="text-center">Quantity</th>
        <th className="text-center">Total Product</th>
      </Head>
    </>
  );
};

export default OrderItemHead;
