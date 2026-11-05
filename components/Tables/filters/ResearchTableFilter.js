import React from "react";
import {Form, Col, Row, Input, Select} from "antd";
import style from "../TableFilters.module.css";
import FormFilterSearchInput from "./components/FormFilterSearchInput";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";

const ResearcherTableFilter = () => {
  const active = [
    { value: true, label: 'Active'},
    { value: false, label: 'Not Active'},
  ];

  const status = [
    { value: 'new', label: 'New'},
    { value: 'approved', label: 'Approved'},
    { value: 'suspended', label: 'Suspended'}
  ];

  return (
    <Row gutter={10} type="flex">
      <Col span={10}>
        <Form.Item name="search">
          <FormFilterSearchInput
            placeholder={'Search...'}
            allowClear
            enterButton
            className={style.Search}/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="country">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'country'}
            placeholder={'- Select Country -'}
            selectAPI={'/v1/research/researcher/country-used/select/'}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="status">
          <Select
            placeholder={'- Filter by Approval -'}
            allowClear
            options={status}
          />
        </Form.Item>
      </Col>
    </Row>
  )
};

export default ResearcherTableFilter;
