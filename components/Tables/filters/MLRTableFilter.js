import {Col, Form, Input, Row} from "antd";
import React from "react";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";
import FormFilterInput from "./components/FormFilterInput";

const MLRTableFilter = () => {
  return (
    <React.Fragment>
      <Row gutter={[10]}>
        <Col span={14}>
          <Form.Item name="fonds">
            <FormRemoteSelect
              valueField={'id'}
              labelField={'title_full'}
              selectAPI={'/v1/archival_unit/select/'}
              selectAPIParams={{level: 'F'}}
              placeholder={'- Select Fonds -'}
            />
          </Form.Item>
        </Col>
        <Col xs={10}>
          <Form.Item name="carrier_type">
            <FormRemoteSelect
              valueField={'id'}
              labelField={'type'}
              placeholder={'- Select Carrier Type -'}
              selectAPI={'/v1/controlled_list/select/carrier_types/'}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10]}>
        <Col xs={8}>
          <Form.Item name="building">
            <FormRemoteSelect
              valueField={'id'}
              labelField={'building'}
              placeholder={'- Select Building -'}
              selectAPI={'/v1/controlled_list/select/buildings/'}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="module">
            <FormFilterInput
              placeholder={'Filter by module'}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="row">
            <FormFilterInput
              placeholder={'Filter by row'}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="section">
            <FormFilterInput
              placeholder={'Filter by section'}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="shelf">
            <FormFilterInput
              placeholder={'Filter by shelf'}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default MLRTableFilter;
