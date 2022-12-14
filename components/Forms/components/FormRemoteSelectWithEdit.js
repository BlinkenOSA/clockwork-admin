import React, {useEffect, useState} from "react";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Drawer, Input, Select} from 'antd';
import _ from "lodash";
import {PopupForm} from "../PopupForm";
import {useData} from "../../../utils/hooks/useData";

const {Option} = Select;

export const FormRemoteSelectWithEdit = (
  { api, fieldName, module, selectAPI, selectAPIParams={}, valueField, labelField, onChange, placeholder,
    disabled=false, form, mode='default', ...props }) => {
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
    setSelectedRecord(action === 'edit' ? props.value : undefined);
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
          style={{ width: mode !== "multiple" ? "calc(100% - 92px)" : "calc(100% - 46px)"}}
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
        {
          mode !== 'multiple' &&
          <Button
            disabled={!props.value || disabled}
            onClick={() => {
              openForm('edit')
            }}
            type={'default'}
          >
            <EditOutlined/>
          </Button>
        }
        <Button
          onClick={() => {openForm('create')}}
          type={'default'}
          disabled={disabled}
        >
          <PlusOutlined/>
        </Button>
      </Input.Group>
      <Drawer
        title={_.capitalize(action)}
        width={'50%'}
        onClose={(e) => onClose()}
        open={drawerShown}
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
