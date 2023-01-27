import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

export const RequestItems = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Requested Items</div>
    <Form.List name={'request_items'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'quantity']}
                    fieldKey={[field.name, 'quantity']}
                  >
                    <Input placeholder={'Quantity'} disabled={disabled}/>
                  </Form.Item>
                </Col>
              </Row>
            ))}
            {!disabled &&
            <Form.Item>
              <Button
                type="secondary"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </Form.Item>
            }
          </>
        )
      }}
    </Form.List>
  </React.Fragment>
);
