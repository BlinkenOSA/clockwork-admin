import React from 'react';
import {Form, Col, Input} from "antd";

export const KeywordForm = ({readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item label="Keyword" name="keyword" required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

