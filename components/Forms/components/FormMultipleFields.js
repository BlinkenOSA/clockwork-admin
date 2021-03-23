import React from "react";
import {Button, Col, Form, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

export const FormMultipleFields = ({label, disabled, children}) => {
  return (
    <React.Fragment>
      {
        label && <div className={'ant-form-item-label'}>{label}</div>
      }
      <Form.List name="items" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Row gutter={12} key={field.name}>
                {React.cloneElement(children, {field: field, disabled: disabled})}
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
                  icon={<PlusOutlined/>}
                >
                  Add
                </Button>
              </Form.Item>
            }
          </>
        )}
      </Form.List>
    </React.Fragment>
  )
};
