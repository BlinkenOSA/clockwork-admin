import React from "react";
import {Card, Form, Row} from 'antd';
import {AccessionForm} from "./fields/AccessionForm";
import style from './Forms.module.css';
import {SimpleFormFooter} from "./SimpleFormFooter";
import {useRouter} from "next/router";
import {DonorForm} from "./fields/DonorForm";
import {IsaarForm} from "./fields/IsaarForm";
import {IsadForm} from "./fields/IsadForm";
import {FindingAidsEntityForm} from "./fields/FindingAidsEntityForm";
import {useForm} from "../../utils/hooks/useForm";
import {ResearcherForm} from "./fields/ResearcherForm";
import {RequestsForm} from "./fields/RequestsForm";

const MODULES = {
  'accessions': 'Accession',
  'donors': 'Donor',
  'isaar': 'ISAAR-CPF',
  'isad': 'ISAD(G)',
  'researchers-db/researchers': 'Researcher'
};

export const SimpleForm = ({api, module, type, initialValues}) => {
  const router = useRouter();

  const afterFinish = () => {
    router.push(`/${module}`);
  };

  const {form, formLoading, errors, locale, onFinish, renderErrors, onValuesChange} =
    useForm(api, type, MODULES[module], afterFinish);

  const readOnly = type === 'view';
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
      case 'finding-aids':
        return <FindingAidsEntityForm form={form} locale={locale} readOnly={readOnly}/>;
      case 'researchers-db/researchers':
        return <ResearcherForm form={form} readOnly={readOnly}/>;
      case 'researchers-db/requests':
        return <RequestsForm form={form} readOnly={readOnly}/>;
      default:
        break;
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
          loading={formLoading}
        />
      </Form>
    </React.Fragment>
  )
};

