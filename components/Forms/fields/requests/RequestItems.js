import React, {useState} from "react";
import {Button, Col, Form, Input, Row, Select} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";
import FormSelect from "../../components/FormSelect";

const ITEM_TYPES = [
  { value: 'FA', label: 'Archival'},
  { value: 'L', label: 'Library'},
  { value: 'FL', label: 'Film Library'}
]

export const RequestItems = ({form}) => {
  const request_items = Form.useWatch('request_items', form);

  const getSpecificFields = (field, row) => {
    switch (request_items[row]['item_type']) {
      case 'FA':
        return (
          <React.Fragment>
            <Col xs={4}>
              <Form.Item
                {...field}
                name={[field.name, 'container']}
              >
                <FormRemoteSelect
                  valueField={'id'}
                  labelField={'reference_code'}
                  placeholder={'- Select Series -'}
                  selectAPI={'/v1/research/requests/series/select/'}
                />
              </Form.Item>
            </Col>
            <Col xs={4}>
              <Form.Item
                {...field}
                name={[field.name, 'container_no']}
              >
                <FormRemoteSelect
                  valueField={'id'}
                  labelField={'container_no'}
                  placeholder={'- Select Container -'}
                  selectAPI={'/v1/research/requests/container/select/'}
                />
              </Form.Item>
            </Col>
          </React.Fragment>
        )
      case 'L':
      case 'FL':
        return (
          <React.Fragment>
            <Col xs={4}>
              <Form.Item
                {...field}
                name={[field.name, 'title']}
              >
                <Input placeholder={'Title'}/>
              </Form.Item>
            </Col>
          </React.Fragment>
        )
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
                    <Form.Item name={[field.name, 'item_type']}>
                      <FormSelect
                        placeholder={'Item Type'}
                        allowClear
                        data={ITEM_TYPES}
                        labelField={'label'}
                        valueField={'value'}
                      />
                    </Form.Item>
                  </Col>
                  { getSpecificFields(field, idx) }
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
