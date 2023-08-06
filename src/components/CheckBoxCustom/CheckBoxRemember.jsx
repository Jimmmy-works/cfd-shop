import React, { forwardRef } from "react";

const CheckBoxRememberM = (
  {
    type,
    label,
    required,
    id,
    className,
    handleCheckbox,
    isChecked,
    ...rememberProps
  },
  ref
) => {
  return (
    <>
      <input type={type} className={className} id={id} {...rememberProps} />
      <label
        onClick={handleCheckbox}
        className="custom-control-label"
        htmlFor="signin-remember"
      >
        {label}
        {required && "*"}
      </label>
    </>
  );
};
const CheckBoxRemember = forwardRef(CheckBoxRememberM);
export default CheckBoxRemember;
