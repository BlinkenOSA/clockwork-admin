import {Col, Form, Input} from "antd";
import React from "react";

export const ExtentUnitForm = ({readOnly}) => {
  return (
    <Col xs={24}>
      <Form.Item label={'Extent Unit'} name={'unit'} required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Col>
  )
};
