import { PATHS } from "@/contants/paths";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-5">
              <div className="widget widget-about">
                <img
                  src="/src/assets/images/logo.svg"
                  className="footer-logo"
                  alt="Footer Logo"
                  width={120}
                />
                <p>
                  Praesent dapibus, neque id cursus ucibus, tortor neque egestas
                  augue, eu vulputate magna eros eu erat.
                </p>
                <div className="widget-call">
                  <i className="icon-phone" /> Got Question? Call us 24/7
                  <a href="tel:#">098 9596 912</a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2 offset-lg-1">
              <div className="widget">
                <h4 className="widget-title">Useful Links</h4>
                <ul className="widget-list">
                  <li>
                    <Link to={PATHS.ABOUT}>About Us</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRODUCT.INDEX}>Product</Link>
                  </li>
                  <li>
                    <Link to={PATHS.FAQ}>FAQs</Link>
                  </li>
                  <li>
                    <Link to={PATHS.CONTACT}>Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="widget">
                <h4 className="widget-title">Customer Service</h4>
                <ul className="widget-list">
                  <li>
                    <Link to={PATHS.PAYMENT_METHOD} href="payment-methods.html">
                      Payment Methods
                    </Link>
                  </li>
                  <li>
                    <Link to={PATHS.RETURN} href="returns.html">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link to={PATHS.SHIPPING} href="shipping.html">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRIVACYPOLICY} href="privacy-policy.html">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-2">
              <div className="widget">
                <h4 className="widget-title">My Account</h4>
                <ul className="widget-list">
                  <li>
                    <Link to={PATHS.DASHBOARD.INDEX} href="dashboard.html">
                      Account Details
                    </Link>
                  </li>
                  <li>
                    <Link to={PATHS.CART} href="cart.html">
                      View Cart
                    </Link>
                  </li>
                  <li>
                    <Link to={PATHS.DASHBOARD.WISHLIST} href="dashboard.html">
                      My Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to={PATHS.DASHBOARD.ORDER} href="dashboard.html">
                      Track My Order
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">
            Copyright © 2023
            <a href="https://cfdcircle.vn/" target="_blank">
              <strong>CFD Circle</strong>
            </a>
            . All Rights Reserved.
          </p>
          <figure className="footer-payments">
            <img
              src="/src/assets/images/payments.png"
              alt="Payment methods"
              width={272}
              height={20}
            />
          </figure>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
