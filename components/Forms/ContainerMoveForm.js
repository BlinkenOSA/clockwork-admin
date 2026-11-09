import {Button, Form, Col, notification} from "antd";
import React, {useState} from "react";
import {post} from "../../utils/api";
import {renderArchivalUnitDropdown} from "../../utils/renders/renderArchivalUnitDropdown";
import FormRemoteSelect from "./components/FormRemoteSelect";
import style from "./Forms.module.css";

export const ContainerMoveForm = ({containerID, sourceSeriesID, onMoved}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [archivalUnitFormState, setArchivalUnitFormState] = useState({
    fonds: undefined,
    subfonds: undefined,
    destination_series: undefined,
  });

  const onValuesChange = (values) => {
    if (values.hasOwnProperty('fonds')) {
      form.setFieldsValue({subfonds: undefined, destination_series: undefined});
      setArchivalUnitFormState({
        fonds: values.fonds,
        subfonds: undefined,
        destination_series: undefined,
      });
    }

    if (values.hasOwnProperty('subfonds')) {
      form.setFieldsValue({destination_series: undefined});
      setArchivalUnitFormState({
        fonds: archivalUnitFormState.fonds,
        subfonds: values.subfonds,
        destination_series: undefined,
      });
    }

    if (values.hasOwnProperty('destination_series')) {
      setArchivalUnitFormState({
        ...archivalUnitFormState,
        destination_series: values.destination_series,
      });
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    post('/v1/container/move/', {
      container: containerID,
      source_series: sourceSeriesID,
      destination_series: values.destination_series,
    }).then(() => {
      notification.success({
        duration: 3,
        message: 'Container moved',
        description: 'The container was added to the end of the selected series.',
      });
      form.resetFields();
      onMoved();
    }).catch(() => {
      notification.error({
        duration: 3,
        message: 'Move failed',
        description: 'The container could not be moved. Please try again.',
      });
      setLoading(false);
    });
  };

  return (
    <Form
      form={form}
      layout={'vertical'}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      className={style.Form}
    >
      <Col xs={24}>
        <Form.Item
          label="Fonds"
          name="fonds"
          required
          rules={[{required: true, message: 'Please select a fonds.'}]}
        >
          <FormRemoteSelect
            valueField={'id'}
            labelField={'title_full'}
            renderFunction={renderArchivalUnitDropdown}
            selectAPI={'/v1/archival_unit/select/'}
            selectAPIParams={{level: 'F'}}
            placeholder={'- Select Fonds -'}
            searchMinLength={0}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          label="Subfonds"
          name="subfonds"
          required
          rules={[{required: true, message: 'Please select a subfonds.'}]}
        >
          <FormRemoteSelect
            valueField={'id'}
            labelField={'title_full'}
            renderFunction={renderArchivalUnitDropdown}
            selectAPI={archivalUnitFormState.fonds
              ? `/v1/archival_unit/select/${archivalUnitFormState.fonds}/`
              : undefined}
            placeholder={'- Select Subfonds -'}
            searchMinLength={0}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          label="Series"
          name="destination_series"
          required
          rules={[{required: true, message: 'Please select a target series.'}]}
        >
          <FormRemoteSelect
            valueField={'id'}
            labelField={'title_full'}
            renderFunction={renderArchivalUnitDropdown}
            selectAPI={archivalUnitFormState.subfonds
              ? `/v1/archival_unit/select/${archivalUnitFormState.subfonds}/`
              : undefined}
            placeholder={'- Select Series -'}
            searchMinLength={0}
          />
        </Form.Item>
      </Col>
      <Button type={'primary'} htmlType={'submit'} loading={loading}>
        Move
      </Button>
    </Form>
  );
};
