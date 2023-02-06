import React from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import FormRemoteSelect from "../../components/FormRemoteSelect";

export const Places = ({disabled}) => (
  <React.Fragment>
    <div className={'ant-form-item-label'}>Places</div>
    <Form.List name={'places'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, idx) => (
              <Row gutter={12} key={idx}>
                <Col xs={8}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'place']}
                  >
                    <Input placeholder={'Place'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'year_from']}
                  >
                    <Input placeholder={'Year from'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={4}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'year_to']}
                  >
                    <Input placeholder={'Year to'} disabled={disabled}/>
                  </Form.Item>
                </Col>
                <Col xs={6}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'qualifier']}
                  >
                    <FormRemoteSelect
                      valueField={'id'}
                      labelField={'qualifier'}
                      selectAPI={'/v1/isaar/place_qualifiers/select/'}
                      disabled={disabled}
                      placeholder={'- Select place qualifier -'}
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
