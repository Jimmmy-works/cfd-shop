import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import styled from "styled-components";
const InputCustom = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }
`;
const QuantityInputM = (
  {
    min = 1,
    max = 10,
    value,
    onChange,
    step = 1,
    type,
    className,
    ...quantityInputProps
  },
  ref
) => {
  const [renderValue, setRenderValue] = useState(value || 1);
  // useEffect(() => {
  //   if (renderValue !== value) {
  //     onChange?.(renderValue);
  //   }
  // }, [renderValue]);

  // useEffect(() => {
  //   const myTime = setTimeout(() => {
  //     if (renderValue !== value) {
  //       setRenderValue(value);
  //     }
  //   }, 300);

  //   return () => {
  //     clearTimeout(myTime);
  //   };
  // }, [value]);

  const onInputBlur = (e) => {
    const value = modifyValue(e.target.value);
    setRenderValue(value);
    onChange?.(value);
  };
  const onInputOnchange = (e) => {
    setRenderValue(e.target.value);
  };
  const onIncrease = () => {
    const value = modifyValue(Number(renderValue) + Number(step));
    setRenderValue(value);
    onChange?.(value);
  };
  const onDecrease = () => {
    const value = modifyValue(Number(renderValue) - Number(step));
    setRenderValue(value);
    onChange?.(value);
  };
  const modifyValue = (value) => {
    if (value > max) {
      return (value = max);
    } else if (value < min) {
      return (value = min);
    } else {
      return value;
    }
  };

  return (
    <div className={className}>
      <div className="input-group  input-spinner">
        <div className="input-group-prepend">
          <button
            onClick={onDecrease}
            style={{ minWidth: 26 }}
            className="btn btn-decrement btn-spinner"
            type="button"
          >
            <i className="icon-minus" />
          </button>
        </div>
        <InputCustom
          value={renderValue}
          // defaultValue={renderValue}
          type="number"
          defaultValue={1}
          min={min}
          max={max}
          step={step}
          //   data-decimals={0}
          onChange={onInputOnchange}
          onBlur={onInputBlur}
          style={{ textAlign: "center" }}
          className="form-control "
          {...quantityInputProps}
        />
        <div className="input-group-append">
          <button
            onClick={onIncrease}
            style={{ minWidth: 26 }}
            className="btn btn-increment btn-spinner"
            type="button"
          >
            <i className="icon-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};
const QuantityInput = forwardRef(QuantityInputM);
export default QuantityInput;
