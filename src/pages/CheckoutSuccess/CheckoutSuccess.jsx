import { PATHS } from "@/contants/paths";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const CheckoutSuccess = () => {
  const { orderInfo } = useSelector((state) => state.order);
  const { search } = useLocation();
  return (
    <main className="main">
      <div className="content-success text-center">
        <div className="container">
          <h1 className="content-title">Your Order is Completed!</h1>
          <p>
            Your order <strong>{search || ""}</strong> has been completed. Your
            order details are shown for your personal accont.
          </p>
          <Link
            to={PATHS.DASHBOARD.ORDER}
            className="btn btn-outline-primary-2 btn-minwidth-lg"
          >
            <span>VIEW MY ORDERS</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
