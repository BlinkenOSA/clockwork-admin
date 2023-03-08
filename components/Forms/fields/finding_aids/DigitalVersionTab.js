import {Badge, Checkbox, Col, Form, Input, Row} from "antd";
import React from "react";

const DigitalVersionTab = ({form, initialValues, locale, readOnly}) => {
  const digital_version_exists = Form.useWatch('digital_version_exists', form);
  const archival_reference_code = Form.useWatch('archival_reference_code', form);

  const {digital_version_exists_container} = initialValues

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
      } else {
        return (
          <div>
            <Badge count={'Available on Research Cloud'} style={
              { backgroundColor: '#223f00', borderRadius: '3px', fontSize: '0.8em', marginTop: '8px' }
            } />
          </div>
        )
      }
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

    const renderContainerLevelIdentifier = () => {
      return archival_reference_code;
    }

    const renderFolderItemLevelIdentifier = () => {
      let unit = archival_reference_code.split(':')[0]
      let container = archival_reference_code.replace(unit, '').split('/')[0]
      let folder = archival_reference_code.replace(unit, '').split('/')[1]

      container = container.replace(":", "").padStart(3, "0")
      folder = folder.padStart(3, "0")

      return `${unit.replace(" ", "_")}_${container}_${folder}`;
    }

    if (digital_version_exists) {
      return renderFolderItemLevelIdentifier()
    } else {
      if (digital_version) {
        if (digital_version_exists_container['digital_version_barcode']) {
          return digital_version_exists_container['digital_version_barcode']
        } else {
          return renderContainerLevelIdentifier()
        }
      } else {
        return 'N/A'
      }
    }
  }

  return (
    <Row gutter={[12]}>
      <Col xs={4}>
        <label>Digital Version (Container Level)</label>
        {renderContainerDigitalVersion()}

      </Col>
      <Col xs={8}>
        <label>Digital Version Identifier</label>
        <Input value={renderDigitalVersionIdentifier()} disabled={true} />
      </Col>
      <Col xs={4}>
        <Form.Item label="Digital Version Exists" name="digital_version_exists" valuePropName={'checked'}>
          <Checkbox style={{marginLeft: '20px'}} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label="Digital Version Online" name="digital_version_online" valuePropName={'checked'}>
          <Checkbox style={{marginLeft: '20px'}} disabled={readOnly}/>
        </Form.Item>
      </Col>
    </Row>
  )
}

export default DigitalVersionTab