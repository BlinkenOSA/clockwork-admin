import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {FormRemoteSelectWithEdit} from "../../components/FormRemoteSelectWithEdit";

export const Extents = ({form, disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Creators</div>
    <Form.List name={'extents'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={12}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'extent_number']}
                    fieldKey={[field.fieldKey, 'extent_number']}
                  >
                    <Input placeholder={'Extent Number'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'extent_unit']}
                    fieldKey={[field.fieldKey, 'extent_unit']}
                  >
                    <FormRemoteSelectWithEdit
                      fieldName={'extent_unit'}
                      form={form}
                      valueField={'id'}
                      labelField={'unit'}
                      selectAPI={'/v1/controlled_list/select/extent_units/'}
                      api={'/v1/controlled_list/extent_units/'}
                      label={'Extent Unit'}
                      module={'extent_unit'}
                      placeholder={'- Select Extent Unit -'}
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
