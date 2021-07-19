import React, {useState, useEffect} from 'react';
import {Select, Spin} from "antd";
import {useData} from "../../../utils/hooks/useData";

const {Option} = Select;

const FormRemoteSelect = ({ selectAPI, selectAPIParams={}, valueField, labelField,
                            onChange, placeholder, mode='default',
                            disabled=false, renderFunction, ...props }) => {

  const [params, setParams] = useState(selectAPIParams);
  const [selectData, setSelectData] = useState([]);

  const {data, loading} = useData(selectAPI, params);

  useEffect(() => {
    data && setSelectData(data)
  }, [data]);

  const handleSearch = (value) => {
    if (value.length > 2 || value.length === 0) {
      setParams(prevParams => ({
        ...prevParams,
        search: value
      }))
    }
  };

  const handleSelect = (value) => {
    if (params.hasOwnProperty('search') && params['search'] !== "") {
      setParams(prevParams => ({
        ...prevParams,
        search: ''
      }));
    }
    onChange(value)
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const selectOptions = selectData.map(d => (
    <Option key={d[valueField]} value={d[valueField]}>
      {
        renderFunction ? renderFunction(d) : d[labelField]
      }
    </Option>
  ));

  return (
    <Select
      showSearch
      allowClear
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleSelect}
      onClear={handleClear}
      placeholder={placeholder}
      mode={mode}
      disabled={disabled}
      loading={loading}
      {...props}
    >
      {selectOptions}
    </Select>
  )
};

export default FormRemoteSelect;
