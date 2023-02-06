import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";

export const Locations = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Locations</div>
    <Form.List name={'locations'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={10}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'building']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'building'}
                      selectAPI={'/v1/controlled_list/select/buildings/'}
                      placeholder={'- Select building -'}
                      disabled={disabled}
                    />
                  </Form.Item>
                </Col>
                <Col xs={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'module']}
                  >
                    <Input placeholder={'Module'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'row']}
                  >
                    <Input placeholder={'Row'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'section']}
                  >
                    <Input placeholder={'Section'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={3}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'shelf']}
                  >
                    <Input placeholder={'Shelf'} disabled={disabled}/>
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
