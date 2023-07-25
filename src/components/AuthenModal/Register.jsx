import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/paths";
import { Validate } from "@/utils/Validate";
import useAuthenModal from "./useAuthenModal";
import { cn } from "@/utils/classnames";
import Social from "./Social";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { Input } from "../Input";
import { CheckboxAgreePrivacy } from "../CheckBoxCustom/CheckboxAgreePrivacy";

const Register = () => {
  const {
    activeTab,
    handleRegister,
    isChecked,
    setIsChecked,
    isOpen,
    onClose,
  } = useAuthenModal();
  // React Hook Form
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    setError,

    watch,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm();

  // // Form Validate
  // const [form, setForm] = useState({});
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
  //       message: `Mật khẩu phải từ 8 kí tự trở lên, bao gồm chữ thường, chữ viết Hoa và số`,
  //     },
  //   ],
  //   checkbox: [
  //     {
  //       required: true,
  //       message: `   Xin vui lòng đồng ý với điều khoản của chúng tôi`,
  //     },
  //   ],
  // };
  // const register = (attInput) => {
  //   return {
  //     value: form[attInput] || "",
  //     onChange: (e) => {
  //       console.log(e.target);
  //       setForm({ ...form, [attInput]: e.target.value ?? e.target?.checked });
  //     },
  //     error: errors[attInput],
  //   };
  // };
  // const onSubmit = (ev) => {
  //   ev.preventDefault();
  //   const errorObject = Validate(rules, form);
  //   formState?.errors(errorObject);
  //   if (Object.keys(errorObject)?.length === 0) {
  //     const payload = {
  //       firstName: "form?.email",
  //       lastName: "",
  //       password: form?.password || "",
  //       email: form?.email || "",
  //     };
  //     handleRegister(payload);
  //   }
  // };
  const onSubmit = (data, error) => {
    if (data) {
      handleRegister(data);
    }
    if (error) {
      setValue("email", "");
      setValue("password", "");
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setError("email", {});
      setError("password", {});
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeTab === "register") {
      //until useForm
      setFocus("email");
    }
  }, [activeTab, errors]);
  return (
    <div
      className={cn(`tab-pane`, {
        "fade show active": activeTab === "register",
      })}
      id="register"
      role="tabpanel"
      aria-labelledby="register-tab"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <Input
            label="Your email address"
            type="text"
            {...register("email", {
              required: "Email không được bỏ trống.",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: `Nhập đúng định dạng abc@gmail.com`,
              },
              onChange: (e) => console.log("e.target.value", e.target.value),
            })}
            error={errors?.email?.message || ""}
            required
          />
        </div>
        <div className="form-group">
          <Input
            label="Password"
            type="password"
            required
            {...register("password", {
              required: "Mật khẩu không được bỏ trống.",
              // pattern: {
              //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              //   message: `Mật khẩu bao gồm chữ Hoa, chữ thường và số`,
              // },
            })}
            error={errors?.password?.message || ""}
          />
        </div>
        {/* <div className="form-group">
          <Input label="Confirm password" type="confirm" required />
        </div> */}
        <div className="form-footer">
          <Button type="submit" variant="outline">
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <div className="custom-control custom-checkbox">
            <CheckboxAgreePrivacy
              required
              error={errors?.checkPrivacy?.message || ""}
              label={
                <>
                  I agree to the
                  <Link style={{ paddingLeft: 5 }} to={PATHS.PRIVACYPOLICY}>
                    privacy policy
                  </Link>
                </>
              }
              checkboxProps={{
                ...register("checkPrivacy", {
                  required: "Xin vui lòng đồng ý với điều khoản.",
                }),
              }}
            />
          </div>
        </div>
      </form>
      <Social />
    </div>
  );
};

export default Register;
