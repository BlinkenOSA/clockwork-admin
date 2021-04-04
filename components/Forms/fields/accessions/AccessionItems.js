import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

export const AccessionItems = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Parallel forms of name</div>
    <Form.List name={'parallel_names'}>
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
                <Col xs={8}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'container']}
                    fieldKey={[field.name, 'container']}
                  >
                    <Input placeholder={'Container'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'content']}
                    fieldKey={[field.name, 'content']}
                  >
                    <Input placeholder={'Content'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={2}>
                  <Button
                    type="secondary"
                    onClick={() => remove(field.name)}
                    disabled={disabled}
                    icon={<CloseOutlined />}
                  />
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
