import React from "react";

const CheckBox = ({
  className,
  label,
  id,
  value,
  checked,
  onChange,
  ...checkboxProps
}) => {
  return (
    <>
      <input
        checked={checked}
        onChange={onChange}
        id={id || "checkbox"}
        value={value}
        type="checkbox"
        className={`custom-control-input ${className}`}
      />
      <label className="custom-control-label" htmlFor={id || "checkbox"}>
        {label}
      </label>
      {/* <span className="item-count">11</span> */}
    </>
  );
};

export default CheckBox;
