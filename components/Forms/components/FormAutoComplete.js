import React, {useState, useEffect} from 'react';
import {Select} from "antd";
import {useData} from "../../../utils/hooks/useData";

const {Option} = Select;

const FormRemoteSelect = ({ selectAPI, valueField, labelField,
                            onChange, placeholder,
                            disabled=false, renderFunction, ...props }) => {

  const [params, setParams] = useState({});
  const [acData, setAcData] = useState([]);

  const {data, loading} = useData(selectAPI, params);

  useEffect(() => {
    data && setAcData(data)
  }, [data]);

  const handleSearch = (value) => {
    if (value.length > 2 || value.length === 0) {
      setParams(prevParams => ({
        ...prevParams,
        search: value
      }))
    }
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const acOptions = acData.map(d => (
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
