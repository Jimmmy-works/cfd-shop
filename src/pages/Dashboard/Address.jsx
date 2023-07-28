import { PATHS } from "@/contants/paths";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Address = () => {
  const { profile } = useSelector((state) => state.auth);
  const { firstName, email, phone } = profile || {};
  return (
    <div
      className="tab-pane fade active show"
      id="tab-address"
      role="tabpanel"
      aria-labelledby="tab-address-link"
    >
      <p>
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Billing Address</h3>
              <p>
                <strong style={{ marginRight: "5px" }}>Fullname:</strong>{" "}
                {firstName} <br />
                <strong style={{ marginRight: "5px" }}>Email:</strong> {email}{" "}
                <br />
                <strong style={{ marginRight: "5px" }}>Phone number:</strong>
                {phone} <br />
                <br />
                <Link to={PATHS.DASHBOARD.INDEX}>
                  Edit <i className="icon-edit" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Shipping Address</h3>
              <p>
                Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi <br />
                <br />
                <a href="#">
                  Edit <i className="icon-edit" />
                </a>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Address;
