import {Col, Form, Row, Select} from "antd";
import React from "react";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";
import FormFilterSearchInput from "./components/FormFilterSearchInput";
import style from "../TableFilters.module.css";

const DigitizationTableFilter = () => {
  const digitalVersion = [
    { value: 'yes', label: 'Yes'},
    { value: 'no', label: 'No'},
  ];

  return (
    <React.Fragment>
      <Row gutter={[10]}>
        <Col xs={6}>
          <Form.Item name="search">
            <FormFilterSearchInput
              placeholder={'Search...'}
              allowClear
              enterButton
              className={style.Search}/>
          </Form.Item>
        </Col>
        <Col xs={6}>
          <Form.Item name="carrier_type">
            <FormRemoteSelect
              valueField={'id'}
              labelField={'type'}
              placeholder={'- Select Carrier Type -'}
              selectAPI={'/v1/controlled_list/select/carrier_types/'}
            />
          </Form.Item>
        </Col>
        <Col xs={4}>
          <Form.Item name="digital_version_exists">
            <Select
              placeholder={'- Filter by Digital Version -'}
              allowClear
              options={digitalVersion}
            />
          </Form.Item>
        </Col>
        <Col xs={4}>
          <Form.Item name="digital_version_research_cloud">
            <Select
              placeholder={'- Filter by Research Cloud -'}
              allowClear
              options={digitalVersion}
            />
          </Form.Item>
        </Col>
        <Col xs={4}>
          <Form.Item name="digital_version_online">
            <Select
              placeholder={'- Filter by Online -'}
              allowClear
              options={digitalVersion}
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default DigitizationTableFilter;
