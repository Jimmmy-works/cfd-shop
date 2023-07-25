import { PAYMENT_MENTHOD } from "@/contants/general";
import { PATHS } from "@/contants/paths";
import { fomatCurrency } from "@/utils/fomatCurrency";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CheckoutSumary = ({
  cartInfo,
  paymetMethod,
  onChangePaymentMethod,
  modProduct,
  onPlaceOrder,
}) => {
  const { product, subTotal, total, shipping, discount, discountCode } =
    cartInfo || [];
  const isCash = paymetMethod === PAYMENT_MENTHOD.cash;
  const isCard = paymetMethod === PAYMENT_MENTHOD.card;

  return (
    <aside className="col-lg-3">
      <div className="summary">
        <h3 className="summary-title">Your Order</h3>
        <table className="table table-summary">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {modProduct?.length > 0 ? (
              modProduct?.map((product, index) => {
                const { name, price, id, quantity, slug } = product || {};
                return (
                  <>
                    <tr key={id || index}>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          gap: "5px",
                          marginBottom: "10px",
                        }}
                      >
                        <Link
                          to={`${PATHS.PRODUCT.INDEX}/${slug}`}
                        >{`${name}`}</Link>
                        <p>{`$${price} x ${quantity}`}</p>
                      </td>
                      <td>${fomatCurrency(quantity * price)}</td>
                    </tr>
                  </>
                );
              })
            ) : (
              <p>Không có sản phẩm nào</p>
            )}

            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>${fomatCurrency(subTotal)}</td>
            </tr>
            {shipping ? (
              <tr>
                <td>Shipping:</td>
                <td>+ ${shipping?.price}</td>
              </tr>
            ) : (
              <tr className="summary-shipping-estimate">
                <td>
                  Choose Shipping <br />
                  <Link to={PATHS.CART}>Select shipping</Link>
                </td>
                <td>&nbsp;</td>
              </tr>
            )}
            {discount && discountCode ? (
              <tr>
                <td>Coupon:</td>
                <td>-${fomatCurrency(discount)}</td>
              </tr>
            ) : null}
            <tr className="summary-total">
              <td>Total:</td>
              <td>${fomatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        <div className="accordion-summary" id="accordion-payment">
          <div className="card">
            <div
              onClick={() => {
                onChangePaymentMethod(PAYMENT_MENTHOD.card);
              }}
              className="card-header"
              id="heading-1"
            >
              <h2 className="card-title">
                <a className={!isCard ? "collapsed" : ""}>
                  Direct bank transfer{" "}
                </a>
              </h2>
            </div>
            <div className={`collapse ${isCard ? "show" : ""}`}>
              <div className="card-body">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </div>
            </div>
          </div>
          <div className="card">
            <div
              onClick={() => {
                onChangePaymentMethod(PAYMENT_MENTHOD.cash);
              }}
              className="card-header"
              id="heading-3"
            >
              <h2 className="card-title">
                <a className={!isCash ? "collapsed" : ""}>Cash on delivery</a>
              </h2>
            </div>
            <div className={`collapse ${isCash ? "show" : ""}`}>
              <div className="card-body">
                Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros.
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onPlaceOrder}
          className="btn btn-outline-primary-2 btn-order btn-block"
        >
          <span className="btn-text">Place Order</span>
          <span className="btn-hover-text">Proceed to Checkout</span>
        </button>
      </div>
    </aside>
  );
};

export default CheckoutSumary;
