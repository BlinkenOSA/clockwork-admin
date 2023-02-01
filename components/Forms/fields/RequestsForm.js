import React from 'react';
import {Form, Col, Row, DatePicker} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {RequestItems} from "./requests/RequestItems";


export const RequestsForm = ({form}) => {
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
            <FormRemoteSelect
              valueField={'id'}
              labelField={'name'}
              placeholder={'- Select Researcher -'}
              selectAPI={'/v1/research/researcher/select/'}
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label="Request Date" name="request_date" required rules={[{ required: true }]}>
            <DatePicker style={{width: '100%'}} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={24}>
          <RequestItems form={form}/>
        </Col>
      </Row>
    </Col>
  )
};

