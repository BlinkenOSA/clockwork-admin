import React, {useEffect} from 'react';
import {Form, Col, Input, Checkbox, Divider, Switch, Button} from "antd";
import FormRemoteSelect from "../../components/FormRemoteSelect";
import ResearchCloudLink from "../finding_aids/ResearchCloudLink";
import {FormFormattedText} from "../../components/FormFormattedText";

export const ContainerForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Form.Item name={'archival_unit'}>
        <Input hidden={true}/>
      </Form.Item>
      <Col xs={24}>
        <Form.Item label="Container No." name="container_no" required rules={[{ required: true }]}>
          <Input disabled={true}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Carrier type" name="carrier_type" required rules={[{ required: true }]}>
          <FormRemoteSelect
            valueField={'id'}
            labelField={'type'}
            placeholder={'- Select Carrier Type -'}
            selectAPI={'/v1/controlled_list/select/carrier_types/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Container label" name="container_label">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
          <Form.Item label="Legacy ID" name="legacy_id">
              <Input disabled={readOnly}/>
          </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label={`Internal Note`} name="internal_note">
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

