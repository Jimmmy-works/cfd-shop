import React from "react";

const CheckBoxRemember = ({
  type,
  label,
  required,
  id,
  className,
  handleCheckbox,
  isChecked,
  ...rememberProps
}) => {
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

export default CheckBoxRemember;
