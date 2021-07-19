import React from "react";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";

export const Extents = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Creators</div>
    <Form.List name={'extents'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={8}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'extent_number']}
                    fieldKey={[field.fieldKey, 'extent_number']}
                  >
                    <Input placeholder={'Extent Number'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={8}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'extent_unit']}
                    fieldKey={[field.fieldKey, 'extent_unit']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'unit'}
                      placeholder={'- Select Extent Unit -'}
                      selectAPI={'/v1/controlled_list/select/extent_units/'}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
                <Col xs={6}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'approx']}
                    fieldKey={[field.fieldKey, 'approx']}
                    valuePropName={'checked'}
                  >
                    <Checkbox>Approx.</Checkbox>
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
