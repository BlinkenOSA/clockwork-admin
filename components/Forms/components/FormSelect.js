import React, {useState, useEffect} from 'react';
import {Select, Spin} from "antd";
import {useData} from "../../../utils/hooks/useData";

const {Option} = Select;

const FormSelect = ({ data, selectAPIParams, valueField, labelField,
                            onChange, placeholder, mode='default',
                            disabled=false, ...props }) => {

  const handleSelect = (value) => {
    onChange(value)
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const selectOptions = data.map(d => (
    <Option key={d[valueField]} value={d[valueField]}>{d[labelField]}</Option>
  ));

  return (
    <Select
      showSearch
      allowClear
      filterOption={false}
      onSelect={handleSelect}
      onClear={handleClear}
      placeholder={placeholder}
      mode={mode}
      disabled={disabled}
      {...props}
    >
      {selectOptions}
    </Select>
  )
};

export default FormSelect;
