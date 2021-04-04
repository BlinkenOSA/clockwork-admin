import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

export const ParallelFormsOfName = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Parallel forms of name</div>
    <Form.List name={'parallel_names'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={22}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
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
