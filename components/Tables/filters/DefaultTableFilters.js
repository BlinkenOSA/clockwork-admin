import React from "react";
import {Form, Col, Row} from "antd";
import style from "../TableFilters.module.css";
import FormFilterSearchInput from "./components/FormFilterSearchInput";

const DefaultTableFilters = () => {
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
    </Row>
  )
};

export default DefaultTableFilters;
