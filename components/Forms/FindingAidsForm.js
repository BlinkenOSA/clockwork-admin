import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useForm} from "../../utils/hooks/useForm";
import {Card, Form, Row} from "antd";
import style from "./Forms.module.css";
import {SimpleFormFooter} from "./SimpleFormFooter";
import {FindingAidsEntityForm} from "./fields/FindingAidsEntityForm";
import {useData} from "../../utils/hooks/useData";

export const FindingAidsForm = ({type, recordID, containerID, seriesID, onActiveTabChange, initialValues}) => {
  const [params, setParams] = useState({});
  const router = useRouter();

  const getAPI = () => {
    switch (type) {
      case 'create':
        return `/v1/finding_aids/create/${containerID}/`;
      case 'edit':
        return `/v1/finding_aids/${recordID}/`;
    }
  };

  const {data, error} = useData(containerID ? `/v1/finding_aids/get_next_folder/${containerID}/` : undefined, params);

  useEffect(() => {
    data && form.setFieldsValue({
      archival_reference_code: data['archival_reference_code'],
      folder_no: data['folder_no'],
      sequence_no: data['sequence_no']
    })
  }, [data]);

  const afterFinish = () => {
    router.push(`/finding-aids/containers/${seriesID}`);
  };

  const afterValuesChange = (changedValues, allValues) => {
    if (changedValues.hasOwnProperty('description_level')) {
      const {folder_no, description_level} = allValues;

      setParams({
        description_level: description_level, folder_no: folder_no
      });

      form.setFieldsValue({level: description_level === 'L2' ? 'I' : 'F'});
    }

    if (changedValues.hasOwnProperty('folder_no')) {
      const {folder_no, description_level} = allValues;

      setParams({
        description_level: description_level, folder_no: folder_no
      });
    }
  };

  const {form, formLoading, errors, locale, onFinish, renderErrors, onValuesChange} =
    useForm(getAPI(), type, 'Finding Aids Entity', afterFinish, afterValuesChange);

  const validateMessages = {
    required: 'This field is required!'
  };

  return (
    <React.Fragment>
      { errors && renderErrors() }
      <Form
        name={`finding-aids-form`}
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
              initialValues={initialValues}
              form={form}
              locale={locale}
              type={type}
              onActiveTabChange={onActiveTabChange}
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
