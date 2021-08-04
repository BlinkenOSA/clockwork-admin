import {Input} from "antd";
import React, {useState} from "react";

const FormFilterSearchInput = ({value, onChange, ...props}) => {
  const [inputValue, setInputValue] = useState(value);

  const {Search} = Input;

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
    <Search
      value={inputValue}
      onPressEnter={onPressEnter}
      onChange={onValueChange}
      enterButton
      {...props}
    />
  )
};

export default FormFilterSearchInput;
