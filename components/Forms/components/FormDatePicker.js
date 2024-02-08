import React from 'react';
import {DatePicker} from "antd";
import dayjs from "dayjs";


const FormDatePicker = ({ format, disabled=false, value, onChange, ...props }) => {


  const handleChange = (dateObj, dateString) => {
    onChange(dateString)
  }

  return (
    <DatePicker
      format={format}
      disabled={disabled}
      style={{width: '100%'}}
      {...props}
      value={value ? dayjs(value) : ''}
      onChange={handleChange}
    />
  )
};

export default FormDatePicker;
