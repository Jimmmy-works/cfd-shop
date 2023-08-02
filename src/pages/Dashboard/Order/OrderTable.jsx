import { PATHS } from "@/contants/paths";
import { fomatCurrency } from "@/utils/fomatCurrency";
import { Input, Modal, Rate, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import orderService from "@/service/orderService";
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
const Table = styled.div`
  .review {
    color: #fcb941;
    border: 0;
    margin-bottom: 0 !important;
    padding: 5px 0 !important;
    cursor: pointer;
  }
  .product {
    background-color: #fafafa !important;
  }
  .popup {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .mytable {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
    border: 1px solid #999;
    padding: 10px;
    &__wrapper {
      width: 100%;
      padding: 0 40px;
      display: flex;
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

  th,
  td,
  tr {
    border: 0 !important;
  }
`;
const OrderTable = ({
  address,
  note,
  total,
  shipping,
  product,
  subTotal,
  discount,
  quantity,
  id: orderId,
  isReview,
  getOrderMe,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rate, setRate] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [productId, setProductId] = useState();
  const descToolTip = ["terrible", "bad", "normal", "good", "wonderful"];
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";
  const showModal = (id) => {
    setIsModalOpen(true);
    setProductId(id);
  };
  const handleOk = async () => {
    try {
      const payload = {
        order: orderId,
        product: productId,
        title: title,
        description: desc,
        rate: rate,
      };
      const res = await orderService.postReview(payload);
      if (res?.data) {
        getOrderMe();
        message.success(`Review thành công`);
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Table>
      <div className="mytable">
        <div className="mytable__wrapper">
          <p className="mytable__wrapper-content">
            Name: <span>{`${address?.fullName}`}</span>
          </p>
          <p className="mytable__wrapper-content">
            Email: <span>{`${address?.email}`}</span>
          </p>
          <p className="mytable__wrapper-content">
            Phone: <span>{`${address?.phone}`}</span>
          </p>
        </div>
        <div className="mytable__wrapper">
          <p className="mytable__wrapper-content">
            Address:<span>{`${address?.street}`}</span>
          </p>
          <p className="mytable__wrapper-content">
            Note: <span>{`${note}`}</span>
          </p>
          <p className="mytable__wrapper-content">
            Type Shipping: <span> {`${shipping?.typeShip}`}</span>
          </p>
        </div>
      </div>
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {product?.length &&
            product?.map((productItem, index) => {
              const { images, id, price, name, slug } = productItem || {};
              return (
                <tr key={id}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={PATHS.PRODUCT.INDEX}>
                          <img
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = imageError;
                            }}
                            src={images[0]}
                            alt="Product image"
                          />
                        </Link>
                      </figure>
                      <h3 className="product-title">
                        <Link to={PATHS.PRODUCT.INDEX}>{name}</Link>
                        {!isReview[index] && (
                          <div className="popup">
                            <p onClick={() => showModal(id)} className="review">
                              Review
                            </p>
                            <EditOutlined style={{ color: "#fcb941" }} />
                            <Modal
                              className="popup__modal"
                              maskStyle={{ backgroundColor: "rgba(0,0,0,0.1" }}
                              title={`Review: ${name}`}
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <Rate
                                tooltips={descToolTip}
                                onChange={setRate}
                                value={rate}
                              />
                              <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ marginTop: "10px" }}
                                placeholder="Title"
                              />
                              <Input.TextArea
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                style={{ marginTop: "10px" }}
                                placeholder="Content"
                              />
                            </Modal>
                          </div>
                        )}
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    ${fomatCurrency(price)}
                  </td>
                  <td className="quantity-col text-center">
                    {fomatCurrency(quantity[index])}
                  </td>
                  <td className="total-col text-center">
                    ${fomatCurrency(price * quantity[index])}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
    </Table>
  );
};

export default OrderTable;
