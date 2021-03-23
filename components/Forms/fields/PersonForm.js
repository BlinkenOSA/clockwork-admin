import React from 'react';
import {Form, Col, Input, Row, Tabs} from "antd";
import {FormMultipleFields} from "../components/FormMultipleFields";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";

const { TabPane } = Tabs;

const OtherNames = ({field, disabled}) => (
  <React.Fragment>
    <Col xs={10}>
      <Form.Item
        {...field}
        name={[field.name, 'language']}
        fieldKey={[field.name, 'language']}
      >
        <FormRemoteSelect
          valueField={'id'}
          labelField={'language'}
          selectAPI={'/v1/authority_list/select/languages/'}
          placeholder={'- Select Language -'}
          disabled={disabled}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item
        {...field}
        name={[field.name, 'name']}
        fieldKey={[field.name, 'name']}
      >
        <Input placeholder={'Name'} disabled={disabled}/>
      </Form.Item>
    </Col>
  </React.Fragment>
);

export const PersonForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={12}>
        <Form.Item label="First Name" name="first_name" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Last Name" name="last_name" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Other URL" name="other_url">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Other Forms of Name" key="person_other_formats">
            <FormMultipleFields disabled={readOnly}>
              <OtherNames />
            </FormMultipleFields>
          </TabPane>
          <TabPane tab="Authority Link (VIAF)" key="authority_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/viaf/'}
              form={form}
              field={'authority_url'}
              columnTitle={'VIAF ID'}
              columnField={'viaf_id'}
              type={'person'}
            />
          </TabPane>
          <TabPane tab="Wikipedia Link" key="wikipedia_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikipedia/'}
              form={form}
              field={'wiki_url'}
              columnTitle={'Wikipedia Link'}
              columnField={'url'}
              type={'person'}
            />
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};

