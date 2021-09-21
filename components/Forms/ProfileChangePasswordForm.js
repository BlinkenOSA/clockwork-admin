import React from 'react';
import {Form, Col, Input, Card, Row, Button} from "antd";
import style from "./Forms.module.css";
import {useForm} from "../../utils/hooks/useForm";

export const ProfileChangePasswordForm = () => {
  const afterFinish = () => {};
  const {form, formLoading, onFinish, errors, renderErrors} =
    useForm('/auth/users/set_password/', 'create', 'Password', afterFinish);

  return (
    <Form
      name={`profile-change-password-form`}
      scrollToFirstError={true}
      form={form}
      onFinish={onFinish}
      layout={'vertical'}
      className={style.Form}
    >
      <Card size="small" title={'Change Password'}>
        <Row>
          <Col xs={24}>
            <Form.Item label="Old Password" name="current_password">
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="New Password" name="new_password">
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Retype New Password" name="re_new_password">
              <Input.Password />
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
    </Form>
  )
};

