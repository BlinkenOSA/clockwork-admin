import React, {useState, useEffect} from 'react';
import {Select, Spin} from "antd";
import {useData} from "../../../utils/hooks/useData";

const {Option} = Select;

const FormRemoteSelectInfiniteScroll = ({ selectAPI, selectAPIParams={}, valueField, labelField,
                            onChange, placeholder, mode='default',
                            disabled=false, renderFunction, searchMinLength=2, ...props }) => {

  const [params, setParams] = useState(selectAPIParams);
  const [selectData, setSelectData] = useState([]);
  const [selectLoading, setSelectLoading] = useState(false);

  const {data, loading} = useData(selectAPI, params);

  useEffect(() => {
    data && setSelectData(data['results'])
  }, [data]);

  const handleSearch = (value) => {
    if (value.length > searchMinLength || value.length === 0) {
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

  const onScroll = async (event) => {
    const target = event.target;
    if (!loading && target.scrollTop + target.offsetHeight === target.scrollHeight) {
      setSelectLoading(true);
      console.log("Load...");
      target.scrollTo(0, target.scrollHeight);
    }
  }

  const selectOptions = selectData.map(d => (
    <Option key={d[valueField]} value={d[valueField]}>
      {
        renderFunction ? renderFunction(d) : d[labelField]
      }
    </Option>
    )
  )

  return (
    <Select
      showSearch
      allowClear
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleSelect}
      onClear={handleClear}
      onPopupScroll={onScroll}
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

export default FormRemoteSelectInfiniteScroll;
