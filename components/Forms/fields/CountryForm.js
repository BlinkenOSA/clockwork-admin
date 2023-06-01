import React from 'react';
import {Form, Col, Input, Row, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";

const { TabPane } = Tabs;

export const CountryForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={8}>
        <Form.Item label="Country Name" name="country" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Alpha 2" name="alpha2">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Alpha 3" name="alpha3">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey="authority_link">
          <TabPane tab="Authority Link (VIAF)" key="authority_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/viaf/'}
              form={form}
              nameField={'country'}
              field={'authority_url'}
              columnTitle={'VIAF ID'}
              columnField={'viaf_id'}
              type={'country'}
            />
          </TabPane>
          <TabPane tab="WikiData" key="wikidata">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikidata/'}
              form={form}
              field={'wikidata_id'}
              nameField={'country'}
              columnTitle={'Wikidata ID'}
              columnField={'wikidata_id'}
              urlField={'wikidata_url'}
              isWikidata={true}
              type={'country'}
            />
          </TabPane>
          <TabPane tab="Wikipedia Link" key="wikipedia_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikipedia/'}
              form={form}
              nameField={'country'}
              field={'wiki_url'}
              columnTitle={'Wikipedia Link'}
              columnField={'url'}
              type={'country'}
            />
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};

