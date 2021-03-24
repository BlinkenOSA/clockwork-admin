import React from 'react';
import {Form, Col, Input, Row} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";


export const ArchivalUnitsSubFondsForm = ({type, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={4}>
        <Form.Item label="Fonds" name="fonds">
          <Input disabled />
        </Form.Item>
      </Col>
      <Col xs={14}>
        <Form.Item label="Fonds Title" name="fonds_title">
          <Input disabled />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Fonds Acronym" name="fonds_acronym">
          <Input disabled />
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label="Subfonds" name="subfonds" required rules={[{ required: true }]}>
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
          <Input value={'SF'} hidden/>
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
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Archival Unit Theme" name="theme">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'theme'}
            mode={'multiple'}
            selectAPI={'/v1/controlled_list/select/archival_unit_themes/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item name="parent">
          <Input hidden/>
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};
