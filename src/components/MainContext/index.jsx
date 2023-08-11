import { LOCAL_STORAGE } from "@/contants/localStorage";
import { authActions } from "@/store/reducer/authReducer";
import { gapi } from "gapi-script";
import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainContext = createContext({});
export const AuthenProvider = ({ children }) => {
  // dispatch
  const dispatch = useDispatch();
  const { setProfile } = useSelector((state) => state.auth);
  // Navigate
  const navigate = useNavigate();
  // Control open layout modal
  const [isAuthenModalLayout, setIsAuthenModalLayout] = useState(false);
  const [isRenderForm, setIsRenderForm] = useState("signin");
  const handleOpenAuthenModalLayout = () => {
    if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
      setIsAuthenModalLayout(true);
      setIsRenderForm("signin");
      document.body.className = "modal-open";
      document.body.style = "padding-right: 15px";
      document.getElementById("signinModal").setAttribute("aria-modal", "true");
    }
  };
  const handleCloseAuthenModalLayout = () => {
    setIsAuthenModalLayout(false);
    setIsRenderForm("signin");
    document.body.className = "";
    document.body.style = "";
    document.getElementById("signinModal").setAttribute("aria-hidden", "true");
  };
  // Control Error Image
  const [errorImage, setErrorImage] = useState(false);
  const imageError =
    "https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1280x1280";

  const onActiveErrorImage = (value) => {
    setErrorImage(value);
  };
  //Control Open Mobile Menu
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [controlScroll, setControlScroll] = useState(false);
  const [categoriesMobile, setCategoriesMobile] = useState("all");
  const handleOpenMobileMenu = () => {
    document.body.className = "mmenu-active";
    setIsMobileMenu(true);
  };
  const handleCloseMobileMenu = () => {
    document.body.className = "";
    setIsMobileMenu(false);
  };
  const handleChangeTabCategories = (tab) => {
    setCategoriesMobile(tab);
  };
  /// Google login
  const client_id =
    "362842596048-ke67fjm6lvp2smfn0jk0ri6vmog6vhp9.apps.googleusercontent.com";
  /// Logout
  const onLogoutSuccess = (res) => {
    setUserGoogle({});
  };
  const onFailureLogout = (res) => {
    console.log("onFailure", res);
  };
  const { signOut } = useGoogleLogout({
    clientId: client_id,
    onLogoutSuccess,
    onFailure: onFailureLogout,
  });
  /// Login
  const [userGoogle, setUserGoogle] = useState({});

  const onSuccess = (res) => {
    handleCloseAuthenModalLayout();
    setUserGoogle(res);
    dispatch(
      authActions?.setProfile({
        firstName: res?.profileObj?.name,
        email: res?.profileObj?.email,
      })
    );
  };
  const onFailure = (res) => {
    console.log("onFailure", res);
  };
  useEffect(() => {
    function startLogin() {
      gapi.client.init({
        client_id: client_id,
      });
      gapi.load("client2:auth2", startLogin);
    }
  });

  return (
    <MainContext.Provider
      value={{
        isAuthenModalLayout,
        setIsAuthenModalLayout,
        handleCloseAuthenModalLayout,
        handleOpenAuthenModalLayout,
        isRenderForm,
        setIsRenderForm,
        errorImage,
        onActiveErrorImage,
        imageError,
        setErrorImage,
        isMobileMenu,
        setIsMobileMenu,
        handleOpenMobileMenu,
        handleCloseMobileMenu,
        categoriesMobile,
        handleChangeTabCategories,
        controlScroll,
        setControlScroll,
        userGoogle,
        setUserGoogle,
        onSuccess,
        onFailure,
        client_id,
        signOut,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
