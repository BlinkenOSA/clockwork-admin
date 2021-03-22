import React, {useState, useEffect} from "react";
import {Form, Row, notification, Col, Button, Input} from 'antd';
import style from './Forms.module.css';
import {get, post, put} from "../../utils/api";
import useSWR from "swr";
import {CarrierTypeForm} from "./fields/CarrierTypeForm";

export const PopupForm = ({api, selectedRecord, module, type, field, label, onClose}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { data, error } = useSWR(selectedRecord ? `${api}${selectedRecord}/` : null, get, {revalidateOnMount: true});

  useEffect(() => {
    form.setFieldsValue(data)
  }, [form, data]);

  const onFinish = (values) => {
    setLoading(true);

    switch (type) {
      case 'edit':
        put(`${api}${selectedRecord}/`, values).then(response => {
          notification.success({
            duration: 3,
            message: 'Success!',
            description: `'${label}' record was updated!`,
          });
          setLoading(false);
          onClose();
        }).catch(error => {
          handleError(error);
        });
        break;
      case 'create':
        post(api, values).then(response => {
          notification.success({
            duration: 3,
            message: 'Success!',
            description: `'${label}' record was created!`,
          });
          setLoading(false);
          onClose();
        }).catch(error => {
          handleError(error);
        });
        break;
    }
  };

  const handleError = (error) => {
    const errors = error.response.data;
    const {non_field_errors, ...field_errors} = errors;

    notification.error({
      duration: 3,
      message: 'Error!',
      description: `Please check your form for errors!`,
    });

    if (non_field_errors) {
      console.log(non_field_errors)
    }
    if (field_errors) {
      Object.keys(field_errors).forEach(errorKey => {
        form.setFields([
          {
            name: errorKey,
            errors: field_errors[errorKey],
          },
        ]);
      });
      setLoading(false);
    }
  };

  const validateMessages = {
    required: 'This field is required!'
  };

  const renderFields = () => {
    switch (module) {
      case 'carrier-types':
        return <CarrierTypeForm />;
      default:
        return (
          <Col xs={24}>
            <Form.Item label={label} name={field}>
              <Input />
            </Form.Item>
          </Col>
        )
    }
  };

  return (
    <React.Fragment>
      <Form
        name={`${module}-form`}
        validateMessages={validateMessages}
        validateTrigger={''}
        initialValues={type === 'edit' ? data : {}}
        form={form}
        onFinish={onFinish}
        layout={'vertical'}
        className={style.Form}
      >
        <Row gutter={[12, 0]}>
          {renderFields()}
        </Row>
        <Row>
          <Col xs={4}>
            {
              type !== 'view' &&
              <Button
                loading={loading}
                type={'primary'}
                htmlType={'submit'}
              >
                Submit
              </Button>
            }
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  )
};

