import React from "react";

const Social = () => {
  return (
    <div className="form-choice">
      <p className="text-center">or sign in with</p>
      <div className="row">
        <div className="col-sm-6">
          <a href="#" className="btn btn-login btn-g">
            <i className="icon-google" /> Login With Google{" "}
          </a>
        </div>
        <div className="col-sm-6">
          <a href="#" className="btn btn-login btn-f">
            <i className="icon-facebook-f" /> Login With Facebook{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
