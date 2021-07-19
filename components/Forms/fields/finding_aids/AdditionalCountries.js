import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {FormRemoteSelectWithEdit} from "../../components/FormRemoteSelectWithEdit";

export const AdditionalCountries = ({form, disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Additional Countries</div>
    <Form.List name={'associated_countries'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={12}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'associated_country']}
                    fieldKey={[field.fieldKey, 'associated_country']}
                  >
                    <FormRemoteSelectWithEdit
                      fieldName={'associated_country'}
                      form={form}
                      valueField={'id'}
                      labelField={'country'}
                      selectAPI={'/v1/authority_list/select/countries/'}
                      api={'/v1/authority_list/countries/'}
                      module={'countries'}
                      placeholder={'- Select Country -'}
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
