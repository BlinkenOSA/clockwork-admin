import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {FormRemoteSelectWithEdit} from "../../components/FormRemoteSelectWithEdit";

export const ContributorsPeople = ({form, disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Contributors (People)</div>
    <Form.List name={'associated_people'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={12}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'associated_person']}
                    fieldKey={[field.fieldKey, 'associated_person']}
                  >
                    <FormRemoteSelectWithEdit
                      fieldName={'associated_person'}
                      form={form}
                      valueField={'id'}
                      labelField={'name'}
                      selectAPI={'/v1/authority_list/select/people/'}
                      api={'/v1/authority_list/people/'}
                      module={'people'}
                      placeholder={'- Select Person -'}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'role']}
                    fieldKey={[field.fieldKey, 'role']}
                  >
                    <FormRemoteSelectWithEdit
                      fieldName={'role'}
                      form={form}
                      valueField={'id'}
                      labelField={'role'}
                      selectAPI={'/v1/controlled_list/select/person_roles/'}
                      api={'/v1/controlled_list/person_roles/'}
                      module={'person_role'}
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
