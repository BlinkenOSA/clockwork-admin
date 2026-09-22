import React from 'react';
import {Form, Col, Input, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";


export const PlaceForm = ({form, readOnly}) => {
  const items = [
    {
      key: 'wikidata',
      label: 'WikiData',
      children: (
        <FormAuthoritySelect
          api={'/v1/authority_list/wikidata/'}
          form={form}
          field={'wikidata_id'}
          nameField={'place'}
          columnTitle={'Wikidata ID'}
          columnField={'wikidata_id'}
          urlField={'wikidata_url'}
          isWikidata={true}
          type={'place'}
        />
      )
    }
  ];

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
        <Tabs defaultActiveKey="authority_link" items={items} />
      </Col>
    </React.Fragment>
  )
};
