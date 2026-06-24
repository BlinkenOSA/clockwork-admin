import React from 'react';
import {Form, Col, Input, Row, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";

export const CountryForm = ({form, readOnly}) => {
  const items = [
    {
      key: 'authority_link',
      label: 'Authority Link (VIAF)',
      children: (
        <FormAuthoritySelect
          api={'/v1/authority_list/viaf/'}
          form={form}
          nameField={'country'}
          field={'authority_url'}
          columnTitle={'VIAF ID'}
          columnField={'viaf_id'}
          type={'country'}
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
          field={'wikidata_id'}
          nameField={'country'}
          columnTitle={'Wikidata ID'}
          columnField={'wikidata_id'}
          urlField={'wikidata_url'}
          isWikidata={true}
          type={'country'}
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
          nameField={'country'}
          field={'wiki_url'}
          columnTitle={'Wikipedia Link'}
          columnField={'url'}
          type={'country'}
        />
      )
    }
  ];

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
        <Tabs defaultActiveKey="authority_link" items={items} />
      </Col>
    </React.Fragment>
  )
};
