import React, {useState} from 'react';
import {Form, Col, Input, Row, DatePicker, Card} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {RequestItems} from "./requests/RequestItems";
import style from "../Forms.module.css";


export const RequestsForm = () => {
  const [form] = Form.useForm();
  const initialValues = { request_items: [{}] }

  return (
    <Form
      name={`requests-create`}
      scrollToFirstError={true}
      form={form}
      layout={'vertical'}
      className={style.Form}
      initialValues={initialValues}
    >
      <Card size="small">
        <Col xs={24}>
          <Row gutter={12} style={{
            backgroundColor: '#f5f5f5',
            padding: '10px 0px',
            border: '1px solid #eee',
            marginBottom: '10px'
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
              <RequestItems form={form}/>
            </Col>
          </Row>
        </Col>
      </Card>
    </Form>
  )
};

