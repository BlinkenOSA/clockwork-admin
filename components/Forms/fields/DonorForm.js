import React from 'react';
import {Form, Col, Input} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";

export const DonorForm = ({readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item label="Name" name="name">
          <Input disabled />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="First Name" name="first_name">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Middle Name" name="middle_name">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Last Name" name="last_name">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Corporation Name" name="corporation_name">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Additional Information" name="extra_info">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Postal Code" name="postal_code" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Phone" name="phone">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Country" name="country" required rules={[{ required: true }]}>
          <FormRemoteSelect
            valueField={'id'}
            labelField={'country'}
            selectAPI={'/v1/authority_list/select/countries/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Fax" name="fax">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="City" name="city" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Email" name="email">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Website" name="website">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Note" name="note">
          <Input.TextArea rows={5} disabled={readOnly}/>
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

