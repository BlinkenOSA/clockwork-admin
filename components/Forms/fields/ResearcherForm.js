import React from 'react';
import {Form, Col, Input, Radio} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import FormSelect from "../components/FormSelect";
import FormRadioGroup from "../components/FormRadioGroup";
import style from "../Forms.module.css";

const OCCUPATION = [
  { id: 'ceu', occupation: 'CEU'},
  { id: 'other', occupation: 'Other'},
];

const OCCUPATION_TYPE = [
  { value: 'student', label: 'Student'},
  { value: 'staff', label: 'Staff'},
  { value: 'faculty', label: 'Faculty'}
]

const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
]

export const ResearcherForm = ({form, readOnly}) => {
  const cardNumber = form.getFieldValue('card_number')

  return (
    <React.Fragment>
      <Col xs={8}>
        <Form.Item label="First Name" name="first_name" rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Middle Name" name="middle_name">
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
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
        <Form.Item label="Country" name="country" rules={[{ required: true }]}>
          <FormRemoteSelect
            valueField={'id'}
            labelField={'country'}
            selectAPI={'/v1/authority_list/select/countries/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Passport or ID Number" name="id_number" rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
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
        <Form.Item label="Occupation" name="occupation" rules={[{ required: true }]}>
          <FormSelect
            valueField={'id'}
            labelField={'occupation'}
            data={OCCUPATION}
            disabled={readOnly}
          />
        </Form.Item>
        <Form.Item
          label="Occupation type"
          name="occupation_type">
          <FormRadioGroup
            options={OCCUPATION_TYPE}
            valueField={'value'}
            labelField={'label'}
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
        <Form.Item label="Research subject" name="research_subject">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <Form.Item label="The research will be published" name="publish">
          <FormRadioGroup
            options={YES_NO}
            valueField={'value'}
            labelField={'label'}
            disabled={readOnly}
          />
        </Form.Item>
        <Form.Item label="Card Number" name="card_number">
          <div className={style.CardNumber}>
            {cardNumber}
          </div>
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

