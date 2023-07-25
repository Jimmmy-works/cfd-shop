import React from "react";
import { LOCAL_STORAGE } from "@/contants/localStorage";
import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";
import useHeader from "./useHeader";

const Header = () => {
  const { headerTopProps, headerMiddleProps } = useHeader();
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  return (
    <header className="header">
      <HeaderTop {...headerTopProps} />
      <HeaderMiddle {...headerMiddleProps} />
    </header>
  );
};

export default Header;
