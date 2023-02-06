import React, {useState} from 'react';
import {Button, Card, Col, Form, Row} from "antd";
import style from "./Forms.module.css";
import FormRemoteSelect from "./components/FormRemoteSelect";
import { ContainerOutlined } from '@ant-design/icons';
import Link from "next/link";
import {renderArchivalUnitDropdown} from "../../utils/renders/renderArchivalUnitDropdown";

export const ArchivalUnitSelectForm = () => {
  const [form] = Form.useForm();

  const [fonds, setFonds] = useState(undefined);
  const [subfonds, setSubfonds] = useState(undefined);
  const [series, setSeries] = useState(undefined);

  const onValuesChange = (values) => {
    if (values.hasOwnProperty('fonds')) {
      form.setFieldsValue({subfonds: undefined});
      form.setFieldsValue({series: undefined});

      setFonds(values['fonds']);
      setSubfonds(undefined);
      setSeries(undefined);
    }

    if (values.hasOwnProperty('subfonds')) {
      form.setFieldsValue({series: undefined});
      setSubfonds(values['subfonds']);
      setSeries(undefined);
    }

    if (values.hasOwnProperty('series')) {
      setSeries(values['series']);
    }
  };

  return (
    <Form
      name={`finding-aids-select-archival-unit-form`}
      scrollToFirstError={true}
      form={form}
      onValuesChange={onValuesChange}
      layout={'vertical'}
      className={style.Form}
    >
      <Card size="small">
        <Col xs={24}>
          <Form.Item label="Fonds" name="fonds" required>
            <FormRemoteSelect
              valueField={'id'}
              labelField={'title_full'}
              renderFunction={renderArchivalUnitDropdown}
              selectAPI={'/v1/archival_unit/select/'}
              selectAPIParams={{level: 'F'}}
              placeholder={'- Select Fonds -'}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Subfonds" name="subfonds" required>
            <FormRemoteSelect
              valueField={'id'}
              labelField={'title_full'}
              renderFunction={renderArchivalUnitDropdown}
              selectAPI={fonds ? `/v1/archival_unit/select/${fonds}/` : undefined}
              placeholder={'- Select Subfonds -'}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Series" name="series" required>
            <FormRemoteSelect
              valueField={'id'}
              labelField={'title_full'}
              renderFunction={renderArchivalUnitDropdown}
              selectAPI={subfonds ? `/v1/archival_unit/select/${subfonds}/` : undefined}
              placeholder={'- Select Series -'}
            />
          </Form.Item>
        </Col>
      </Card>
      <Card size={'small'} className={style.Footer}>
        <Row gutter={12} type="flex">
          <Col xs={12}>
            <Link href={series ? `/finding-aids/containers/${series}` : ''}>
              <Button
                type={'default'}
                disabled={!series}
              >
                <ContainerOutlined /> Containers
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </Form>
  )
};
