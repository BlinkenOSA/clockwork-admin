import {Button, Col, Form, Input, Row} from "antd";
import style from "./Forms.module.css";
import React, {useState} from "react";
import FormRemoteSelect from "./components/FormRemoteSelect";
import {useData} from "../../utils/hooks/useData";
import {post} from "../../utils/api";
import {useUpdateEffect} from "react-use";

export const ContainerCreateForm = ({seriesID, containerListRefresh}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const {data, refresh} = useData(seriesID ? `/v1/container/precreate/${seriesID}/` : undefined);

  useUpdateEffect(() => {
    form.setFieldValue('container_no', data['container_no'])
  }, [data])

  const validateMessages = {
    required: 'This field is required!'
  };

  const onFinish = (values) => {
    setLoading(true);
    post(`/v1/container/create/`, values).then(response => {
      setLoading(false);
      containerListRefresh();
      refresh()
    }).catch((error) => {
      setLoading(false);
    })
  };

  return (
    data ?
    <Form
      name={`container-form`}
      scrollToFirstError={true}
      form={form}
      validateMessages={validateMessages}
      initialValues={data}
      layout={'vertical'}
      className={style.Form}
      onFinish={onFinish}
    >
      <Row gutter={[12]}>
        <Form.Item name="archival_unit">
          <Input hidden/>
        </Form.Item>
        <Col xs={4}>
          <Form.Item label="Container No." name="container_no">
            <Input disabled/>
          </Form.Item>
        </Col>
        <Col xs={6}>
          <Form.Item label="Carrier type" name="carrier_type" required rules={[{required: true}]}>
            <FormRemoteSelect
              valueField={'id'}
              labelField={'type'}
              placeholder={'- Select Carrier Type -'}
              selectAPI={'/v1/controlled_list/select/carrier_types/'}
            />
          </Form.Item>
        </Col>
        <Col xs={4}>
          <Form.Item label="Barcode" name="barcode">
            <Input/>
          </Form.Item>
        </Col>
        <Col xs={4}>
          <Form.Item label="Legacy ID" name="legacy_id">
            <Input/>
          </Form.Item>
        </Col>
        <Col xs={6}>
          <Form.Item label="Container Label" name="container_label">
            <Input/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10} type="flex">
        <Col xs={4}>
          <Button
            loading={loading}
            type={'primary'}
            htmlType={'submit'}
          >
            New Container
          </Button>
        </Col>
      </Row>
    </Form> : ''
  )
};
