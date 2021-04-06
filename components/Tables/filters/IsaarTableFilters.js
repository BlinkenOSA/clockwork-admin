import React from "react";
import {Form, Col, Row, Input, Select} from "antd";
import style from "../TableFilters.module.css";

const IsaarTableFilters = () => {
  const { Search } = Input;
  const { Option } = Select;

  const types = [
    { value: 'P', label: 'Personal'},
    { value: 'C', label: 'Corporate Body'},
    { value: 'F', label: 'Family'}
  ];

  const statuses = [
    { value: 'draft', label: 'draft'},
    { value: 'final', label: 'final'}
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
        <Form.Item name="type">
          <Select
            placeholder={'Filter by Type'}
            allowClear
            options={types}
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

export default IsaarTableFilters;
