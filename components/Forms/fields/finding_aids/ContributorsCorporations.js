import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {FormRemoteSelectWithEdit} from "../../components/FormRemoteSelectWithEdit";

export const ContributorsCorporations = ({form, disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Contributors (Organisations)</div>
    <Form.List name={'associated_corporations'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={12}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'associated_corporation']}
                  >
                    <FormRemoteSelectWithEdit
                      fieldName={'associated_corporation'}
                      form={form}
                      valueField={'id'}
                      labelField={'name'}
                      selectAPI={'/v1/authority_list/select/corporations/'}
                      api={'/v1/authority_list/corporations/'}
                      module={'corporations'}
                      placeholder={'- Select Corporation -'}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'role']}
                  >
                    <FormRemoteSelectWithEdit
                      fieldName={'role'}
                      form={form}
                      valueField={'id'}
                      labelField={'role'}
                      selectAPI={'/v1/controlled_list/select/corporation_roles/'}
                      api={'/v1/controlled_list/corporation_roles/'}
                      module={'corporation_role'}
                      placeholder={'- Select Role -'}
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
