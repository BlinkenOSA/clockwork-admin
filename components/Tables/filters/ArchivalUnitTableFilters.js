import React from "react";
import {Form, Col, Row, Input} from "antd";
import style from "../TableFilters.module.css";
import FormFilterSearchInput from "./components/FormFilterSearchInput";
import FormFilterInput from "./components/FormFilterInput";

const ArchivalUnitTableFilters = () => {
  return (
    <Row gutter={10} type="flex">
      <Col span={10}>
        <Form.Item name="search">
          <FormFilterSearchInput
            placeholder={'Search...'}
            allowClear
            enterButton
            className={style.Search}/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="fonds">
          <FormFilterInput
            placeholder={'Filter by fonds'}
            allowClear
          />
        </Form.Item>
      </Col>
    </Row>
  )
};

export default ArchivalUnitTableFilters;
