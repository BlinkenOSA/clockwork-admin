import React from "react";
import {Form, Col, Row, Input} from "antd";
import style from "../TableFilters.module.css";

const ArchivalUnitTableFilters = () => {
  const {Search} = Input;

  return (
    <Row gutter={10} type="flex">
      <Col span={10}>
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
    </Row>
  )
};

export default ArchivalUnitTableFilters;
