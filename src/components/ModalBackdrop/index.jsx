import React from "react";
import ReactDOM from "react-dom";
import { useMainContext } from "../MainContext";
const ModalBackdrop = () => {
  const { isAuthenModalLayout } = useMainContext();
  return ReactDOM.createPortal(
    <div
      className={`modal-backdrop fade ${!!isAuthenModalLayout ? "show" : ""}`}
    ></div>,
    document.body
  );
};

export default ModalBackdrop;
