import React, { useEffect, useState } from "react";
import { useMainContext } from "../MainContext";
import { message } from "antd";
import { signin } from "@/store/reducer/authReducer";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { authenService } from "@/service/authenService";

const useAuthenModal = () => {
  //navigate
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const {
    isAuthenModalLayout,
    handleCloseAuthenModalLayout,
    isRenderForm,
    setIsRenderForm,
  } = useMainContext();
  const onChangeTab = (tab) => {
    setIsRenderForm(tab);
  };
  const onClose = () => {
    handleCloseAuthenModalLayout();
  };

  const handleSignin = async (data) => {
    if (data?.email) {
      try {
        const payload = {
          email: data?.email || "",
          password: data?.password || "",
        };
        const res = await dispatch(signin(payload));
        const profileRes = unwrapResult(res);
        if (profileRes?.id) {
          message.success(`Welcom ${profileRes?.firstName}`);
          handleCloseAuthenModalLayout();
        }
      } catch (error) {
        console.log("error", error);

        message.error(error?.message ?? `Đã xảy ra lỗi, vui lòng thử lại sau`);
      }
    }
  };
  const handleRegister = async (data) => {
    if (data?.email) {
      try {
        const payload = {
          firstName: data?.email || "",
          lastName: "",
          email: data?.email || "",
          password: data?.password || "",
        };
        const resRegister = await authenService.register(payload);
        if (resRegister?.data?.data?.id) {
          handleSignin({
            email: data?.email || "",
            password: data?.password || "",
          });
        }
      } catch (error) {
        console.log("error", error);
        message.error(error?.message ?? `Đã xảy ra lỗi, vui lòng thử lại sau`);
      }
    }
  };

  return {
    isOpen: isAuthenModalLayout,
    activeTab: isRenderForm,
    onClose,
    onChangeTab,
    handleSignin,
    handleRegister,
    isChecked,
    setIsChecked,
  };
};

export default useAuthenModal;
