import React from "react";
import {Form, Row} from 'antd';
import {AccessionForm} from "./fields/AccessionForm";
import style from './Forms.module.css';

export const SimpleForm = ({module, initialValues, ...props}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const renderFormFields = () => {
    switch (module) {
      case 'accessions':
        return <AccessionForm/>;
      default:
        break;
    }
  };

  return (
    <Form
      name={`${module}-form`}
      initialValues={initialValues}
      form={form}
      onFinish={onFinish}
      layout={'vertical'}
      className={style.Form}
    >
      <Row gutter={[12, 0]}>
        {renderFormFields()}
      </Row>
    </Form>
  )
};

