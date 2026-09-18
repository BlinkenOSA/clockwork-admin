import {Input} from "antd";
import React, {useState} from "react";
import {sanitizeForwardedProps} from "../../../../utils/functions/sanitizeForwardedProps";

const FormFilterInput = ({value, onChange, ...props}) => {
  const forwardedProps = sanitizeForwardedProps(props);
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
      {...forwardedProps}
    />
  )
};

export default FormFilterInput;
