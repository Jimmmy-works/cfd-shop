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
  // console.log("activeTab", activeTab);
  // console.log("isOpen ", isOpen);
  // console.log("handleSignin", handleSignin);
  // const [errors, setErrors] = useState({});
  // const rules = {
  //   email: [
  //     {
  //       required: true,
  //       message: "Email không được bỏ trống.",
  //     },
  //     {
  //       regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  //       message: "Email không đúng định dạng",
  //     },
  //   ],

  //   password: [
  //     {
  //       required: true,
  //       message: "Mật khẩu không được bỏ trống.",
  //     },
  //     {
  //       // regex: /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/,
  //       regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  //       message: `Mật khẩu ko đúng`,
  //     },
  //   ],
  // };
  // const register = (attInput) => {
  //   return {
  //     value: form[attInput] || "",
  //     onChange: (e) => {
  //       setForm({ ...form, [attInput]: e.target.value });
  //     },
  //     error: errors[attInput],
  //   };
  // };
  // const onSubmit = (ev) => {
  //   ev.preventDefault();
  //   const errorObject = Validate(rules, form);
  //   setErrors(errorObject);
  //   if (Object.keys(errorObject)?.length === 0) {
  //     const payload = {
  //       email: form?.email || "",
  //       password: form?.password || "",
  //     };
  //     handleSignin(payload);
  //     if (!!!form?.checkbox) {
  //       setForm({});
  //       localStorage.removeItem("email");
  //       localStorage.removeItem("password");
  //     } else {
  //       localStorage.setItem("email", form?.email);
  //       localStorage.setItem("password", form?.password);
  //       setForm(
  //         (email = localStorage.getItem("email")),
  //         (password = localStorage.getItem("password"))
  //       );
  //     }
  //   }
  // };

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
        localStorage.setItem("email", data?.email);
        localStorage.setItem("password", data?.password);
        setValue("email", data?.email);
        setValue("password", data?.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
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
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: `Mật khẩu bao gồm chữ Hoa, chữ thường và số`,
              },
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
