import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

export const CorporateBodyIdentifiers = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Corporate body identifiers</div>
    <Form.List name={'corporate_body_identifiers'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={12}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'identifier']}
                  >
                    <Input placeholder={'Corporate body identifier'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'rule']}
                  >
                    <Input placeholder={'Rule'} disabled={disabled}/>
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
                type="default"
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
