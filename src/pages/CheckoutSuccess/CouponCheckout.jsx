import Button from "@/components/Button";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Image, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const CouponWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: initial;
  .checkout-btn {
    max-width: 100px;
  }

  .text-truncate {
    width: auto !important;
  }
  form {
    flex: 1;
    max-width: 350px;

    .form-control {
      margin-bottom: 0;
    }
  }
`;

const CouponCheckout = ({
  isCoupon,
  onAddCoupon,
  onRemoveCoupon,
  isCouponDiscout,
}) => {
  const [renderCoupon, setRenderCoupon] = useState(isCoupon || "");
  const { confirm } = Modal;
  const ref = useRef();
  const offerCoupon = () => {
    confirm({
      title: "Mã giảm giá hiện tại:",
      icon: <ExclamationCircleFilled />,
      okText: "Nhận coupon",
      cancelText: "Cancel",
      content: (
        <>
          <p>{` Nhập CFD giảm $30`}</p>
        </>
      ),
      onOk() {
        setRenderCoupon("CFD");
        ref?.current?.focus();
      },
      onCancel() {
        setRenderCoupon(isCoupon);
      },
    });
  };
  const handleChangeInput = (e) => {
    setRenderCoupon(e.target.value);
  };
  const handleAddCoupon = () => {
    if (renderCoupon) {
      onAddCoupon?.(renderCoupon);
    }
  };
  const handleClear = () => {
    setRenderCoupon("");
  };
  const handleRemoveCoupon = () => {
    if (renderCoupon) {
      onRemoveCoupon(handleClear);
    }
  };

  useEffect(() => {
    setRenderCoupon(isCoupon);
  }, [isCoupon]);
  useEffect(() => {
    offerCoupon();
  }, []);

  return (
    <CouponWrapper className="checkout-discount">
      <form>
        <input
          ref={ref}
          defaultValue={renderCoupon}
          value={renderCoupon}
          onChange={handleChangeInput}
          type="text"
          className="form-control"
          required=""
          id="checkout-discount-input"
        />
        <label htmlFor="checkout-discount-input" className="text-truncate">
          Have a coupon? <span>Click here to enter your code</span>
        </label>
      </form>

      {!isCoupon ? (
        <Button
          onClick={handleAddCoupon}
          variant="outline"
          className="checkout-btn"
        >
          Add
        </Button>
      ) : (
        <Button onClick={handleRemoveCoupon} variant="outline">
          Remove
        </Button>
      )}
    </CouponWrapper>
  );
};

export default CouponCheckout;
