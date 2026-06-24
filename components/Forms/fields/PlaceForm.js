import React from 'react';
import {Form, Col, Input, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";


export const PlaceForm = ({form, readOnly}) => {
  const items = [
    {
      key: 'authority_link',
      label: 'Authority Link (VIAF)',
      children: (
        <FormAuthoritySelect
          api={'/v1/authority_list/viaf/'}
          form={form}
          nameField={'place'}
          field={'authority_url'}
          columnTitle={'VIAF ID'}
          columnField={'viaf_id'}
          type={'place'}
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
          nameField={'place'}
          columnTitle={'Wikidata ID'}
          columnField={'wikidata_id'}
          urlField={'wikidata_url'}
          isWikidata={true}
          type={'place'}
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
          nameField={'place'}
          field={'wiki_url'}
          columnTitle={'Wikipedia Link'}
          columnField={'url'}
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
