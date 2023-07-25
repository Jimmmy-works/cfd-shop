import React from "react";

const Summary = () => {
  return (
    <>
      <aside classname="col-lg-3">
        <div classname="summary summary-cart">
          <h3 classname="summary-title">Cart Total</h3>
          <table classname="table table-summary">
            <tbody>
              <tr classname="summary-subtotal">
                <td>Subtotal:</td>
                <td>$160.00</td>
              </tr>
              <tr classname="summary-shipping">
                <td>Shipping:</td>
                <td>&nbsp;</td>
              </tr>
              <tr classname="summary-shipping-row">
                <td>
                  <div classname="custom-control custom-radio">
                    <input
                      type="radio"
                      id="free-shipping"
                      name="shipping"
                      classname="custom-control-input"
                    />
                    <label
                      classname="custom-control-label"
                      htmlfor="free-shipping"
                    >
                      Free Shipping
                    </label>
                  </div>
                </td>
                <td>$0.00</td>
              </tr>
              <tr classname="summary-shipping-row">
                <td>
                  <div classname="custom-control custom-radio">
                    <input
                      type="radio"
                      id="standart-shipping"
                      name="shipping"
                      classname="custom-control-input"
                    />
                    <label
                      classname="custom-control-label"
                      htmlfor="standart-shipping"
                    >
                      Standart:
                    </label>
                  </div>
                </td>
                <td>$10.00</td>
              </tr>
              <tr classname="summary-shipping-row">
                <td>
                  <div classname="custom-control custom-radio">
                    <input
                      type="radio"
                      id="express-shipping"
                      name="shipping"
                      classname="custom-control-input"
                    />
                    <label
                      classname="custom-control-label"
                      htmlfor="express-shipping"
                    >
                      Express:
                    </label>
                  </div>
                </td>
                <td>$20.00</td>
              </tr>
              <tr classname="summary-shipping-estimate">
                <td>
                  Estimate for Your Country <br />
                  <a href="dashboard.html">Change address</a>
                </td>
                <td>&nbsp;</td>
              </tr>
              <tr classname="summary-total">
                <td>Total:</td>
                <td>$160.00</td>
              </tr>
            </tbody>
          </table>
          <a
            href="checkout.html"
            classname="btn btn-outline-primary-2 btn-order btn-block"
          >
            PROCEED TO CHECKOUT
          </a>
        </div>
        <a
          href="category.html"
          classname="btn btn-outline-dark-2 btn-block mb-3"
        >
          <span>CONTINUE SHOPPING</span>
          <i classname="icon-refresh"></i>
        </a>
        <i classname="icon-refresh"></i>
      </aside>
      <i classname="icon-refresh"></i>
    </>
  );
};

export default Summary;
