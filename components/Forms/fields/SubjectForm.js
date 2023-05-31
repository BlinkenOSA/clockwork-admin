import React from 'react';
import {Form, Col, Input, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";

const { TabPane } = Tabs;

export const SubjectForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item label="Subject" name="subject" required rules={[{ required: true }]}>
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
          <TabPane tab="Authority Link (LCSH)" key="authority_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/lcsh/'}
              form={form}
              nameField={'subject'}
              field={'authority_url'}
              columnTitle={'LCSH ID'}
              columnField={'lcsh_id'}
              type={'subject'}
            />
          </TabPane>
          <TabPane tab="WikiData" key="wikidata">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikidata/'}
              form={form}
              nameField={'subject'}
              field={'wikidata_id'}
              columnTitle={'Wikipedia ID'}
              columnField={'wikidata_id'}
              urlField={'wikidata_url'}
              isWikidata={true}
              type={'subject'}
            />
          </TabPane>
          <TabPane tab="Wikipedia Link" key="wikipedia_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikipedia/'}
              form={form}
              nameField={'subject'}
              field={'wiki_url'}
              columnTitle={'Wikipedia Link'}
              columnField={'url'}
              type={'subject'}
            />
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};

