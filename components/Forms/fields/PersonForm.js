import React from 'react';
import {Form, Col, Input, Tabs} from "antd";
import {FormAuthoritySelect} from "../components/FormAuthoritySelect";
import {PersonOtherNames} from "./authority_lists/PersonOtherNames";
import FormDuplications from "../components/FormDuplications";

export const PersonForm = ({form, selectedRecord, readOnly, afterMergeFinish, hasMerge}) => {
  const items = [
    {
      key: 'person_other_formats',
      label: 'Other Forms of Name',
      children: <PersonOtherNames disabled={readOnly} />
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
          type={'person'}
        />
      )
    },
    ...(selectedRecord && hasMerge ? [{
      key: 'duplications',
      label: 'Duplications',
      children: (
        <FormDuplications
          selectedRecord={selectedRecord}
          api={`/v1/authority_list/people/${selectedRecord}/similar`}
          afterMergeFinish={afterMergeFinish}
        />
      )
    }] : [])
  ];

  return (
    <React.Fragment>
      <Col xs={12}>
        <Form.Item label="First Name" name="first_name" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Last Name" name="last_name" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Other URL" name="other_url">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey="person_other_formats" items={items} />
      </Col>
    </React.Fragment>
  )
};
