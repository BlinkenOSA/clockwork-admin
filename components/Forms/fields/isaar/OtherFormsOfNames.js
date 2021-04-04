import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";

export const OtherFormsOfNames = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Other forms of name</div>
    <Form.List name={'other_names'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                  >
                    <Input placeholder={'Other form of name'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'year_from']}
                    fieldKey={[field.fieldKey, 'year_from']}
                  >
                    <Input placeholder={'Year from'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'year_to']}
                    fieldKey={[field.fieldKey, 'year_to']}
                  >
                    <Input placeholder={'Year to'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'relationship']}
                    fieldKey={[field.fieldKey, 'relationship']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'relationship'}
                      selectAPI={'/v1/isaar/relationships/select/'}
                      disabled={disabled}
                      placeholder={'- Select relationship -'}
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
