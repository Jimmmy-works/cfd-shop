import { useMainContext } from "@/components/MainContext";
import { PATHS } from "@/contants/paths";
import { authActions } from "@/store/reducer/authReducer";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const DashBoardNav = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authActions?.logout());
  };
  return (
    <aside className="col-md-4 col-lg-3">
      <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
        <li className="nav-item">
          <NavLink end className="nav-link" to={PATHS.DASHBOARD.INDEX}>
            Account Details
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={PATHS.DASHBOARD.ORDER}>
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            id="tab-address-link"
            to={PATHS.DASHBOARD.ADDRESS}
          >
            Adresses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={PATHS.DASHBOARD.WISHLIST}>
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <Link onClick={onLogout} className="nav-link">
            Sign Out
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default DashBoardNav;
