import React, {useEffect} from 'react';
import {Form, Col, Input, Checkbox, Divider, Switch, Button} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import ResearchCloudLink from "./finding_aids/ResearchCloudLink";

export const ContainerForm = ({form, readOnly}) => {
  const digitalVersionExists = Form.useWatch('digital_version_exists', form);
  const digitalVersionResearchCloud = Form.useWatch('digital_version_research_cloud', form)
  const digitalVersionResearchCloudPath = Form.useWatch('digital_version_research_cloud_path', form)

  useEffect(() => {
    if (!digitalVersionExists) {
      form.setFieldValue("digital_version_research_cloud", false)
      form.setFieldValue("digital_version_online", false)
    }
  }, [digitalVersionExists])

  const getDisabled = () => {
    if (readOnly) {
      return true
    } else {
      return !digitalVersionExists
    }
  }



  return (
    <React.Fragment>
      <Form.Item name={'archival_unit'}>
        <Input hidden={true}/>
      </Form.Item>
      <Col xs={24}>
        <Form.Item label="Container No." name="container_no" required rules={[{ required: true }]}>
          <Input disabled={true}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Carrier type" name="carrier_type" required rules={[{ required: true }]}>
          <FormRemoteSelect
            valueField={'id'}
            labelField={'type'}
            placeholder={'- Select Carrier Type -'}
            selectAPI={'/v1/controlled_list/select/carrier_types/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Container label" name="container_label">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Divider />
      <Col xs={8}>
        <Form.Item label="Digital Version Exists" name="digital_version_exists" valuePropName={'checked'}>
          <Switch checkedChildren={'Yes'} unCheckedChildren={'No'} disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Digital Version in Research Cloud" name="digital_version_research_cloud" valuePropName={'checked'}>
          <Switch checkedChildren={'Yes'} unCheckedChildren={'No'} disabled={getDisabled()} />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Digital Version in Catalog" name="digital_version_online" valuePropName={'checked'}>
          <Switch checkedChildren={'Yes'} unCheckedChildren={'No'} disabled={getDisabled()} />
        </Form.Item>
      </Col>
      {
        digitalVersionResearchCloud &&
        <React.Fragment>
          <Col xs={20}>
            <Form.Item label="Digital Version Research Cloud URL" name="digital_version_research_cloud_path">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={4}>
            <ResearchCloudLink path={digitalVersionResearchCloudPath}/>
          </Col>
        </React.Fragment>
      }
      <Col xs={8}>
        <Form.Item label="Digital Version Creation Date" name="digital_version_creation_date">
          <Input disabled={true} />
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

