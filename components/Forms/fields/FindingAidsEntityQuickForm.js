import React from "react";
import { Col, Form, Input, Row } from "antd";
import FormSelect from "../components/FormSelect";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {renderLabelFlag} from "../../../utils/functions/renderLabelFlag";
import {FormFormattedText} from "../components/FormFormattedText";
import FormTranslateButton from "../components/FormTranslateButton";


const L1_LEVELS = [
  { id: 'F', level: 'Folders'},
  { id: 'I', level: 'Items'},
];

const L2_LEVELS = [
  { id: 'I', level: 'Items'}
];

const DESCRIPTION_LEVELS = [
  { id: 'L1', level: 'Level 1'},
  { id: 'L2', level: 'Level 2'},
];

const Identifier = ({initialValues, type}) => (
  <Row gutter={[12]} style={{
    backgroundColor: '#f5f5f5',
    padding: '10px 0px',
  }}>
    <Form.Item name="archival_unit" required rules={[{ required: true }]}>
      <Input hidden={true}/>
    </Form.Item>
    <Col xs={6}>
      <Form.Item label="Description level" name="description_level" required rules={[{ required: true }]}>
        <FormSelect
          data={DESCRIPTION_LEVELS}
          valueField={'id'}
          labelField={'level'}
          disabled={type !== 'create'}
          allowClear={false}
        />
      </Form.Item>
    </Col>
    <Col xs={6}>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues['description_level'] !== curValues['description_level']}
      >
        {({getFieldValue}) =>
          <Form.Item label="Level" name="level" required rules={[{required: true}]}>
            <FormSelect
              data={getFieldValue('description_level') === 'L1' ? L1_LEVELS : L2_LEVELS}
              valueField={'id'}
              labelField={'level'}
              disabled={type !== 'create'}
            />
          </Form.Item>
        }
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Archival Reference Code" name="archival_reference_code" >
        <Input disabled={true}/>
      </Form.Item>
    </Col>
  </Row>
);

export const FindingAidsEntityQuickForm = ({form, locale, type}) => {
  const readOnly = type === 'view';

  return (
    <React.Fragment>
      <Col xs={24} style={{marginBottom: '10px'}}>
        <Identifier form={form} locale={locale} readOnly={readOnly} type={type}/>
      </Col>
      <Col xs={24}>
        <Row gutter={[12]}>
          <Col xs={12}>
            <Form.Item label="Primary Type" name="primary_type">
              <FormRemoteSelect
                valueField={'id'}
                labelField={'type'}
                placeholder={'- Choose primary type -'}
                selectAPI={'/v1/controlled_list/select/primary_types/'}
                disabled={readOnly}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="Original locale" name="original_locale">
              <FormRemoteSelect
                valueField={'id'}
                labelField={'locale_name'}
                placeholder={'- Choose language -'}
                selectAPI={'/v1/controlled_list/select/locales/'}
                disabled={readOnly}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item label="Title" name="title" required rules={[{ required: true }]} style={{marginBottom: 0}}>
              <Input disabled={readOnly}/>
            </Form.Item>
            <FormTranslateButton
              form={form}
              mode={'toOriginal'}
              fieldName={'title'}
              toField={'title_original'}
              disabled={readOnly}/>
          </Col>
          <Col xs={12}>
            <Form.Item
              label={renderLabelFlag(locale, 'Title - Original Language')}
              name="title_original"
              style={{marginBottom: 0}}>
              <Input disabled={readOnly}/>
            </Form.Item>
            <FormTranslateButton
              form={form}
              mode={'toEnglish'}
              fieldName={'title_original'}
              toField={'title'}
              disabled={readOnly}/>
          </Col>
          <Col xs={12}>
            <Form.Item label={`Date From`} name="date_from" extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'} required rules={[{ required: true }]}>
              <Input disabled={readOnly} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item label={`Date To`} name="date_to" extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'}>
              <Input disabled={readOnly} />
            </Form.Item>
          </Col>
          <Col xs={4}>
            <Form.Item label={`Date Ca. Span`} name="date_ca_span">
              <Input disabled={readOnly} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label={`Contents Summary`} name="contents_summary" style={{marginBottom: 0}}>
              <FormFormattedText disabled={readOnly} height={120} />
            </Form.Item>
            <FormTranslateButton
              form={form}
              mode={'toOriginal'}
              fieldName={'contents_summary'}
              toField={'contents_summary_original'}
              disabled={readOnly}/>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={renderLabelFlag(locale, 'Contents Summary - Original Language')}
              name="contents_summary_original"
              style={{marginBottom: 0}}>
              <FormFormattedText disabled={readOnly} height={120} />
            </Form.Item>
            <FormTranslateButton
              form={form}
              mode={'toEnglish'}
              fieldName={'contents_summary_original'}
              toField={'contents_summary'}
              disabled={readOnly}/>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  )
};
