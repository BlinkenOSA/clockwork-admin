import React from 'react';
import {Form, Col, Input, Row, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";
import {CorporationOtherNames} from "./authority_lists/CorporationOtherNames";


export const CorporationForm = ({form, readOnly}) => {
  const items = [
    {
      key: 'corporation_other_formats',
      label: 'Other Forms of Name',
      children: <CorporationOtherNames disabled={readOnly} />
    },
    {
      key: 'wikidata',
      label: 'WikiData',
      children: (
        <FormAuthoritySelect
          api={'/v1/authority_list/wikidata/'}
          form={form}
          field={'wikidata_id'}
          columnTitle={'Wikidata ID'}
          columnField={'wikidata_id'}
          urlField={'wikidata_url'}
          isWikidata={true}
          type={'corporation'}
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
          field={'wiki_url'}
          columnTitle={'Wikipedia Link'}
          columnField={'url'}
          type={'corporation'}
        />
      )
    }
  ];

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
        <Tabs defaultActiveKey="corporation_other_formats" items={items} />
      </Col>
    </React.Fragment>
  )
};
