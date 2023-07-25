import React, { createContext, useContext, useEffect, useState } from "react";

const RadioContext = createContext();
const RadioGroup = ({
  defaultValue,
  disabled,
  className,
  onChange,
  children,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  const onChangeCheck = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <RadioContext.Provider
      value={{
        defaultValue,
        disabled,
        className,
        onChange,
        onChangeCheck,
        value,
      }}
      className={`radio-group ${className}`}
    >
      {children}
    </RadioContext.Provider>
  );
};
const RadioItem = ({ children, disabled = false, value }) => {
  const { value: selectValue, onChangeCheck } = useContext(RadioContext);
  return (
    <div className="custom-control custom-radio">
      <input
        className="custom-control-input"
        type="radio"
        value={value}
        id={value}
        name={value}
        checked={selectValue === value}
        disabled={disabled}
        onChange={onChangeCheck}
      />
      <label className="custom-control-label" htmlFor={value}>
        {children}
      </label>
    </div>
  );
};
export default { Group: RadioGroup, Item: RadioItem };
