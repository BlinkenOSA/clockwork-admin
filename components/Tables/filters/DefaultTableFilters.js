import React from "react";
import {Form, Col, Row, Input, Select, InputNumber} from "antd";
import style from "../TableFilters.module.css";

const DefaultTableFilters = () => {
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
    </Row>
  )
};

export default DefaultTableFilters;
