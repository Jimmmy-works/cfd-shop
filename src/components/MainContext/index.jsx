import { BASE_URL } from "@/contants/environment";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import useMutation from "@/hooks/useMutation";
import { authenService } from "@/service/authenService";
import instance from "@/utils/Interceptor";
import { message } from "antd";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainContext = createContext({});
export const AuthenProvider = ({ children }) => {
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
