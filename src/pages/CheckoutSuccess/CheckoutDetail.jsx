import BreadCrumb from "@/components/Breadcrumb";
import { PATHS } from "@/contants/paths";
import React from "react";
import { Link } from "react-router-dom";
import CouponCheckout from "./CouponCheckout";
import CheckoutSumary from "./CheckoutSumary";
import BillingDetail from "./BillingDetail";
import useCheckout from "./useCheckout";

const CheckoutDetail = () => {
  const { couponCheckoutProps, checkoutSumaryProps, checkoutBillingDetail } =
    useCheckout();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item>
          <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>Checkout</BreadCrumb.Item>
      </BreadCrumb>

      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <CouponCheckout {...couponCheckoutProps} />
            <div action="#" className="checkout-form">
              <div className="row">
                <BillingDetail {...checkoutBillingDetail} />
                <CheckoutSumary {...checkoutSumaryProps} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutDetail;
