import React, {useState, useEffect} from 'react';
import {Select, Spin} from "antd";
import {useData} from "../../../utils/hooks/useData";
import {useList, useUpdateEffect} from "react-use";
import {get} from "../../../utils/api";

const {Option} = Select;

const FormRemoteSelectInfiniteScroll = ({ selectAPI, selectAPIParams={}, valueField, labelField,
                            onChange, placeholder, mode='default',
                            disabled=false, renderFunction, searchMinLength=2, ...props }) => {

  const [data, setData] = useState(undefined);
  const [params, setParams] = useState(selectAPIParams);

  const [loading, setLoading] = useState(false);

  const [selectAPIurl, setSelectAPIurl] = useState(undefined);
  const [selectAPINextURL, setSelectAPINextURL] = useState(undefined)

  const [selectData, { set, push }] = useList(undefined);
  const [isDataLast, setIsDataLast] = useState(false)

  useEffect(() => {
    if (selectAPI) {
      if (selectAPIurl) {
        onChange(undefined)
      }
      setSelectAPIurl(selectAPI)
    } else {
      resetSelectOptions()
    }
  }, [selectAPI])

  useUpdateEffect(() => {
    fetchData()
  }, [params])

  useUpdateEffect(() => {
    resetSelectOptions()
  }, [selectAPIurl])

  useUpdateEffect(() => {
    data && push(...data['results']);
    if (data) {
      if (data['next']) {
        setSelectAPINextURL(data['next'])
        setIsDataLast(false)
      } else {
        setIsDataLast(true)
      }
    }
  }, [data]);

  const fetchData = () => {
    get(selectAPIurl, params).then(response => {
      setLoading(false);
      setData(response.data)
    }).catch(error => {
      setData(undefined);
      setLoading(false);
    })
  }

  const createParams = () => {
    const url = new URL(selectAPINextURL);
    const URLParams = new URLSearchParams(url.search);

    setParams(prevParams => ({
      ...prevParams,
      page: URLParams.get('page')
    }))
  }

  const handleSearch = (value) => {
    if (value.length > searchMinLength || value.length === 0) {
      setParams({search: value})
      set([])
    }
  };

  const resetSelectOptions = () => {
    setParams({});
    set([])
  }

  const handleSelect = (value) => {
    onChange(value)
    resetSelectOptions()
  };

  const handleClear = () => {
    resetSelectOptions()
    onChange(undefined);
  };

  const onScroll = async (event) => {
    if (!isDataLast) {
      const target = event.target;
      if (!loading && target.scrollTop + target.offsetHeight === target.scrollHeight) {
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
