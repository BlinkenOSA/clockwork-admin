import React from 'react';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import {Form, Col} from "antd";

import 'react-json-view-lite/dist/index.css';

const JsonViewer = ({value}) => {
  console.log(value);

  return (
    value ?
    <JsonView
      data={value}
      shouldInitiallyExpand={(level) => true}
      style={defaultStyles}
    /> : <span>No technical metadata is available!</span>
  )
};

export const DigitizationForm = ({readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Form.Item name="digital_version_technical_metadata">
          <JsonViewer/>
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

