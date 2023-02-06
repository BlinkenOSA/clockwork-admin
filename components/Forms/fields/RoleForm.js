import {Col, Form, Input} from "antd";
import React from "react";

export const RoleForm = ({readOnly}) => {
  return (
    <Col xs={24}>
      <Form.Item label={'Role'} name={'role'} required rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Col>
  )
};
