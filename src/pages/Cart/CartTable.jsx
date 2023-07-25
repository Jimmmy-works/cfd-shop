import QuantityInput from "@/components/Input/QuantityInput";
import { PATHS } from "@/contants/paths";
import { fomatCurrency } from "@/utils/fomatCurrency";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Image, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const ImageWrapper = styled.div`
  height: 60px;
  width: 60px;
  .ant-image {
    svg {
      object-fit: cover;
    }
  }
  img {
    object-fit: cover;
  }
`;
const CartTable = ({
  cartInfo,
  onUpdateQuantity,
  product,
  handleRemoveProductCart,
}) => {
  const { confirm } = Modal;
  const onRemoveProuductCart = (product) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <p>{`${product?.name || ""}`}</p>
          <p>{`${product?.quantity} x ${product?.price}`}</p>
        </>
      ),
      onOk() {
        handleRemoveProductCart(product?.id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <table className="table table-cart table-mobile">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {product?.length > 0 &&
          product?.map((productItem, index) => {
            const { slug, name, price, total, images, quantity } =
              productItem || [];
            return (
              <tr key={slug || index}>
                <td className="product-col">
                  <div className="product">
                    <ImageWrapper className="product-media">
                      <Link to={`${PATHS.PRODUCT.INDEX}/${slug}`}>
                        {!images ? (
                          <img src={images} alt="Product image" />
                        ) : (
                          <div>
                            <Image
                              className="ant-image"
                              width={"100%"}
                              height={"100%"}
                              fallback="https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280"
                            />
                          </div>
                        )}
                      </Link>
                    </ImageWrapper>
                    <h3 className="product-title">
                      <Link to={`${PATHS.PRODUCT.INDEX}/${slug}`}>
                        {name || ""}
                      </Link>
                    </h3>
                  </div>
                </td>
                <td className="price-col">${fomatCurrency(price)}</td>
                <td className="quantity-col">
                  <QuantityInput
                    className="cart-product-quantity"
                    value={quantity}
                    onChange={(value) => {
                      return onUpdateQuantity(value, index);
                    }}
                  />
                </td>
                <td className="total-col">
                  ${Number(price || 0) * (quantity || 0)}
                </td>
                <td className="remove-col">
                  <button
                    onClick={() => onRemoveProuductCart(productItem)}
                    className="btn-remove"
                  >
                    <i className="icon-close" />
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default CartTable;
