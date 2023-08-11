import React, { useEffect, useState } from "react";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import { useMainContext } from "../MainContext";
import { message } from "antd";
import jwtDecode from "jwt-decode";
import { gapi } from "gapi-script";
const LoginGoogle = () => {
  const { userGoogle, onSuccess, onFailure, client_id } = useMainContext();
  console.log("userGoogle", userGoogle);
  //   const [jwt, setJwt] = useState("");
  //   const client_id =
  //     "362842596048-ke67fjm6lvp2smfn0jk0ri6vmog6vhp9.apps.googleusercontent.com";
  //   const onSuccess = (res) => {
  //     console.log("onSuccess", res);
  //     // setJwt(res);
  //   };
  //   const onFailure = (res) => {
  //     console.log("onFailure", res);
  //   };
  //   useEffect(() => {
  //     function startLogin() {
  //       gapi.client.init({
  //         client_id: client_id,
  //       });
  //       gapi.load("client2:auth2", startLogin);
  //     }
  //   });
  //   console.log("jwt", jwt);

  return (
    <>
      <GoogleLogin
        clientId={client_id}
        buttonText="Đăng nhập với google"
        onFailure={onFailure}
        onSuccess={onSuccess}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
      />
      {/* <div id="signinGoogle"></div> */}
    </>
  );
};

export default LoginGoogle;
