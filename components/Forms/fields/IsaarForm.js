import React, {useEffect} from "react";
import {Col, Form, Input, Row, Tabs} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import FormSelect from "../components/FormSelect";
import {FormFormattedText} from "../components/FormFormattedText";
import {renderTabTitle} from "../../../utils/functions/renderTabTitle";
import {ParallelFormsOfName} from "./isaar/ParallelFormsOfNames";
import {OtherFormsOfNames} from "./isaar/OtherFormsOfNames";
import {StandardizedNames} from "./isaar/StandardizedNames";
import {CorporateBodyIdentifiers} from "./isaar/CorporateBodyIdentifiers";
import {Places} from "./isaar/Places";

const {TabPane} = Tabs;

const TYPES = [
  { id: 'P', type: 'Personal'},
  { id: 'C', type: 'Corporate Body'},
  { id: 'F', type: 'Family'}
];

const FIELD_NAMES = {
  'tab01': ['name', 'type', 'date_existence_from', 'date_existence_to'],
  'tab02': ['parallel_names', 'other_names', 'standardized_names', 'corporate_body_identifiers'],
  'tab03': ['places', 'function', 'legal_context', 'general_context', 'history' ,'mandata', 'internal_structure']
};

const Tab01 = ({readOnly}) => (
  <Row gutter={[12]}>
    <Col xs={12}>
      <Form.Item label="Authorized forms of name" name="name" required rules={[{ required: true }]}>
        <Input disabled={readOnly}/>
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Type" name="type" required rules={[{ required: true }]}>
        <FormSelect
          data={TYPES}
          valueField={'id'}
          labelField={'type'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item
        label="Date of existence (from)"
        name="date_existence_from"
        required
        rules={[{ required: true }]}
        extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'}
      >
        <Input disabled={readOnly}/>
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Date of existence (to)" name="date_existence_to">
        <Input disabled={readOnly}/>
      </Form.Item>
    </Col>
  </Row>
);

const Tab02 = ({readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <ParallelFormsOfName disabled={readOnly} />
      </Col>
      <Col xs={24}>
        <OtherFormsOfNames disabled={readOnly} />
      </Col>
      <Col xs={24}>
        <StandardizedNames disabled={readOnly} />
      </Col>
      <Col xs={24}>
        <CorporateBodyIdentifiers disabled={readOnly} />
      </Col>
    </Row>
  )
};

const Tab03 = ({readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <Places disabled={readOnly} />
      </Col>
      <Col xs={12}>
        <Form.Item label="Function" name="function">
          <FormFormattedText disabled={readOnly} height={102}/>
        </Form.Item>
        <Form.Item label="Legal status" name="legal_status">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="General context" name="general_context">
          <FormFormattedText disabled={readOnly} height={102}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="History" name="history">
          <FormFormattedText disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Mandate" name="mandate">
          <FormFormattedText disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Internal structure" name="internal_structure">
          <FormFormattedText disabled={readOnly}/>
        </Form.Item>
      </Col>
    </Row>
  )
};

const Tab04 = ({readOnly}) => (
  <Row gutter={[12]}>
    <Col xs={12}>
      <Form.Item label="Institution identifier" name="institution_identifier">
        <Input disabled/>
      </Form.Item>
      <Form.Item label="Authority record identifier" name="old_id">
        <Input disabled/>
      </Form.Item>
      <Form.Item label="Language" name="language">
        <FormRemoteSelect
          valueField={'id'}
          labelField={'language'}
          mode={'multiple'}
          selectAPI={'/v1/authority_list/select/languages/'}
          disabled={readOnly}
        />
      </Form.Item>
      <Form.Item label="Level of detail" name="level_of_detail">
        <Input disabled/>
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Input disabled/>
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Convention" name="convention">
        <Input.TextArea disabled rows={3}/>
      </Form.Item>
      <Form.Item label="Source" name="source">
        <Input.TextArea disabled rows={3}/>
      </Form.Item>
      <Form.Item label="Internal note" name="internal_note">
        <Input.TextArea disabled rows={3}/>
      </Form.Item>
    </Col>
  </Row>
);

export const IsaarForm = ({form, readOnly, onActiveTabChange}) => {
  useEffect(() => {
    onActiveTabChange('required_values')
  }, [])

  const onChange = (activeKey) => {
    onActiveTabChange(activeKey)
  }

  const items = [
    {
      key: 'required_values',
      label: renderTabTitle(form, FIELD_NAMES['tab01'], "Required Values"),
      children: <Tab01 form={form} readOnly={readOnly}/>
    }, {
      key: 'identity',
      label: renderTabTitle(form, FIELD_NAMES['tab02'], "Identity"),
      children: <Tab02 form={form} readOnly={readOnly}/>
    }, {
      key: 'description',
      label: renderTabTitle(form, FIELD_NAMES['tab03'], "Description"),
      children: <Tab03 form={form} readOnly={readOnly}/>
    }, {
      key: 'control',
      label: 'Control',
      children: <Tab04 form={form} readOnly={readOnly}/>
    }
  ]

  return (
    <React.Fragment>
      <Col xs={24}>
        <Tabs defaultActiveKey="required_values" items={items} onChange={onChange} />
      </Col>
    </React.Fragment>
  )
};
