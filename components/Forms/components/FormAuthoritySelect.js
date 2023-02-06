import {Button, Col, Form, Input, Tooltip, Row, Table} from "antd";
import React, {useState} from "react";
import { SelectOutlined } from '@ant-design/icons';
import style from "./FormAuthoritySelect.module.css";
import {useData} from "../../../utils/hooks/useData";

const AuthoritySelectTable = ({tableColumnTitle, tableColumnField, dataSource, ...props}) => {
  const renderSelectButton = (data) => {
    return(
      <Tooltip title={'Select entry'}>
        <Button size="small" onClick={() => props.onSelect(data[tableColumnField])}>
          <SelectOutlined/>
        </Button>
      </Tooltip>
    )
  };

  const renderTitle = (data) => {
    return(
      <a href={data} target={'_blank'} rel="noopener noreferrer">{data}</a>
    )
  };

  const columns = [
    {
      title: tableColumnTitle,
      dataIndex: tableColumnField,
      key: tableColumnField,
      width: 400,
      sorter: false,
      render: renderTitle
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: false,
    }, {
      title: 'Actions',
      width: 150,
      className: style.ActionColumn,
      render: renderSelectButton
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={tableColumnField}
      size={'middle'}
      bordered={true}
      style={{marginBottom: '20px'}}
    />
  )
};

export const FormAuthoritySelect = ({api, type, nameField='name', field, form, columnTitle, columnField}) => {
  const [searchValue, setSearchValue] = useState('');

  const {data, loading} = useData(api, {query: searchValue, type: type});

  const onSearch = () => {
    const search = form.getFieldValue(nameField);
    if (search !== '') {
      setSearchValue(search);
    }
  };

  return (
    <React.Fragment>
      <Row gutter={10}>
        <Col span={20}>
          <Form.Item name={field}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button
            className={style.SearchButton}
            onClick={() => onSearch()}
            loading={loading}
          >
            Search
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={style.AuthorityTable}>
          <AuthoritySelectTable
            dataSource={data}
            onSelect={(val) => form.setFieldsValue({[field]: val})}
            tableColumnTitle={columnTitle}
            tableColumnField={columnField}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
};
