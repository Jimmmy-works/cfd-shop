import { LOCAL_STORAGE } from "@/contants/localStorage";
import { PATHS } from "@/contants/paths";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useMainContext } from "../MainContext";

export default function PrivateRoute({ redirectPath = `${PATHS.HOME}` }) {
  const navigate = useNavigate();
  const { handleOpenAuthenModalLayout } = useMainContext();
  let isLogin = localStorage.getItem(LOCAL_STORAGE.token);
  if (!!!isLogin) {
    // handleOpenAuthenModalLayout();
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
