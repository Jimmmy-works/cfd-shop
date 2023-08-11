import React from "react";
import ModalBackdrop from "../ModalBackdrop";
import Register from "./Register";
import Signin from "./Signin";
import { styled } from "styled-components";
import { cn } from "@/utils/classnames";
import useAuthenModal from "./useAuthenModal";

const AuthenModalContainer = styled.div`
  display: ${(props) =>
    props?.isOpen ? "block !important" : "none !important"};
  padding-left: ${(props) =>
    props?.isOpen ? "15px !important" : "0px !important"};
`;

const AuthenModal = () => {
  const { isOpen, activeTab, onClose, onChangeTab, ...authenProps } =
    useAuthenModal();
  // unmounted form
  // if (!isOpen) return <></>;
  return (
    <AuthenModalContainer
      className={cn(`modal`, { "fade show": isOpen })}
      isOpen={isOpen}
      id="signinModal"
      role="dialog"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div className="modal-content" style={{ zIndex: 1000 }}>
          <div className="modal-body">
            <button onClick={onClose} className="close">
              <span aria-hidden="true">
                <i className="icon-close" />
              </span>
            </button>
            <div className="form-box">
              <div className="form-tab">
                <ul
                  className="nav nav-pills nav-fill nav-border-anim"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      onClick={() => onChangeTab("signin")}
                      className={cn(`nav-link`, {
                        active: activeTab === "signin",
                      })}
                      id="signin-tab"
                    >
                      Sign In
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => onChangeTab("register")}
                      className={cn(`nav-link`, {
                        active: activeTab === "register",
                      })}
                      id="register-tab"
                    >
                      Register
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="tab-content-5">
                  <Signin {...authenProps} />
                  <Register {...authenProps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!isOpen && <ModalBackdrop />}
    </AuthenModalContainer>
  );
};

export default AuthenModal;
