import {Col, Form, Row} from "antd";
import React from "react";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";
import FormFilterSearchInput from "./components/FormFilterSearchInput";
import style from "../TableFilters.module.css";

const DigitizationTableFilter = () => {
  return (
    <React.Fragment>
      <Row gutter={[10]}>
        <Col span={8}>
          <Form.Item name="search">
            <FormFilterSearchInput
              placeholder={'Search...'}
              allowClear
              enterButton
              className={style.Search}/>
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item name="carrier_type">
            <FormRemoteSelect
              valueField={'id'}
              labelField={'type'}
              placeholder={'- Select Carrier Type -'}
              selectAPI={'/v1/controlled_list/select/carrier_types/'}
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default DigitizationTableFilter;
