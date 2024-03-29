import React, {useEffect} from "react";
import {Form, Row, Col, Button, Input} from 'antd';
import style from './Forms.module.css';
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
import {fillManyFields} from "../../utils/functions/fillManyFields";
import {IsaarForm} from "./fields/IsaarForm";
import {BarcodeForm} from "./fields/BarcodeForm";
import {ContainerForm} from "./fields/ContainerForm";
import {ExtentUnitForm} from "./fields/ExtentUnitForm";
import {RoleForm} from "./fields/RoleForm";
import {useForm} from "../../utils/hooks/useForm";
import {KeywordForm} from "./fields/KeywordForm";
import {FindingAidsEntityQuickForm} from "./fields/FindingAidsEntityQuickForm";
import {MLRForm} from "./fields/MLRForm";
import {DigitizationForm} from "./fields/DigitizationForm";
import {RequestsForm} from "./fields/RequestsForm";
import {RequestItemForm} from "./fields/RequestsItemForm";

export const PopupForm = ({api, preCreateAPI, selectedRecord, module, type, field, label, onClose}) => {
  const afterFinish = () => {
    onClose();
  };

  const {form, formLoading, errors, onFinish, renderErrors, onValuesChange} =
    useForm(type === 'create' ? api : `${api}${selectedRecord}/`, type, label, afterFinish);

  const readOnly = type === 'view';

  const {data, loading} = useData(selectedRecord ? `${preCreateAPI ? preCreateAPI : api}${selectedRecord}/` : undefined);

  useEffect(() => {
    form.setFieldsValue(data)
  }, [form, data]);

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
      case 'keywords':
        return <KeywordForm/>;
      case 'donors':
        return <DonorForm />;
      case 'isaar':
        return <IsaarForm form={form} />;
      case 'barcode':
        return <BarcodeForm form={form} />;
      case 'container':
        return <ContainerForm form={form} />;
      case 'extent_unit':
        return <ExtentUnitForm form={form} />;
      case 'person_role':
        return <RoleForm form={form} />;
      case 'corporation_role':
        return <RoleForm form={form} />;
      case 'geo_role':
        return <RoleForm form={form} />;
      case 'finding-aids-quick-edit':
        return <FindingAidsEntityQuickForm form={form} />;
      case 'mlr':
        return <MLRForm form={form} readOnly={readOnly}/>;
      case 'digitization':
        return <DigitizationForm form={form} readOnly={readOnly} />;
      case 'requests':
        return <RequestsForm form={form} readOnly={readOnly} />;
      case 'request_item':
        return <RequestItemForm form={form} readOnly={readOnly} />;
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

  const getInitialValue = () => {
    switch (module) {
      case 'archival-units-fonds':
        return { level: 'F' };
      case 'archival-units-subfonds':
        return { level: 'SF' };
      case 'archival-units-series':
        return { level: 'S' };
      case 'people':
        if (data) {
          return fillManyFields(data, ['person_other_formats']);
        } else {
          return { person_other_formats: [{}] }
        }
      case 'corporations':
        if (data) {
          return fillManyFields(data, ['corporation_other_formats']);
        } else {
          return { corporation_other_formats: [{}] }
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
      case 'mlr':
        if (data) {
          return fillManyFields(data, ['locations']);
        } else {
          return { locations: [{}] }
        }
      case 'requests':
        if (data) {
          return fillManyFields(data, ['request_items'])
        } else {
          return { request_items: [{}] }
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
        onValuesChange={onValuesChange}
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

