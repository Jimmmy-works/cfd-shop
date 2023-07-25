import { PATHS } from "@/contants/paths";
import { fomatCurrency } from "@/utils/fomatCurrency";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal, Rate } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useDashboard from "./useDashboard";
import { getOrder } from "@/store/reducer/orderReducer";

const Title = styled.div`
  display: flex;
  flex-direction: column;
  .review {
    color: #fcb941 !important;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;
const ContentModal = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;
const OrderItem = ({
  product,
  quantity,
  isReview,

  id: idOrder,
}) => {
  const { orderProps } = useDashboard();
  const { executeReview } = orderProps || {};
  const dispatch = useDispatch();
  const { orderInfo } = useSelector((state) => state.order);
  // Handle Error Image
  const [errorImage, setErrorImage] = useState(false);
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";
  // Modal Antd

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [rateValue, setRateValue] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [desValue, setDesValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (productItem) => {
    setIsModalOpen(false);
    const payload = {
      order: idOrder || "",
      product: productItem?.id || "",
      title: titleValue,
      description: desValue,
      rate: rateValue,
    };
    executeReview(payload);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {product?.length &&
        product?.map((productItem, index) => {
          const { name, price, images, slug } = productItem || {};
          return (
            <tbody>
              <tr>
                <td className="product-col">
                  <div className="product">
                    <figure className="product-media">
                      <Link to={`${PATHS.PRODUCT.INDEX}/${slug}`} href="#">
                        <img
                          onError={() => setErrorImage(true)}
                          src={!errorImage ? images?.[0] : imageError}
                          alt="Product image"
                        />
                      </Link>
                    </figure>
                    <Title>
                      <h3 className="product-title">
                        <Link to={`${PATHS.PRODUCT.INDEX}/${slug}`} href="#">
                          {name}
                        </Link>
                      </h3>
                      {!isReview[index] && (
                        <div>
                          <a
                            style={{ border: 0 }}
                            className="review"
                            onClick={showModal}
                          >
                            <SwapRightOutlined />
                            Review Product
                          </a>
                          <Modal
                            maskStyle={{
                              backgroundColor: " rgba(0, 0, 0, 0.1)",
                            }}
                            title={`Review ${name}`}
                            open={isModalOpen}
                            onOk={() => handleOk(productItem)}
                            onCancel={handleCancel}
                          >
                            <ContentModal>
                              <Rate
                                allowHalf
                                tooltips={desc}
                                onChange={setRateValue}
                              />

                              <Input
                                value={titleValue}
                                onChange={(e) => setTitleValue(e.target.value)}
                                placeholder="Title"
                              />
                              <Input.TextArea
                                value={desValue}
                                onChange={(e) => setDesValue(e.target.value)}
                                placeholder="Description"
                                rows={6}
                              />
                            </ContentModal>
                          </Modal>
                        </div>
                      )}
                    </Title>
                  </div>
                </td>
                <td className="price-col text-center">
                  ${fomatCurrency(price)}
                </td>
                <td className="quantity-col text-center">{quantity[index]}</td>

                <td className="total-col text-center">
                  ${fomatCurrency(price * quantity[index])}
                </td>
              </tr>
            </tbody>
          );
        })}
    </>
  );
};

export default OrderItem;
