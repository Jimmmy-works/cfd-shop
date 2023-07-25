import React from "react";

const CartCoupon = () => {
  return (
    <div className="cart-bottom">
      <div className="cart-discount">
        <form action="#">
          <div className="input-group">
            <input
              type="text"
              className="form-control input-error"
              required=""
              placeholder="Coupon code"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-primary-2" type="submit">
                <i className="icon-long-arrow-right" />
              </button>
            </div>
          </div>
          <p className="form-error">Please fill in this field</p>
        </form>
      </div>
      <a href="#" className="btn btn-outline-dark-2">
        <span>UPDATE CART</span>
        <i className="icon-refresh" />
      </a>
    </div>
  );
};

export default CartCoupon;
