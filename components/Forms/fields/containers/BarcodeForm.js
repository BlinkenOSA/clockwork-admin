import React from 'react';
import {Form, Col, Input} from "antd";

export const BarcodeForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24} style={{textAlign: 'center'}}>
        <img src={'/images/barcode.png'} alt="Logo" style={{width: '50%'}} />
      </Col>
      <Col xs={24}>
        <Form.Item label="Barcode" name="barcode" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          label="Barcode (Repeat)"
          name="barcode_repeat"
          required
          rules={
            [
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('barcode') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two barcodes that you entered do not match!'));
                },
              })
            ]
          }>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

