import React from 'react';
import {Form, Col, Input, Row, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";

const { TabPane } = Tabs;

export const GenreForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item label="Genre" name="genre" required rules={[{ required: true }]}>
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
              nameField={'genre'}
              field={'authority_url'}
              columnTitle={'LCSH ID'}
              columnField={'lcsh_id'}
              type={'genre'}
            />
          </TabPane>
          <TabPane tab="Wikipedia Link" key="wikipedia_link">
            <FormAuthoritySelect
              api={'/v1/authority_list/wikipedia/'}
              form={form}
              nameField={'genre'}
              field={'wiki_url'}
              columnTitle={'Wikipedia Link'}
              columnField={'url'}
              type={'genre'}
            />
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};

