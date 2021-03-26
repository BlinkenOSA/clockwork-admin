import React from 'react';
import {Form, Col, Input, Row} from "antd";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {FormMultipleFields} from "../components/FormMultipleFields";
import {FormRemoteSelectWithEdit} from "../components/FormRemoteSelectWithEdit";

const AccessionItem = ({field, disabled}) => (
  <React.Fragment>
    <Col xs={4}>
      <Form.Item
        {...field}
        name={[field.name, 'quantity']}
        fieldKey={[field.name, 'quantity']}
      >
        <Input placeholder={'Quantity'} disabled={disabled}/>
      </Form.Item>
    </Col>
    <Col xs={8}>
      <Form.Item
        {...field}
        name={[field.name, 'container']}
        fieldKey={[field.name, 'container']}
      >
        <Input placeholder={'Container'} disabled={disabled}/>
      </Form.Item>
    </Col>
    <Col xs={10}>
      <Form.Item
        {...field}
        name={[field.name, 'content']}
        fieldKey={[field.name, 'content']}
      >
        <Input placeholder={'Content'} disabled={disabled}/>
      </Form.Item>
    </Col>
  </React.Fragment>
);

export const AccessionForm = ({form, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={12}>
        <Form.Item label="Accession Number" name="seq">
          <Input disabled />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Donor" name="donor">
          <FormRemoteSelectWithEdit
            fieldName={'donor'}
            form={form}
            valueField={'id'}
            labelField={'name'}
            selectAPI={'/v1/donor/select/'}
            api={'/v1/donor/'}
            label={'Donor'}
            module={'donors'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Archival Unit" name="archival_unit">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'title_full'}
            selectAPI={'/v1/archival_unit/select/'}
            selectAPIParams={{level: 'F'}}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label="Archival Unit Number (Legacy)" name="archival_unit_legacy_number">
          <Input disabled />
        </Form.Item>
      </Col>
      <Col xs={16}>
        <Form.Item label="Archival Unit Name (Legacy)" name="archival_unit_legacy_name">
          <Input disabled />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Title" name="title" required rules={[{ required: true }]}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Creation Date (From)" name="creation_date_from">
          <Input disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Creation Date (To)" name="creation_date_to">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Copyright Status" name="copyright_status" required rules={[{ required: true }]}>
          <FormRemoteSelect
            valueField={'id'}
            labelField={'status'}
            selectAPI={'/v1/accession/select/accession_copyright_status/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Transfer Date" name="transfer_date" help={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Custodial History" name="custodial_history">
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <FormMultipleFields label={'Items'} disabled={readOnly}>
          <AccessionItem />
        </FormMultipleFields>
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={24}>
            <Form.Item label="Method" name="method" required rules={[{ required: true }]}>
              <FormRemoteSelect
                valueField={'id'}
                labelField={'method'}
                selectAPI={'/v1/accession/select/accession_method/'}
                disabled={readOnly}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Access Note" name="access_note">
              <Input.TextArea rows={5} disabled={readOnly} />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={24}>
            <Form.Item label="Copyright Note" name="copyright_note">
              <Input.TextArea rows={3} disabled={readOnly}/>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Note" name="note">
              <Input.TextArea rows={3} disabled={readOnly}/>
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col xs={8}>
        <Form.Item label="Building" name="building">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'building'}
            selectAPI={'/v1/controlled_list/select/buildings/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label="Module" name="module">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label="Row" name="row">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label="Section" name="section">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label="Shelf" name="shelf">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
    </React.Fragment>
  )
};

