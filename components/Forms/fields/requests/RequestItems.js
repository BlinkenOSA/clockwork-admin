import React, {useState} from "react";
import {Button, Col, Form, Input, Row, Select} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";
import FormSelect from "../../components/FormSelect";
import {checkRequiredIfArchival, checkRequiredIfLibrary} from "../../validations/requestItemFormValidation";

const ITEM_ORIGINS = [
  { value: 'FA', label: 'Archival'},
  { value: 'L', label: 'Library'},
  { value: 'FL', label: 'Film Library'}
]

export const RequestItems = ({form}) => {
  const request_items = Form.useWatch('request_items', form);

  const isDisabled = (field, row) => {
    if (request_items) {
      if (request_items[row]) {
        const item_type = request_items[row]['item_origin']

        switch (field) {
          case 'archival_unit':
            return item_type !== 'FA'
          case 'container':
            return item_type !== 'FA'
          case 'identifier':
            return item_type === 'FA'
          case 'title':
            return item_type === 'FA'
        }
      }
    }

    return true
  }

  const getSeriesID = (row) => {
    if (request_items) {
      if (request_items[row]) {
        return request_items[row]['archival_unit']
      }
    }
  }

  return (
    <React.Fragment>
      <div className={'ant-form-item-label'}>Requested Items</div>
      <Form.List name={'request_items'}>
        {(fields, { add, remove }) => {
          return (
            <>
              {
                fields.map((field, idx) => (
                <Row gutter={12} key={idx}>
                  <Col xs={4}>
                    <Form.Item name={[field.name, 'item_origin']} required rules={[{ required: true }]}>
                      <FormSelect
                        placeholder={'Item Origin'}
                        allowClear
                        data={ITEM_ORIGINS}
                        labelField={'label'}
                        valueField={'value'}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'archival_unit']}
                      rules={[(form) => checkRequiredIfArchival(form, [field.name, 'item_type'], true)]}
                    >
                      <FormRemoteSelect
                        valueField={'id'}
                        labelField={'reference_code'}
                        placeholder={'- Select Series -'}
                        selectAPI={'/v1/research/requests/series/select/'}
                        disabled={isDisabled('archival_unit', idx)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'container']}
                      rules={[(form) => checkRequiredIfArchival(form, [field.name, 'item_type'], true)]}
                    >
                      <FormRemoteSelect
                        valueField={'id'}
                        labelField={'container_label'}
                        placeholder={'- Select Container -'}
                        selectAPI={`/v1/research/requests/container/select/${getSeriesID(idx)}`}
                        disabled={isDisabled('container', idx)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'identifier']}
                      rules={[(form) => checkRequiredIfLibrary(form, [field.name, 'item_type'], true)]}
                    >
                      <Input
                        placeholder={'Identifier'}
                        disabled={isDisabled('identifier', idx)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'title']}
                      rules={[(form) => checkRequiredIfLibrary(form, [field.name, 'item_type'], true)]}
                    >
                      <Input
                        placeholder={'Title'}
                        disabled={isDisabled('title', idx)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={2}>
                    <Button
                      type="default"
                      onClick={() => remove(field.name)}
                      icon={<CloseOutlined />}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="default"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add
                </Button>
              </Form.Item>
            </>
          )
        }}
      </Form.List>
    </React.Fragment>
  )
};
