import React from "react";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";

export const Languages = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Languages</div>
    <Form.List name={'languages'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={12}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'language']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'language'}
                      placeholder={'- Select Language -'}
                      selectAPI={'/v1/authority_list/select/languages/'}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'language_usage']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'usage'}
                      placeholder={'- Select Language Usage -'}
                      selectAPI={'/v1/controlled_list/select/language_usages/'}
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
