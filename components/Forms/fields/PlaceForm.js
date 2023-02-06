import React from 'react';
import {Form, Col, Input, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";

const { TabPane } = Tabs;


export const PlaceForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item label="Place" name="place" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Other URL" name="other_url">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey="authority_link">
          <TabPane tab="Authority Link (VIAF)" key="authority_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/viaf/'}
              form={form}
              nameField={'place'}
              field={'authority_url'}
              columnTitle={'VIAF ID'}
              columnField={'viaf_id'}
              type={'place'}
            />
          </TabPane>
          <TabPane tab="Wikipedia Link" key="wikipedia_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikipedia/'}
              form={form}
              nameField={'place'}
              field={'wiki_url'}
              columnTitle={'Wikipedia Link'}
              columnField={'url'}
              type={'place'}
            />
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};

