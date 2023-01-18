import {AutoComplete, Col, Form, Input, Row} from "antd";
import style from "./Forms.module.css";
import React from "react";
import {post} from "../../utils/api";
import FormRemoteSelect from "./components/FormRemoteSelect";

export const ResearchersVisitsForm = ({refresh}) => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: 'This field is required!'
  };

  const onFinish = (values) => {
    post(`/v1/container/create/`, values).then(response => {
      refresh();
    }).catch((error) => {

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
          <Form.Item name="researcher">
            <FormRemoteSelect
              valueField={'id'}
              labelField={'name'}
              placeholder={'- Select Researcher -'}
              selectAPI={'/v1/research/researcher/select/'}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
};
