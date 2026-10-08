import React, {useState} from "react";
import {Form, Col, Row, Select, Button} from "antd";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";
import FormRadioGroup from "../../Forms/components/FormRadioGroup";
import FormFilterSearchInput from "./components/FormFilterSearchInput";
import style from "../TableFilters.module.css";

const STATUSES = [
  { value: 'new', label: 'New'},
  { value: 'approved', label: 'Approved'},
  { value: 'rejected', label: 'Rejected'},
  { value: 'lifted', label: 'Lifted'},
]

const RestrictedRequestsTableFilter = () => {
  return (
    <React.Fragment>
      <Row gutter={10}>
        <Col span={8}>
          <Form.Item name="search">
            <FormFilterSearchInput
              placeholder={'Search...'}
              allowClear
              enterButton
              className={style.Search}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="status">
            <Select
              placeholder={'Filter by Status'}
              allowClear
              options={STATUSES}
            />
          </Form.Item>
        </Col>
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
    </React.Fragment>
  )
};

export default RestrictedRequestsTableFilter;
