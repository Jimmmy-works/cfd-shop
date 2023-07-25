import Radio from "@/components/Radio";
import { SHIPPING_OPTIONS } from "@/contants/general";
import { PATHS } from "@/contants/paths";
import { fomatCurrency } from "@/utils/fomatCurrency";
import React from "react";
import { Link } from "react-router-dom";

const CartSumary = ({
  total,
  subTotal,
  typeShip,
  priceShip,
  onUpdateShipping,
  profile,
}) => {
  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>${fomatCurrency(subTotal)}</td>
            </tr>
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>
            <Radio.Group onChange={onUpdateShipping} defaultValue={typeShip}>
              {SHIPPING_OPTIONS?.map((option, index) => {
                const { label, price, value } = option || {};
                return (
                  <tr className="summary-shipping-row">
                    <td>
                      <Radio.Item
                        defaultValue={typeShip}
                        key={value || index}
                        value={value}
                      >
                        {label}
                      </Radio.Item>
                    </td>
                    <td>${fomatCurrency(price)}</td>
                  </tr>
                );
              })}
            </Radio.Group>
            {profile?.province &&
            profile?.district &&
            profile?.ward &&
            profile?.street ? (
              <></>
            ) : (
              <tr className="summary-shipping-estimate">
                <td>
                  Estimate for Your Country <br />
                  <Link to={PATHS.DASHBOARD.INDEX}>Change address</Link>
                </td>
                <td>&nbsp;</td>
              </tr>
            )}
            <tr className="summary-total">
              <td>Total:</td>
              <td>${fomatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        <Link
          to={PATHS.CHECKOUT.DETAIL}
          className="btn btn-outline-primary-2 btn-order btn-block"
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
      <Link
        to={PATHS.PRODUCT.INDEX}
        className="btn btn-outline-dark-2 btn-block mb-3"
      >
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Link>
    </aside>
  );
};

export default CartSumary;
