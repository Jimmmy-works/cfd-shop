import BreadCrumb from "@/components/Breadcrumb";
import { PATHS } from "@/contants/paths";
import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";
import CartCoupon from "./CartCoupon";
import CartSumary from "./CartSumary";
import { useCart } from "./useCart";

const Cart = () => {
  const { cartTableProps, cartSumaryProps } = useCart();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item>
          <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>Shopping Cart</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <CartTable {...cartTableProps} />
                {/* <CartCoupon /> */}
              </div>
              <CartSumary {...cartSumaryProps} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
