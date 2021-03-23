import React from 'react';
import {Form, Col, Input, Row, Tabs} from "antd";
import {FormMultipleFields} from "../components/FormMultipleFields";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";

const { TabPane } = Tabs;

export const LanguageForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={8}>
        <Form.Item label="Language Name" name="language" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="ISO 639 2" name="iso_639_2">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="ISO 639 2" name="iso_639_3">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Authority URL" name="authority_url">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Wikipedia URL" name="wikipedia_url">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

