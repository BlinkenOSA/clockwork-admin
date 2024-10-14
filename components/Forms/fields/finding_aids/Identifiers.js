import React from "react";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";

export const Identifiers = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Identifiers</div>
    <Form.List name={'identifiers'}>
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
                    <Input placeholder={'Identifier'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'identifier_type']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'type'}
                      placeholder={'- Select Identifier Type -'}
                      selectAPI={'/v1/controlled_list/select/identifier_types/'}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
                <Col xs={2}>
                  <Button
                    type="default"
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
