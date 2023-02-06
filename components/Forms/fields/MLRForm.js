import React from 'react';
import {Form, Col, Input} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {Locations} from "./mlr/Locations";

export const MLRForm = ({readOnly}) => {
  return (
    <React.Fragment>
      <Form.Item name="series">
        <Input hidden={true} disabled={true}/>
      </Form.Item>
      <Col xs={24}>
        <Form.Item label="Series" name="series_name">
          <Input disabled={true}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Carrier Type" name="carrier_type">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'type'}
            placeholder={'- Select Carrier Type -'}
            selectAPI={'/v1/controlled_list/select/carrier_types/'}
            disabled={true}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Locations disabled={readOnly} />
      </Col>
      <Col xs={24}>
        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={5} />
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

