import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";

export const PersonOtherNames = ({disabled}) => (
  <React.Fragment>
    <Form.List name={'person_other_formats'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'language']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'language'}
                      selectAPI={'/v1/authority_list/select/languages/'}
                      placeholder={'- Select Language -'}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
                <Col xs={6}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'first_name']}
                  >
                    <Input placeholder={'First Name'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={6}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'last_name']}
                  >
                    <Input placeholder={'Last Name'} disabled={disabled}/>
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
