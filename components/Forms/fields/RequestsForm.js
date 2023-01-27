import React from 'react';
import {Form, Col, Input, Row, DatePicker} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {RequestItems} from "./requests/RequestItems";


export const RequestsForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Row gutter={12} style={{
          backgroundColor: '#f5f5f5',
          padding: '10px 0px',
          border: '1px solid #eee'
        }}>
          <Col xs={12}>
            <Form.Item label="Researcher" name="researcher">
              <FormRemoteSelect
                valueField={'id'}
                labelField={'name'}
                placeholder={'- Select Researcher -'}
                selectAPI={'/v1/research/researcher/select/'}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="Request Date" name="request_date">
              <DatePicker style={{width: '100%'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col xs={24}>
            <RequestItems disabled={readOnly} />
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  )
};

