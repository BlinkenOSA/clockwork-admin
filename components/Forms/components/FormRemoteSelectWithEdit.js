import React, {useEffect, useState} from "react";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Drawer, Input, Select} from 'antd';
import _ from "lodash";
import {PopupForm} from "../PopupForm";
import {useData} from "../../../utils/hooks/useData";

const {Option} = Select;

export const FormRemoteSelectWithEdit = ({api, fieldName, module, selectAPI, selectAPIParams={}, valueField, labelField, onChange, placeholder, disabled=false, form, ...props}) => {
  const [params, setParams] = useState(selectAPIParams);
  const [selectData, setSelectData] = useState([]);
  const [drawerShown, setDrawerShown] = useState(false);
  const [action, setAction] = useState('create');
  const [selectedRecord, setSelectedRecord] = useState({});

  const {data, loading, refresh} = useData(selectAPI, params);

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
    <Option key={d[valueField]} value={d[valueField]}>{d[labelField]}</Option>
  ));

  const openForm = (action) => {
    setAction(action);
    setSelectedRecord(action === 'edit' ? value : undefined);
    setDrawerShown(true);
  };

  const onClose = (id) => {
    refresh();
    if (id) {
      form.setFieldsValue({[fieldName]: id})
    }
    setDrawerShown(false);
  };

  return (
    <React.Fragment>
      <Input.Group style={{ width: "100%", whiteSpace: "nowrap" }} compact>
        <Select
          showSearch
          allowClear
          style={{ width: "calc(100% - 92px)" }}
          filterOption={false}
          onSearch={handleSearch}
          onSelect={handleSelect}
          onClear={handleClear}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          {...props}
        >
          {selectOptions}
        </Select>
        <Button
          onClick={() => {openForm('edit')}}
          type={'default'}
        >
          <EditOutlined/>
        </Button>
        <Button
          onClick={() => {openForm('create')}}
          type={'default'}
        >
          <PlusOutlined/>
        </Button>
      </Input.Group>
      <Drawer
        title={_.capitalize(action)}
        width={'50%'}
        onClose={(e) => onClose()}
        visible={drawerShown}
        destroyOnClose={true}
      >
        <PopupForm
          api={api}
          selectedRecord={selectedRecord}
          module={module}
          type={action}
          onClose={onClose}
        />
      </Drawer>
    </React.Fragment>
  )
};
