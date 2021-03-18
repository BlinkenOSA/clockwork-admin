import React from 'react';
import {Form, Col, Input } from "antd";

export const AccessionForm = () => {
  return (
    <React.Fragment>
      <Col xs={12}>
        <Form.Item label="Accession Number" name="seq">
          <Input disabled />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Donor" name="donor">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Archival Unit" name="archival_unit">
          <Input />
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

