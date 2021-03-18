import React from "react";
import {Form, Col, Row, Input, Select, InputNumber} from "antd";
import style from "../TableFilters.module.css";

const AccessionTableFilters = () => {
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
        <Form.Item name="transfer_year">
          <Select
            placeholder={'Filter by transfer year'}
            allowClear
            options={
              Array(new Date().getFullYear()+1 - 1995).fill().map((_, idx) => {return {
                value: 1995 + idx, label: 1995 + idx
              }})
            }
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="fonds">
          <Input
            placeholder={'Filter by Fonds'}
            allowClear
          />
        </Form.Item>
      </Col>
    </Row>
  )
};

export default AccessionTableFilters;
