import React from 'react';
import {Form, Col, Input} from "antd";

export const NationalityForm = ({readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item label="Nationality" name="nationality" required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

