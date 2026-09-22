import React from 'react';
import {DatePicker} from "antd";
import dayjs from "dayjs";
import {sanitizeForwardedProps} from "../../../utils/functions/sanitizeForwardedProps";


const FormDatePicker = ({ format, disabled=false, value, onChange, ...props }) => {
  const forwardedProps = sanitizeForwardedProps(props);

  const handleChange = (dateObj, dateString) => {
    if (dateString === '') {
      onChange(null)
    } else {
      onChange(dateString)
    }
  }

  return (
    <DatePicker
      format={format}
      disabled={disabled}
      style={{width: '100%'}}
      {...forwardedProps}
      value={value ? dayjs(value) : null}
      onChange={handleChange}
    />
  )
};

export default FormDatePicker;
