import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {FormRemoteSelectWithEdit} from "../../components/FormRemoteSelectWithEdit";

export const AdditionalPlaces = ({form, disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Additional Places</div>
    <Form.List name={'associated_places'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={12}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'associated_place']}
                  >
                    <FormRemoteSelectWithEdit
                      fieldName={'associated_place'}
                      form={form}
                      valueField={'id'}
                      labelField={'place'}
                      selectAPI={'/v1/authority_list/select/places/'}
                      api={'/v1/authority_list/places/'}
                      module={'places'}
                      placeholder={'- Select Place -'}
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
                      selectAPI={'/v1/controlled_list/select/geo_roles/'}
                      api={'/v1/controlled_list/geo_roles/'}
                      module={'geo_role'}
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
