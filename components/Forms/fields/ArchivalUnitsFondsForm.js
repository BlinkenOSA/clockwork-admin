import React from 'react';
import {Form, Col, Input, Row} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";


export const ArchivalUnitsFondsForm = ({type, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={4}>
        <Form.Item
          label="Fonds"
          name="fonds"
          required
          rules={[{ required: true, type: 'number', min: 1 }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={14}>
        <Form.Item label="Title" name="title" required rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Acronym" name="acronym">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item name="level">
          <Input value={'F'} hidden/>
        </Form.Item>
      </Col>
      <Col xs={14}>
        <Form.Item label="Original Title" name="title_original">
          <Input />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Original Locale" name="original_locale">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'locale_name'}
            selectAPI={'/v1/controlled_list/select/locales/'}
            placeholder={'- Select Locale -'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Archival Unit Theme" name="theme">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'theme'}
            placeholder={'- Select Themes -'}
            selectAPI={'/v1/controlled_list/select/archival_unit_themes/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};
