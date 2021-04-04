import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

export const StandardizedNames = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Standardized names</div>
    <Form.List name={'standardized_names'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={12}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                  >
                    <Input placeholder={'Standardized form of name'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'standard']}
                    fieldKey={[field.fieldKey, 'standard']}
                  >
                    <Input placeholder={'Parallel form of name'} disabled={disabled}/>
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
