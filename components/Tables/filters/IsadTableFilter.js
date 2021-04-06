import React from "react";
import {Form, Col, Row, Input, Select} from "antd";
import style from "../TableFilters.module.css";

const IsadTableFilter = () => {
  const {Search} = Input;

  const statuses = [
    { value: 'draft', label: 'draft'},
    { value: 'final', label: 'final'},
    { value: 'not exists', label: 'not exists'}
  ];

  return (
    <Row gutter={10} type="flex">
      <Col span={8}>
        <Form.Item name="search">
          <Search
            placeholder={'Search...'}
            allowClear
            enterButton
            className={style.Search}/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="fonds">
          <Input
            placeholder={'Filter by fonds'}
            allowClear
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="status">
          <Select
            placeholder={'Filter by Status'}
            allowClear
            options={statuses}
          />
        </Form.Item>
      </Col>
    </Row>
  )
};

export default IsadTableFilter;
