import {Input} from "antd";
import React, {useState} from "react";
import {sanitizeForwardedProps} from "../../../../utils/functions/sanitizeForwardedProps";

const FormFilterSearchInput = ({value, onChange, ...props}) => {
  const forwardedProps = sanitizeForwardedProps(props);
  const [inputValue, setInputValue] = useState(value);

  const {Search} = Input;

  const onSearch = (value, e) => {
    onChange?.(value)
  };

  const onValueChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <Search
      value={inputValue}
      onSearch={onSearch}
      onChange={onValueChange}
      {...forwardedProps}
    />
  )
};

export default FormFilterSearchInput;
