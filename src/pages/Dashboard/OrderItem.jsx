import { PATHS } from "@/contants/paths";
import { fomatCurrency } from "@/utils/fomatCurrency";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal, Rate } from "antd";
import { ExclamationCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
// import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/store/reducer/orderReducer";
import orderService from "@/service/orderService";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Rating } from "@mui/material";
const TableBody = styled.tbody`
  td {
    border: 0;
  }
`;
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
  executeReview,
  id: idOrder,
  dataReview,
  onPostReview,
}) => {
  const dispatch = useDispatch();
  const { orderInfo } = useSelector((state) => state.order);
  const { register, watch, getValues, setValue } = useForm();
  // Handle Error Image
  const [errorImage, setErrorImage] = useState(false);
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";
  // Modal Antd
  const { confirm } = Modal;

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [rateValue, setRateValue] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [desValue, setDesValue] = useState("");

  const handleReview = (productId) => {
    const payload = {
      order: idOrder || "",
      product: productId || "",
      title: titleValue,
      description: desValue,
      rate: rateValue,
    };
    // const payload = {
    //   order: idOrder || "",
    //   product: productId || "",
    //   title: getValues("title"),
    //   description: getValues("description"),
    //   rate: getValues("rate"),
    //   // rate: rateValue,
    // };
    console.log("payload", payload);
    // executeReview(payload);
  };

  const onPopup = (productId) => {
    confirm({
      title: `Đánh giá ${product?.name}?`,
      icon: <ExclamationCircleFilled />,
      content: (
        <ContentModal>
          <Rating
            name="simple-controlled"
            value={rateValue}
            onChange={(event, newValue) => {
              console.log("newValue", newValue);
              console.log("event", event);
              setRateValue(newValue);
            }}
          />
          {/* <Rate allowHalf tooltips={desc} onChange={setRateValue} /> */}
          {/* <Input
              label="Title"
              {...register("title", {
                required: `Title is required `,
              })}
              // error={errors?.firstName?.message}
              type="text"
              required
            />
            <Input
              label="Description"
              required
              {...register("description", {
                required: `Description is required `,
              })}
              renderProps={(inputProps) => {
                return (
                  <textarea
                    {...inputProps}
                    className="form-control"
                    cols={30}
                    rows={4}
                    placeholder="Enter somthing..."
                  />
                );
              }}
            /> */}
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
      ),
      onOk() {
        handleReview(productId);
      },
      onCancel() {},
    });
  };

  return (
    <>
      {product?.length &&
        product?.map((productItem, index) => {
          const { name, price, images, slug } = productItem || {};
          return (
            <TableBody>
              <tr>
                <td x className="product-col">
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
                      {!!!isReview[index] && (
                        <a
                          className="review"
                          onClick={() => onPopup(productItem.id)}
                        >
                          Review Product
                          <InfoCircleOutlined />
                        </a>
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
            </TableBody>
          );
        })}
    </>
  );
};

export default OrderItem;
