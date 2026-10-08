import React from 'react';
import {Form, Col, Row, Input} from "antd";
import FormSelect from "../components/FormSelect";
import {checkRequiredIfArchival, checkRequiredIfLibrary} from "../validations/requestItemFormValidation";
import FormRemoteSelectInfiniteScroll from "../components/FormRemoteSelectInfiniteScroll";

const ITEM_ORIGINS = [
  { value: 'FA', label: 'Archival'},
  { value: 'L', label: 'Library'},
  { value: 'FL', label: 'Film Library'}
]

export const RequestItemForm = ({form}) => {
  const item_type = Form.useWatch('item_origin', form);
  const archival_unit = Form.useWatch('archival_unit', form);

  const isDisabled = (field) => {
     switch (field) {
      case 'archival_unit':
        return item_type !== 'FA'
      case 'container':
        return item_type !== 'FA'
      case 'identifier':
        return item_type === 'FA'
      case 'title':
        return item_type === 'FA'
      case 'quantity':
        return item_type === 'FA'
      default:
        return true
    }
  }

  const getSeriesID = () => {
    if (archival_unit) {
      if (archival_unit.hasOwnProperty('value')) {
        return archival_unit['value']
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }

  return (
    <Col xs={24}>
      <Row gutter={12} style={{
        backgroundColor: '#f5f5f5',
        padding: '10px 0px',
        border: '1px solid #eee',
        marginBottom: '10px'
      }}>
        <Col xs={12}>
          <Form.Item label="Researcher" name="researcher" required rules={[{ required: true }]}>
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label="Request Date" name="request_date" required rules={[{ required: true }]}>
            <Input disabled={true} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={12}>
          <Form.Item
            label={'Origin'}
            name={'item_origin'}
            required rules={[{ required: true }]}>
            <FormSelect
              placeholder={'Item Origin'}
              allowClear
              data={ITEM_ORIGINS}
              labelField={'label'}
              valueField={'value'}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={12}>
          <Form.Item
            label={'Archival Unit'}
            name={'archival_unit'}
            rules={[(form) => checkRequiredIfArchival(form, 'item_origin')]}
          >
            <FormRemoteSelectInfiniteScroll
              valueField={'id'}
              labelField={'reference_code'}
              placeholder={'- Select Series -'}
              selectAPI={'/v1/research/requests/series/select/'}
              disabled={isDisabled('archival_unit')}
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            label={'Container'}
            name={'container'}
            rules={[(form) => checkRequiredIfArchival(form, 'item_origin')]}
          >
            <FormRemoteSelectInfiniteScroll
              valueField={'id'}
              labelField={'container_label'}
              placeholder={'- Select Container -'}
              selectAPI={getSeriesID() ? `/v1/research/requests/container/select/${getSeriesID()}` : undefined}
              disabled={isDisabled('container')}
            />
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item
            label={'Identifier'}
            name={'identifier'}
            rules={[(form) => checkRequiredIfLibrary(form, 'item_origin')]}
          >
            <Input
              disabled={isDisabled('identifier')}
            />
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item
            label={'Title'}
            name={'title'}
            rules={[(form) => checkRequiredIfLibrary(form, 'item_origin')]}
          >
            <Input
              disabled={isDisabled('title')}
            />
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item
            label={'Quantity'}
            name={'quantity'}
            rules={[(form) => checkRequiredIfLibrary(form, 'item_origin')]}
          >
            <Input
              disabled={isDisabled('quantity')}
            />
          </Form.Item>
        </Col>
      </Row>
    </Col>
  )
};

