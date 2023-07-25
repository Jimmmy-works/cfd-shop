import React, { useCallback, useMemo, useState } from "react";
import { forwardRef } from "react";

const SelectM = (
  {
    options,
    label,
    required,
    error,
    type,
    defaultValue,
    selectProps,
    control,
    ...propsSelect
  },
  ref
) => {
  return (
    <>
      <label>
        {label} <span>{required && "*"}</span>
      </label>
      <div className="select-custom ">
        <select
          onClick={propsSelect?.onClick}
          defaultValue={defaultValue}
          type={type}
          className={`form-control form-select ${error ? "input-error" : ""} `}
          id="city"
          aria-label="Default select example"
          {...selectProps}
        >
          {options?.length &&
            options?.map((option, index) => {
              return (
                <option value={option.value} key={option.value || index}>
                  {option.label}
                </option>
              );
            })}
        </select>
        <p className="form-error">{error || ""}</p>
      </div>
    </>
  );
};
const Select = forwardRef(SelectM);
export default Select;
