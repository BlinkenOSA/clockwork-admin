import React from 'react';
import {Form, Col, Input, Row} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import FormSelect from "../components/FormSelect";

const OCCUPATION = [
  { id: 'ceu', occupation: 'CEU'},
  { id: 'other', occupation: 'Other'},
];

const OCCUPATION_TYPE = [
  { id: 'student', type: 'Student'},
  { id: 'staff', type: 'Staff'},
  { id: 'faculty', type: 'Faculty'},
];

export const ResearcherForm = ({readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={8}>
        <Form.Item label="First Name" name="first_name">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Middle Name" name="middle_name">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Last Name" name="last_name">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Address in Hungary" name="address_hungary">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="City in Hungary" name="city_hungary">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Address abroad" name="address_abroad">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="City abroad" name="city_abroad">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Country" name="country">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'country'}
            selectAPI={'/v1/authority_list/select/countries/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Passport or ID Number" name="id_number">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Citizenship" name="citizenship">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'nationality'}
            selectAPI={'/v1/controlled_list/select/nationalities/'}
            disabled={readOnly}
          />
        </Form.Item>
        <Form.Item label="Occupation" name="occupation">
          <FormSelect
            valueField={'id'}
            labelField={'occupation'}
            data={OCCUPATION}
            disabled={readOnly}
          />
        </Form.Item>
        <Form.Item label="Occupation type" name="occupation_type">
          <FormSelect
            valueField={'id'}
            labelField={'type'}
            data={OCCUPATION_TYPE}
            disabled={readOnly}
          />
        </Form.Item>
        <Form.Item label="Department" name="department">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Employer or school" name="employer_or_school">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Degree" name="degree">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'degree'}
            selectAPI={'/v1/research/degree/select/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={8}>

      </Col>
    </React.Fragment>
  )
};

