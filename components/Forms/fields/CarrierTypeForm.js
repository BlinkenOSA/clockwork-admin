import React from 'react';
import {Form, Col, Input} from "antd";

export const CarrierTypeForm = ({readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item label="Type" name="type" required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Type (Original Language)" name="type_original_language">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Width" name="width">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Height" name="height">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Depth" name="depth">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Jasper Report" name="jasper_file">
          <Input />
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

