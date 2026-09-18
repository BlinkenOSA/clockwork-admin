import {Col, Form, Input, Row} from "antd";
import React from "react";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";
import FormFilterInput from "./components/FormFilterInput";

const FindingAidsMissingTableFilter = () => {
  return (
    <React.Fragment>
      <Row gutter={[10]}>
        <Col span={14}>
          <Form.Item name="archival_unit_id">
            <FormRemoteSelect
              valueField={'id'}
              labelField={'title_full'}
              selectAPI={'/v1/finding_aids/missing/series/select/'}
              placeholder={'- Select Series -'}
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default FindingAidsMissingTableFilter;
