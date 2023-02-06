import React, {useState} from 'react';
import {useForm} from "../../utils/hooks/useForm";
import {Card, Form, Row} from "antd";
import style from "./Forms.module.css";
import {SimpleFormFooter} from "./SimpleFormFooter";
import {FindingAidsEntityForm} from "./fields/FindingAidsEntityForm";
import {useRouter} from "next/router";

export const FindingAidsTemplateForm = ({type, recordID, seriesID, initialValues}) => {
  const router = useRouter();

  const getAPI = () => {
    switch (type) {
      case 'create':
        return `/v1/finding_aids/templates/create/${seriesID}/`;
      case 'edit':
        return `/v1/finding_aids/templates/${recordID}/`;
    }
  };

  const afterFinish = () => {
    router.push(`/finding-aids/containers/${seriesID}`);
  };

  const {form, formLoading, errors, locale, onFinish, renderErrors, onValuesChange} =
    useForm(getAPI(), type, 'Finding Aids Template Entity', afterFinish);

  const validateMessages = {
    required: 'This field is required!'
  };

  return (
    <React.Fragment>
      { errors && renderErrors() }
      <Form
        name={`finding-aids-template-form`}
        scrollToFirstError={true}
        validateMessages={validateMessages}
        validateTrigger={''}
        initialValues={initialValues}
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        layout={'vertical'}
        className={style.Form}
      >
        <Card size="small" style={{marginBottom: 0}}>
          <Row gutter={[12, 0]}>
            <FindingAidsEntityForm
              isTemplate={true}
              initialValues={initialValues}
              form={form}
              locale={locale}
              type={type}
            />
          </Row>
        </Card>
        <SimpleFormFooter
          module={`finding-aids/containers/${seriesID}`}
          form={form}
          type={type}
          loading={formLoading}
        />
      </Form>
    </React.Fragment>
  )

};
