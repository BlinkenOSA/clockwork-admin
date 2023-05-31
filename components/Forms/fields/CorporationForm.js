import React from 'react';
import {Form, Col, Input, Row, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";
import {CorporationOtherNames} from "./authority_lists/CorporationOtherNames";

const { TabPane } = Tabs;


export const CorporationForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
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
          <TabPane tab="Other Forms of Name" key="corporation_other_formats">
            <CorporationOtherNames disabled={readOnly} />
          </TabPane>
          <TabPane tab="Authority Link (VIAF)" key="authority_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/viaf/'}
              form={form}
              field={'authority_url'}
              columnTitle={'VIAF ID'}
              columnField={'viaf_id'}
              type={'corporation'}
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
              type={'corporation'}
            />
          </TabPane>
          <TabPane tab="Wikipedia Link" key="wikipedia_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikipedia/'}
              form={form}
              field={'wiki_url'}
              columnTitle={'Wikipedia Link'}
              columnField={'url'}
              type={'corporation'}
            />
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};

