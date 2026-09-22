import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';

export const Creators = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>3.2.1 Creators</div>
    <Form.List name={'creators'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={22}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'creator']}
                  >
                    <Input disabled={disabled}/>
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
