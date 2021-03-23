import React, {useState, useEffect} from 'react';
import {Select, Spin} from "antd";
import useSWR from "swr";
import {get} from "../../../utils/api";

const {Option} = Select;

const FormRemoteSelect = ({selectAPI, selectAPIParams, valueField, labelField, value, onChange, placeholder, disabled=false}) => {
  const [params, setParams] = useState(selectAPIParams);

  const { data, error } = useSWR([selectAPI, params], url => get(url, params));

  const handleSearch = (value) => {
    if (value.length > 2 || value.length === 0) {
      setParams(prevParams => ({
        ...prevParams,
        search: value
      }))
    }
  };

  const handleSelect = (value) => {
    console.log(value);
    setParams(prevParams => ({
      ...prevParams,
      search: ''
    }));
    onChange(value);
  };

  const selectOptions = data ? data.map(d => (
    <Option key={d[valueField]} value={d[valueField]}>{d[labelField]}</Option>
  )) : [];

  return (
    <Select
      showSearch
      allowClear
      defaultValue={value ? value : ''}
      filterOption={false}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder={placeholder}
      disabled={disabled}
    >
      {selectOptions}
    </Select>
  )
};

export default FormRemoteSelect;
