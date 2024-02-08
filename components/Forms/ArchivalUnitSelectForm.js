import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "antd";
import style from "./Forms.module.css";
import FormRemoteSelect from "./components/FormRemoteSelect";
import { ContainerOutlined } from '@ant-design/icons';
import Link from "next/link";
import {renderArchivalUnitDropdown} from "../../utils/renders/renderArchivalUnitDropdown";
import useStickyState from "../../utils/hooks/useStickyState";

export const ArchivalUnitSelectForm = () => {
  const [form] = Form.useForm();

  const [ archivalUnitFormState, setArchivalUnitFormState ] = useStickyState({
    fonds: undefined,
    subfonds: undefined,
    series: undefined
  }, 'ams-select-archival-unit-form')


  const onValuesChange = (values) => {
    if (values.hasOwnProperty('fonds')) {
      form.setFieldsValue({subfonds: undefined});
      form.setFieldsValue({series: undefined});

      setArchivalUnitFormState({
        fonds: values['fonds'], subfonds: undefined, series: undefined
      })
    }

    if (values.hasOwnProperty('subfonds')) {
      form.setFieldsValue({series: undefined});

      setArchivalUnitFormState({
        fonds: archivalUnitFormState['fonds'], subfonds: values['subfonds'], series: undefined
      })
    }

    if (values.hasOwnProperty('series')) {
      setArchivalUnitFormState({
        fonds: archivalUnitFormState['fonds'], subfonds: archivalUnitFormState['subfonds'], series: values['series']
      })
    }
  };

  return (
    <Form
      name={`finding-aids-select-archival-unit-form`}
      scrollToFirstError={true}
      form={form}
      onValuesChange={onValuesChange}
      initialValues={archivalUnitFormState}
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
              searchMinLength={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Subfonds" name="subfonds" required>
            <FormRemoteSelect
              valueField={'id'}
              labelField={'title_full'}
              renderFunction={renderArchivalUnitDropdown}
              selectAPI={archivalUnitFormState['fonds'] ? `/v1/archival_unit/select/${archivalUnitFormState['fonds']}/` : undefined}
              placeholder={'- Select Subfonds -'}
              searchMinLength={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Series" name="series" required>
            <FormRemoteSelect
              valueField={'id'}
              labelField={'title_full'}
              renderFunction={renderArchivalUnitDropdown}
              selectAPI={archivalUnitFormState['subfonds'] ? `/v1/archival_unit/select/${archivalUnitFormState['subfonds']}/` : undefined}
              placeholder={'- Select Series -'}
              searchMinLength={0}
            />
          </Form.Item>
        </Col>
      </Card>
      <Card size={'small'} className={style.Footer}>
        <Row gutter={12} type="flex">
          <Col xs={12}>
            <Link href={archivalUnitFormState['series'] ? `/finding-aids/containers/${archivalUnitFormState['series']}` : ''}>
              <Button
                type={'default'}
                disabled={!archivalUnitFormState['series']}
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
