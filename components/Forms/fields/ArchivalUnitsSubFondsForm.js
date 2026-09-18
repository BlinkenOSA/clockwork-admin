import React from 'react';
import {Form, Col, Input, Row, InputNumber} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";


export const ArchivalUnitsSubFondsForm = ({form, type, readOnly}) => {
  const subfonds = Form.useWatch('subfonds', form)

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
        <Form.Item
          label="Subfonds"
          name="subfonds"
          required
          rules={[{ required: true, type: 'number', min: 0 }]}
        >
          <InputNumber />
        </Form.Item>
      </Col>
      <Col xs={14}>
        <Form.Item label="Title" name="title" rules={[{
          validator: (rule, value) => {
            if (subfonds !== 0) {
              if (value.length === 0) {
                return Promise.reject(
                  new Error("Empty title is only allowed for 0 subfonds!"),
                );
              }
            }
            return Promise.resolve();
          }
        }]}>
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
            placeholder={'- Select Themes -'}
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
