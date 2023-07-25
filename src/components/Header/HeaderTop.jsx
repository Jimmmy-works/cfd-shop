import { PATHS } from "@/contants/paths";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const HeaderTop = ({ profile, handleLogout, handleOpenAuthenModalLayout }) => {
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912
          </a>
        </div>
        <div className="header-right">
          {profile ? (
            // is Login
            <ul className="top-menu">
              <li>
                <a className="top-link-menu">
                  <i className="icon-user"></i>
                  {profile?.firstName || "Guest"}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.DASHBOARD.INDEX}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.DASHBOARD.ORDER}>Your Orders</Link>
                      </li>
                      <li>
                        <Link to={PATHS.DASHBOARD.WISHLIST}>
                          Wishlist <span>(3)</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ cursor: "pointer" }}
                          onClick={handleLogout}
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            //No login
            <ul
              onClick={handleOpenAuthenModalLayout}
              className="top-menu top-link-menu"
            >
              <li>
                <a className="top-menu-login">
                  <i className="icon-user" />
                  Login | Resgister
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
