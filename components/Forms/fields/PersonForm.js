import React from 'react';
import {Form, Col, Input, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";
import {PersonOtherNames} from "./authority_lists/PersonOtherNames";

const { TabPane } = Tabs;

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
            <PersonOtherNames disabled={readOnly} />
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
          <TabPane tab="WikiData" key="wikidata">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikidata/'}
              form={form}
              field={'wikidata_id'}
              columnTitle={'Wikipedia ID'}
              columnField={'wikidata_id'}
              urlField={'wikidata_url'}
              isWikidata={true}
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

