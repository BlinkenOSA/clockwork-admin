import React, {useState} from "react";
import {Form, Col, Row, Select, Button} from "antd";
import FormRemoteSelect from "../../Forms/components/FormRemoteSelect";
import FormRadioGroup from "../../Forms/components/FormRadioGroup";
import FormFilterSearchInput from "./components/FormFilterSearchInput";
import style from "../TableFilters.module.css";

const ITEM_TYPES = [
  { value: 'FA', label: 'Archival'},
  { value: 'L', label: 'Library'},
  { value: 'FL', label: 'Film Library'}
]

const REQUEST_DATE = [
  { value: 'today', label: 'Today'},
  { value: 'next_day', label: 'Next Day'},
  { value: 'next_week', label: 'Next Week'},
  { value: 'all', label: 'All'}
]

const STATUSES = [
  { value: '1', label: 'In Queue'},
  { value: '2', label: 'Pending'},
  { value: '3', label: 'Delivered'},
  { value: '4', label: 'Returned'},
  { value: '5', label: 'Reshelved'},
  { value: '9', label: 'Served'}
]

const RequestsTableFilter = () => {
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
          <Form.Item name="request_date">
            <FormRadioGroup
              options={REQUEST_DATE}
              valueField={'value'}
              labelField={'label'}
              optionType={'button'}
              defaultValue={'all'}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
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
          <Form.Item name="item_origin">
            <Select
              placeholder={'Filter by Item Type'}
              allowClear
              options={ITEM_TYPES}
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

export default RequestsTableFilter;
