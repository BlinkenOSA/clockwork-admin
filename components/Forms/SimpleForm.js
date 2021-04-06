import React, {useState} from "react";
import {Card, Form, Row, notification, Alert, Select} from 'antd';
import {AccessionForm} from "./fields/AccessionForm";
import style from './Forms.module.css';
import {SimpleFormFooter} from "./SimpleFormFooter";
import {post, put} from "../../utils/api";
import {useRouter} from "next/router";
import {DonorForm} from "./fields/DonorForm";
import {IsaarForm} from "./fields/IsaarForm";
import {normalizeManyFields} from "../../utils/functions/normalizeManyFields";
import {IsadForm} from "./fields/IsadForm";

const MODULES = {
  'accessions': 'Accession',
  'donors': 'Donor',
  'isaar': 'ISAAR-CPF',
  'isad': 'ISAD(G)'
};

export const SimpleForm = ({api, module, type, initialValues}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(undefined);
  const [locale, setLocale] = useState(undefined);

  const [form] = Form.useForm();
  const readOnly = type === 'view';

  const onFinish = (values) => {
    setLoading(true);
    values = normalizeManyFields(values);

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

  const markErrors = (field_errors) => {
    Object.keys(field_errors).forEach(errorKey => {
      const errors = field_errors[errorKey];

      if (typeof errors[0] === 'object') {
        errors.forEach((e, idx) => {
          Object.keys(e).forEach(eKey => {
            console.log(`${errorKey}[${idx}].${eKey}`);
            form.setFields([
              {
                name: [errorKey, idx, eKey],
                errors: e[eKey],
              },
            ]);
          });
        })
      } else {
        form.setFields([
          {
            name: errorKey,
            errors: errors,
          },
        ]);
      }
    });
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
      markErrors(field_errors);
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
      case 'isaar':
        return <IsaarForm form={form} readOnly={readOnly}/>;
      case 'isad':
        return <IsadForm form={form} locale={locale} readOnly={readOnly}/>;
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

  const onValuesChange = (changedValues) => {
    if (changedValues.hasOwnProperty('original_locale')) {
      setLocale(changedValues['original_locale']);
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
        onValuesChange={onValuesChange}
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

