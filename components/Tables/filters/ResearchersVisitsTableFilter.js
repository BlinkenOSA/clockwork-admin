import React from "react";
import {Form, Col, Row} from "antd";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";


const ResearchersVisitsTableFilter = () => {
  return (
    <Row gutter={10} type="flex">
      <Col span={8}>
        <Form.Item name="researcher">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'name'}
            placeholder={'- Select Researcher -'}
            selectAPI={'/v1/research/researcher/select/'}
          />
        </Form.Item>
      </Col>
    </Row>
  )
};

export default ResearchersVisitsTableFilter;
