import {Input} from "antd";
import React, {useState} from "react";

const FormFilterInput = ({value, onChange, ...props}) => {
  const [inputValue, setInputValue] = useState(value);

  const onPressEnter = (e) => {
    onChange?.(e.target.value)
  };

  const onValueChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === "") {
      onChange?.(value)
    }
  };

  return (
    <Input
      value={inputValue}
      onPressEnter={onPressEnter}
      onChange={onValueChange}
      {...props}
    />
  )
};

export default FormFilterInput;
