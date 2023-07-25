import { PATHS } from "@/contants/paths";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const CheckboxAgreePrivacyM = ({
  // type,
  required,
  value,
  isCheckbox,
  label,
  handleCheckbox,
  form,
  error,
  isChecked,
  checkboxProps,
  ...props
}) => {
  return (
    <>
      <>
        <input
          // type={type}
          style={{
            left: 0,
            zIndex: 4,
            top: "5px",
            width: "1.6rem",
            height: "1.6rem",
          }}
          type="checkbox"
          className="custom-control-input input-error"
          id="register-policy"
          {...checkboxProps}
        />
        <label
          value={value}
          // onClick={onCheckBox}
          className="custom-control-label input-error "
          htmlFor="register-policy"
        >
          {label}
          {required && "*"}
        </label>
      </>
      {/* {error && <p className="form-error">{error}</p>} */}
      {error && <p className="form-error">{error}</p>}
    </>
  );
};

export const CheckboxAgreePrivacy = CheckboxAgreePrivacyM;
// export const CheckboxAgreePrivacy = forwardRef(CheckboxAgreePrivacyM);
