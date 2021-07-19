import React from "react";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";

export const Dates = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Dates</div>
    <Form.List name={'dates'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={6}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'date_from']}
                    fieldKey={[field.fieldKey, 'date_from']}
                  >
                    <Input placeholder={'Date from'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={6}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'date_to']}
                    fieldKey={[field.fieldKey, 'date_to']}
                  >
                    <Input placeholder={'Date to'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'date_type']}
                    fieldKey={[field.fieldKey, 'date_type']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'type'}
                      placeholder={'- Select Date Type -'}
                      selectAPI={'/v1/controlled_list/select/date_types/'}
                      disabled={disabled}
                    />
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
