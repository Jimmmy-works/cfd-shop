import React from "react";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import useDashboard from "./useDashboard";

const Account = () => {
  const { profile } = useSelector((state) => state.auth);
  const { profileProps } = useDashboard();
  return <>{profile && <Profile {...profileProps} profile={profile} />}</>;
};

export default Account;
