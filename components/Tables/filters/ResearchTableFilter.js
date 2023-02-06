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

  const approved = [
    { value: true, label: 'Approved'},
    { value: false, label: 'Not Approved'},
  ];

  return (
    <Row gutter={10} type="flex">
      <Col span={8}>
        <Form.Item name="search">
          <FormFilterSearchInput
            placeholder={'Search...'}
            allowClear
            enterButton
            className={style.Search}/>
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item name="country">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'country'}
            placeholder={'- Select Carrier Type -'}
            selectAPI={'/v1/research/researcher/country-used/select/'}
          />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item name="citizenship">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'nationality'}
            placeholder={'- Select Citizenship -'}
            selectAPI={'/v1/research/researcher/nationality-used/select/'}
          />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item name="approved">
          <Select
            placeholder={'- Filter by Approval -'}
            allowClear
            options={approved}
          />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item name="active">
          <Select
            placeholder={'- Filter by Status -'}
            allowClear
            options={active}
          />
        </Form.Item>
      </Col>
    </Row>
  )
};

export default ResearcherTableFilter;
