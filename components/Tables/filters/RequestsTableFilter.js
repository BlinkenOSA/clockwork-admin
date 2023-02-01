import React from "react";
import {Form, Col, Row, Select, Button} from "antd";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";

const ITEM_TYPES = [
  { value: 'FA', label: 'Archival'},
  { value: 'L', label: 'Library'},
  { value: 'FL', label: 'Film Library'}
]

const STATUSES = [
  { value: '1', label: 'In Queue'},
  { value: '2', label: 'Pending'},
  { value: '3', label: 'Delivered'},
  { value: '4', label: 'Reshelved'},
  { value: '5', label: 'Returned'}
]

const RequestsTableFilter = () => {
  return (
    <Row gutter={10} type="flex">
      <Col span={6}>
        <Form.Item name="status">
          <Select
            placeholder={'Filter by Status'}
            allowClear
            options={STATUSES}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="item_origin">
          <Select
            placeholder={'Filter by Item Type'}
            allowClear
            options={ITEM_TYPES}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="request__researcher">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'name'}
            placeholder={'- Select Researcher -'}
            selectAPI={'/v1/research/researcher/select/'}
          />
        </Form.Item>
      </Col>
    </Row>
  )
};

export default RequestsTableFilter;
