import {Button, Col, Form, notification, Row} from "antd";
import style from "./Forms.module.css";
import React, {useState} from "react";
import {post} from "../../utils/api";
import FormRemoteSelect from "./components/FormRemoteSelect";

export const ResearchersVisitsForm = ({refresh}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const validateMessages = {
    required: 'This field is required!'
  };

  const onFinish = (values) => {
    setLoading(true)
    post(`/v1/research/visits/check-in/${values['researcher']}`).then(response => {
      refresh();
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      notification.error({
        duration: 3,
        message: 'Error!',
        description: error.response.data,
      });
    })
  };

  return (
    <Form
      name={`researcher-visit-form`}
      scrollToFirstError={true}
      form={form}
      validateMessages={validateMessages}
      layout={'vertical'}
      className={style.Form}
      onFinish={onFinish}
    >
      <Row gutter={[12]}>
        <Col span={8}>
          <Form.Item name="researcher" required rules={[{ required: true }]}>
            <FormRemoteSelect
              valueField={'id'}
              labelField={'name'}
              placeholder={'- Select Researcher -'}
              selectAPI={'/v1/research/researcher/select/'}
            />
          </Form.Item>
        </Col>
        <Col xs={4}>
          <Button
            loading={loading}
            type={'primary'}
            htmlType={'submit'}
          >
            Check In
          </Button>
        </Col>
      </Row>
    </Form>
  )
};
