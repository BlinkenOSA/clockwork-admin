import React, {useState} from 'react';
import {Form, Col, Input, Card, Row, Button, notification} from "antd";
import style from "./Forms.module.css";
import {useData} from "../../utils/hooks/useData";
import {useForm} from "../../utils/hooks/useForm";

export const ProfileDataForm = () => {
  const afterFinish = () => {};
  const {form, formLoading, onFinish, errors, renderErrors} =
    useForm('/auth/users/me/', 'edit', 'Profile', afterFinish);

  const validateMessages = {
    required: 'This field is required!'
  };

  const {data, error} = useData('/auth/users/me/');

  return (
    <React.Fragment>
      { errors && renderErrors() }
      { data ?
      <Form
        name={`profile-data-form`}
        initialValues={data}
        onFinish={onFinish}
        scrollToFirstError={true}
        form={form}
        validateMessages={validateMessages}
        layout={'vertical'}
        className={style.Form}
      >
        <Card size="small" title={'My Profile'}>
          <Row>
            <Col xs={24}>
              <Form.Item label="Username" name="username" required rules={[{required: true}]}>
                <Input disabled={true}/>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="First Name" name="first_name" required rules={[{required: true}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Last Name" name="last_name" required rules={[{required: true}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Email Name" name="email" required rules={[{required: true}]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card size={'small'} className={style.Footer}>
          <Row gutter={10} type="flex">
            <Col xs={4}>
              <Button
                loading={formLoading}
                type={'primary'}
                htmlType={'submit'}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
      </Form> : '' }
    </React.Fragment>
  )
};

