import React, {useState, useEffect} from 'react';
import {Alert, Form, notification} from "antd";
import {normalizeManyFields} from "../functions/normalizeManyFields";
import {patch, post, put} from "../api";

export const useForm = (api, formType, messageText, afterFinish, afterValuesChange) => {
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState(undefined);
  const [locale, setLocale] = useState(undefined);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setFormLoading(true);
    values = normalizeManyFields(values);

    switch (formType) {
      case 'edit':
        put(api, values).then(response => {
          notification.success({
            duration: 3,
            message: 'Success!',
            description: `${messageText} record was updated!`,
          });
          setFormLoading(false);
          afterFinish && afterFinish()
        }).catch(error => {
          handleError(error);
        });
        break;
      case 'update':
        patch(`${api}`, values).then(response => {
          notification.success({
            duration: 3,
            message: 'Success!',
            description: `'${messageText}' record was updated!`,
          });
          setFormLoading(false);
          afterFinish && afterFinish()
        }).catch(error => {
          handleError(error);
        });
        break;
      case 'create':
        post(api, values).then(response => {
          notification.success({
            duration: 3,
            message: 'Success!',
            description: `${messageText} record was created!`,
          });
          setFormLoading(false);
          afterFinish()
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
      setFormLoading(false);
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

  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.hasOwnProperty('original_locale')) {
      setLocale(changedValues['original_locale']);
    }
    afterValuesChange && afterValuesChange(changedValues, allValues)
  };

  return {
    form: form,
    formLoading: formLoading,
    errors: errors,
    locale: locale,
    onFinish: onFinish,
    renderErrors: renderErrors,
    onValuesChange: onValuesChange
  }
};
