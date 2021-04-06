import React, {useState, useEffect} from "react";
import {Form, Row, notification, Col, Button, Input, Alert} from 'antd';
import style from './Forms.module.css';
import {post, put} from "../../utils/api";
import {CarrierTypeForm} from "./fields/CarrierTypeForm";
import {CorporationForm} from "./fields/CorporationForm";
import {CountryForm} from "./fields/CountryForm";
import {GenreForm} from "./fields/GenreForm";
import {LanguageForm} from "./fields/LanguageForm";
import {PersonForm} from "./fields/PersonForm";
import {PlaceForm} from "./fields/PlaceForm";
import {SubjectForm} from "./fields/SubjectForm";
import {ArchivalUnitsFondsForm} from "./fields/ArchivalUnitsFondsForm";
import {ArchivalUnitsSubFondsForm} from "./fields/ArchivalUnitsSubFondsForm";
import {ArchivalUnitsSeriesForm} from "./fields/ArchivalUnitsSeriesForm";
import {DonorForm} from "./fields/DonorForm";
import {useData} from "../../utils/hooks/useData";
import {normalizeManyFields} from "../../utils/functions/normalizeManyFields";
import {fillManyFields} from "../../utils/functions/fillManyFields";
import {IsaarForm} from "./fields/IsaarForm";

export const PopupForm = ({api, preCreateAPI, selectedRecord, module, type, field, label, onClose}) => {
  const [errors, setErrors] = useState(undefined);
  const [formLoading, setFormLoading] = useState(false);
  const [form] = Form.useForm();

  const readOnly = type === 'view';

  const {data, loading} = useData(selectedRecord ? `${preCreateAPI ? preCreateAPI : api}${selectedRecord}/` : undefined);

  useEffect(() => {
    form.setFieldsValue(data)
  }, [form, data]);

  const onFinish = (values) => {
    setFormLoading(true);
    values = normalizeManyFields(values);

    switch (type) {
      case 'edit':
        put(`${api}${selectedRecord}/`, values).then(response => {
          notification.success({
            duration: 3,
            message: 'Success!',
            description: `'${label}' record was updated!`,
          });
          setFormLoading(false);
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
          const {id} = response.data;
          setFormLoading(false);
          onClose(id);
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
      setFormLoading(false);
    }
  };

  const validateMessages = {
    required: 'This field is required!'
  };

  const renderFields = () => {
    switch (module) {
      case 'corporations':
        return <CorporationForm form={form} readOnly={readOnly} />;
      case 'countries':
        return <CountryForm form={form} readOnly={readOnly} />;
      case 'genres':
        return <GenreForm form={form} readOnly={readOnly} />;
      case 'languages':
        return <LanguageForm form={form} readOnly={readOnly} />;
      case 'people':
        return <PersonForm form={form} readOnly={readOnly} />;
      case 'places':
        return <PlaceForm form={form} readOnly={readOnly} />;
      case 'subjects':
        return <SubjectForm form={form} readOnly={readOnly} />;
      case 'archival-units-fonds':
        return <ArchivalUnitsFondsForm form={form} type={type} />;
      case 'archival-units-subfonds':
        return <ArchivalUnitsSubFondsForm form={form} type={type} />;
      case 'archival-units-series':
        return <ArchivalUnitsSeriesForm form={form} type={type} />;
      case 'carrier-types':
        return <CarrierTypeForm/>;
      case 'donors':
        return <DonorForm />;
      case 'isaar':
        return <IsaarForm form={form} />;
      default:
        return (
          <Col xs={24}>
            <Form.Item label={label} name={field} required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        )
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

  const getInitialValue = () => {
    switch (module) {
      case 'people':
        if (data) {
          return fillManyFields(data, ['person_other_formats']);
        } else {
          return {person_other_formats: [{}]}
        }
      case 'corporations':
        if (data) {
          return fillManyFields(data, ['corporation_other_formats']);
        } else {
          return {corporation_other_formats: [{}]}
        }
      case 'isaar':
        if (data) {
          return fillManyFields(data,
            ['parallel_names', 'other_names', 'standardized_names', 'corporate_body_identifiers', 'places']
          );
        } else {
          return {
            parallel_names: [{}],
            other_names: [{}],
            standardized_names: [{}],
            corporate_body_identifiers: [{}],
            places: [{}]
          }
        }
      default:
        if (data) {
          return data;
        }
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
        initialValues={getInitialValue()}
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
                loading={formLoading}
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

