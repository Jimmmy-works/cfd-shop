import React, { useEffect, useState } from "react";
import { useMainContext } from "../MainContext";
import { message } from "antd";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import LoginGoogle from "../LoginGoogle/LoginGoogle";
const Social = () => {
  const { userGoogle } = useMainContext();
  return (
    <>
      {/* <div id="signinDiv"></div> */}
      {Object.keys(userGoogle) != 0 ? "" : <LoginGoogle />}
    </>
  );
};

export default Social;
