import React, {useState} from "react";
import {Card, Form, Row, notification, Alert, Select} from 'antd';
import {AccessionForm} from "./fields/AccessionForm";
import style from './Forms.module.css';
import {SimpleFormFooter} from "./SimpleFormFooter";
import {post, put} from "../../utils/api";
import {useRouter} from "next/router";
import {DonorForm} from "./fields/DonorForm";

const MODULES = {
  'accessions': 'Accession',
  'donors': 'Donor'
};

export const SimpleForm = ({api, module, type, initialValues}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(undefined);

  const [form] = Form.useForm();
  const readOnly = type === 'view';

  const onFinish = (values) => {
    setLoading(true);

    switch (type) {
      case 'edit':
        put(api, values).then(response => {
          notification.success({
            duration: 3,
            message: 'Success!',
            description: `${MODULES[module]} record was ${type === 'create' ? 'created' : 'updated'}!`,
          });
          setLoading(false);
          router.push(`/${module}`)
        }).catch(error => {
          handleError(error);
        });
        break;
      case 'create':
        post(api, values).then(response => {
          notification.success({
            duration: 3,
            message: 'Success!',
            description: `${MODULES[module]} record was ${type === 'create' ? 'created' : 'updated'}!`,
          });
          setLoading(false);
          router.push(`/${module}`)
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
      setErrors(non_field_errors);
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

  const renderFormFields = () => {
    switch (module) {
      case 'accessions':
        return <AccessionForm form={form} readOnly={readOnly}/>;
      case 'donors':
        return <DonorForm readOnly={readOnly}/>;
      default:
        break;
    }
  };

  const renderErrors = () => {
    const onErrorClose = () => {
      setErrors(undefined);
    };

    if (errors.length > 0) {
      const errorDisplay = errors.map((e, idx) => {
        return (
          <div key={idx}>{e}</div>
        )
      });

      return (
        <Alert
          description={errorDisplay}
          type="error"
          closable
          style={{marginBottom: '10px'}}
          onClose={onErrorClose}
          message={''}
        />
      )
    }
  };

  return (
    <React.Fragment>
      { errors && renderErrors() }
      <Form
        name={`${module}-form`}
        scrollToFirstError={true}
        validateMessages={validateMessages}
        validateTrigger={''}
        initialValues={initialValues}
        form={form}
        onFinish={onFinish}
        layout={'vertical'}
        className={style.Form}
      >
        <Card size="small" style={{marginBottom: 0}}>
          <Row gutter={[12, 0]}>
            {renderFormFields()}
          </Row>
        </Card>
        <SimpleFormFooter
          module={module}
          form={form}
          type={type}
          loading={loading}
        />
      </Form>
    </React.Fragment>
  )
};

