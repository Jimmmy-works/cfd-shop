import { PATHS } from "@/contants/paths";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useMainContext } from "../MainContext";

const HeaderTop = ({
  profile,
  handleLogout,
  handleOpenAuthenModalLayout,
  userGoogle,
}) => {
  const { name, imageUrl } = userGoogle?.profileObj || {};
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912
          </a>
        </div>
        <div className="header-right">
          {Object.keys(userGoogle) != 0 || profile ? (
            // is Login
            <ul className="top-menu">
              <li>
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  className="top-link-menu"
                >
                  {imageUrl ? (
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "40px",
                        width: "40px",
                      }}
                      src={imageUrl}
                      alt="picture"
                    />
                  ) : (
                    <i className="icon-user"></i>
                  )}
                  {name || profile?.firstName || "Guest"}
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
