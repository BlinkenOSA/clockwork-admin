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
        <Form.Item label="Width (mm)" name="width">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Height (mm)" name="height">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Depth (mm)" name="depth">
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

