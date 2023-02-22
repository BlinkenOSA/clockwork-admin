import React, {useState, useEffect} from 'react';
import {Select, Spin} from "antd";
import {useData} from "../../../utils/hooks/useData";
import {useList} from "react-use";
import {get} from "../../../utils/api";

const {Option} = Select;

const FormRemoteSelectInfiniteScroll = ({ selectAPI, selectAPIParams={}, valueField, labelField,
                            onChange, placeholder, mode='default',
                            disabled=false, renderFunction, searchMinLength=2, ...props }) => {

  const [params, setParams] = useState(selectAPIParams);

  const [selectLoading, setSelectLoading] = useState(false);
  const [selectAPIurl, setSelectAPIurl] = useState(selectAPI);
  const [selectData, { set, push }] = useList(undefined);
  const [isDataLast, setIsDataLast] = useState(false)

  const {data, loading} = useData(selectAPI, params);

  useEffect(() => {
    set([])
  }, [selectAPI])


  useEffect(() => {
    data && push(...data['results']);
    if (data) {
      if (data['next']) {
        setSelectAPIurl(data['next'])
        setIsDataLast(false)
      } else {
        setIsDataLast(true)
      }
    }
  }, [data]);


  const createParams = () => {
    const url = new URL(selectAPIurl);
    const URLParams = new URLSearchParams(url.search);

    setParams(prevParams => ({
      ...prevParams,
      page: URLParams.get('page')
    }))
  }


  const handleSearch = (value) => {
    if (value.length > searchMinLength || value.length === 0) {
      setParams(prevParams => ({
        ...prevParams,
        page: 1,
        search: value
      }))
      set([])
    }
  };

  const resetSelectOptions = () => {
    setParams(prevParams => ({
      ...prevParams,
      page: 1,
      search: ''
    }));
    set([])
  }

  const handleSelect = (value) => {
    onChange(value)
  };

  const handleClear = () => {
    resetSelectOptions()
    onChange(undefined);
  };

  const onScroll = async (event) => {
    if (!isDataLast) {
      const target = event.target;
      if (!loading && target.scrollTop + target.offsetHeight === target.scrollHeight) {
        setSelectLoading(true);
        target.scrollTo(0, target.scrollHeight);
        createParams()
      }
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
      labelInValue={true}
      {...props}
    >
      {selectOptions}
    </Select>
  )
};

export default FormRemoteSelectInfiniteScroll;
