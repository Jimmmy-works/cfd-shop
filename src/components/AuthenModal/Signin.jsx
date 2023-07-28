import React, { useEffect, useRef, useState } from "react";
import { Validate } from "@/utils/Validate";
import useAuthenModal from "./useAuthenModal";
import { cn } from "@/utils/classnames";
import CheckBoxRemember from "../CheckBoxCustom/CheckBoxRemember";
import Social from "./Social";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/paths";
import { Input } from "../Input";
import { useForm, useFormState } from "react-hook-form";
import Button from "../Button";
import { signin } from "@/store/reducer/authReducer";

const Signin = () => {
  // useAuthen
  const { activeTab, handleSignin, isOpen, isChecked, setIsChecked, onClose } =
    useAuthenModal();
  // useForm
  const {
    register,
    setFocus,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) {
      handleSignin(data);
      setIsChecked(data);
      if (!!isChecked) {
        sessionStorage.setItem("email", data?.email);
        sessionStorage.setItem("password", data?.password);
        setValue("email", data?.email);
        setValue("password", data?.password);
      } else {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        setValue("email", "");
        setValue("password", "");
      }
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setError("email", {});
      setError("password", {});
    }
  }, [isOpen]);
  useEffect(() => {
    if (activeTab === "signin" || isOpen) {
      setFocus("email");
    }
  }, [activeTab, isOpen]);
  return (
    <div
      className={cn(`tab-pane`, { "fade show active": activeTab === "signin" })}
      id="signin"
      role="tabpanel"
      aria-labelledby="signin-tab"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <Input
            label="Username or email address"
            type="text"
            required
            error={errors?.email?.message}
            {...register("email", {
              required: "Email không được bỏ trống.",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Nhập đúng định dạng abc@gmail.com",
              },
            })}
          />
        </div>
        <div className="form-group">
          <Input
            label="Password"
            type="password"
            required
            error={errors?.password?.message}
            {...register("password", {
              required: "Mật khẩu không được bỏ trống.",
            })}
          />
        </div>
        <div className="form-footer">
          <Button variant="outline" type="submit">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <div className="custom-control custom-checkbox">
            <CheckBoxRemember
              type="checkbox"
              label={`Remember Me`}
              id="signin-remember"
              className="custom-control-input"
              {...register("checkbox")}
              isChecked={isChecked}
              handleCheckbox={() =>
                setIsChecked((prev) => ({
                  ...prev,
                  checkbox: !prev.checkbox ?? true,
                }))
              }
            />
          </div>
          <Link to={PATHS.HOME} className="forgot-link">
            Forgot Your Password?
          </Link>
        </div>
      </form>
      <Social />
    </div>
  );
};

export default Signin;
