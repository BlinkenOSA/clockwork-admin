import {Badge, Checkbox, Col, Divider, Form, Input, Row, Switch} from "antd";
import React, {useEffect} from "react";
import ResearchCloudLink from "./ResearchCloudLink";

const DigitalVersionTab = ({form, initialValues, locale, readOnly}) => {
  const digitalVersionExists = Form.useWatch('digital_version_exists', form);
  const archivalReferenceCode = Form.useWatch('archival_reference_code', form);

  const {digital_version_exists_container} = initialValues

  useEffect(() => {
    if (digitalVersionExists && !digitalVersionExists) {
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

  const renderContainerDigitalVersion = () => {
    const {digital_version} = digital_version_exists_container

    if (digital_version) {
      if (digital_version_exists_container['digital_version_online']) {
        return (
          <div>
            <Badge count={'Available Online'} style={
              { backgroundColor: '#223f00', borderRadius: '3px', fontSize: '0.8em', marginTop: '8px' }
            } />
          </div>
        )
      }

      if (digital_version_exists_container['digital_version_research_cloud']) {
        return (
          <div>
            <Badge count={'Available on Research Cloud'} style={
              { backgroundColor: '#223f00', borderRadius: '3px', fontSize: '0.8em', marginTop: '8px' }
            } />
          </div>
        )
      }

      return (
        <div>
          <Badge count={'Digitized'} style={
            { backgroundColor: '#223f00', borderRadius: '3px', fontSize: '0.8em', marginTop: '8px' }
          } />
        </div>
      )

    } else {
      return (
        <div>
          <Badge count={'Not exists'} style={
            { backgroundColor: '#fa8c16', borderRadius: '3px', fontSize: '0.8em', marginTop: '8px' }
          } />
        </div>
      )
    }
  }

  const renderDigitalVersionIdentifier = () => {
    const {digital_version} = digital_version_exists_container
    const {digital_version_barcode} = digital_version_exists_container

    const renderContainerLevelIdentifier = () => {
      if (archivalReferenceCode) {
        let unit = archivalReferenceCode.split(':')[0]
        let container = archivalReferenceCode.replaceAll(unit, '').split('/')[0]
        container = container.replaceAll(":", "").padStart(4, "0")

        return `${unit.replaceAll(" ", "_")}_${container}`;
      } else {
        return ''
      }
    }

    const renderFolderItemLevelIdentifier = () => {
      let unit = archivalReferenceCode.split(':')[0]
      let container = archivalReferenceCode.replaceAll(unit, '').split('/')[0]
      let folder = archivalReferenceCode.replaceAll(unit, '').split('/')[1]

      container = container.replaceAll(":", "").padStart(4, "0")
      folder = folder.padStart(3, "0")

      return `${unit.replaceAll(" ", "_")}_${container}_${folder}`;
    }

    if (digitalVersionExists) {
      return renderFolderItemLevelIdentifier()
    } else {
      if (digital_version) {
        if (digital_version_barcode) {
          return digital_version_barcode
        } else {
          return renderContainerLevelIdentifier()
        }
      } else {
        return 'N/A'
      }
    }
  }

  return (
    <React.Fragment>
      <Row gutter={12} style={{
        backgroundColor: '#f5f5f5',
        padding: '10px 0px',
      }}>
        <Col xs={8}>
          <label>Digital Version Identifier</label>
          <Input value={renderDigitalVersionIdentifier()} disabled={true} />
        </Col>
        <Col xs={8}>
          <label>Digital Version (Container Level)</label>
          {renderContainerDigitalVersion()}
        </Col>
        {
          digital_version_exists_container['digital_version_research_cloud'] &&
          <Col xs={8}>
            <ResearchCloudLink
              path={digital_version_exists_container['digital_version_research_cloud_path']}
              buttonText={'Open in Research Cloud'}
            />
          </Col>
        }
      </Row>
      <Row gutter={12}>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col xs={8}>
          <Form.Item label="Digital Version (Folder / Item level)" name="digital_version_exists" valuePropName={'checked'}>
            <Switch checkedChildren={'Yes'} unCheckedChildren={'No'} disabled={readOnly}/>
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item label="Digital Version in Research Cloud" name="digital_version_research_cloud" valuePropName={'checked'}>
            <Switch checkedChildren={'Yes'} unCheckedChildren={'No'} disabled={getDisabled()}/>
          </Form.Item>
        </Col>
        <Col xs={8}>
          <Form.Item label="Digital Version Online" name="digital_version_online" valuePropName={'checked'}>
            <Switch checkedChildren={'Yes'} unCheckedChildren={'No'} disabled={getDisabled()}/>
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default DigitalVersionTab