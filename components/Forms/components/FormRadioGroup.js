import React, {useState, useEffect} from 'react';
import {Radio} from "antd";

const FormRadioGroup = ({ value, options, defaultValue = undefined, optionType='radio', onChange, valueField, labelField, disabled=false, ...props }) => {
  const radioOptions = options.map((d, idx) => (
    <Radio key={idx} style={{flex: 1}} value={d[valueField]}>{d[labelField]}</Radio>
  ));

  return (
    <Radio.Group
      defaultValue={value ? value : defaultValue}
      style={{display: optionType !== 'button' ? 'flex' : 'block'}}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      optionType={optionType}
      buttonStyle="solid"
    >
      {radioOptions}
    </Radio.Group>
  )
};

export default FormRadioGroup;
