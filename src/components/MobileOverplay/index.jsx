import React from "react";
import { useMainContext } from "../MainContext";

const MobileOverplay = () => {
  const { handleCloseMobileMenu } = useMainContext();
  return (
    <div onClick={handleCloseMobileMenu} className={`mobile-menu-overlay `} />
  );
};

export default MobileOverplay;
