import React, {useState, useEffect} from 'react';
import {Radio} from "antd";

const FormRadioGroup = ({ value, options, onChange, valueField, labelField, disabled=false, ...props }) => {
  const radioOptions = options.map((d, idx) => (
    <Radio key={idx} style={{flex: 1}} value={d[valueField]}>{d[labelField]}</Radio>
  ));

  return (
    <Radio.Group
      defaultValue={value ? value : undefined}
      style={{display: 'flex'}}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {radioOptions}
    </Radio.Group>
  )
};

export default FormRadioGroup;
