import React from 'react';
import {Form, Col, Input, Row, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";

export const GenreForm = ({form, readOnly}) => {
  const items = [
    {
      key: 'authority_link',
      label: 'Authority Link (LCSH)',
      children: (
        <FormAuthoritySelect
          api={'/v1/authority_list/lcsh/'}
          form={form}
          nameField={'genre'}
          field={'authority_url'}
          columnTitle={'LCSH ID'}
          columnField={'lcsh_id'}
          type={'genre'}
        />
      )
    },
    {
      key: 'wikidata',
      label: 'WikiData',
      children: (
        <FormAuthoritySelect
          api={'/v1/authority_list/wikidata/'}
          form={form}
          nameField={'genre'}
          field={'wikidata_id'}
          columnTitle={'Wikidata ID'}
          columnField={'wikidata_id'}
          urlField={'wikidata_url'}
          isWikidata={true}
          type={'genre'}
        />
      )
    },
    {
      key: 'wikipedia_link',
      label: 'Wikipedia Link',
      children: (
        <FormAuthoritySelect
          api={'/v1/authority_list/wikipedia/'}
          form={form}
          nameField={'genre'}
          field={'wiki_url'}
          columnTitle={'Wikipedia Link'}
          columnField={'url'}
          type={'genre'}
        />
      )
    }
  ];

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
        <Tabs defaultActiveKey="authority_link" items={items} />
      </Col>
    </React.Fragment>
  )
};
