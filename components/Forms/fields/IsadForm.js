import React, {useEffect, useState} from "react";
import {Col, Form, Input, Row, Tabs} from "antd";
import FormSelect from "../components/FormSelect";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {Creators} from "./isad/Creators";
import {FormRemoteSelectWithEdit} from "../components/FormRemoteSelectWithEdit";
import {renderLabelFlag} from "../../../utils/functions/renderLabelFlag";
import {Extents} from "./isad/Extents";
import {FormFormattedText} from "../components/FormFormattedText";
import {RelatedFindingAids} from "./isad/RelatedFindingAids";
import {LocationOfOriginals} from "./isad/LocationOfOriginals";
import {LocationOfCopies} from "./isad/LocationOfCopies";
import FormTranslateButton from "../components/FormTranslateButton";

const ACCRUALS = [
  { id: true, accrual: 'Expected'},
  { id: false, accrual: 'Not Expected'},
];

const LEVELS = [
  { id: 'F', level: 'Fonds'},
  { id: 'SF', level: 'Subfonds'},
  { id: 'S', level: 'Series'}
];

const Tab01 = ({form, readOnly}) => (
  <Row gutter={[12]}>
    <Form.Item name="archival_unit" required rules={[{ required: true }]}>
      <Input hidden={true}/>
    </Form.Item>
    <Col xs={4}>
      <Form.Item label="3.1.1 Reference code" name="reference_code" required rules={[{ required: true }]}>
        <Input disabled={true}/>
      </Form.Item>
    </Col>
    <Col xs={20}>
      <Form.Item label="3.1.2 Title" name="title" required rules={[{ required: true }]}>
        <Input disabled={true}/>
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item
        label="3.1.3 Date (from)"
        name="year_from"
        required
        rules={[{ required: true }]}
        extra={'Date format: YYYY'}
      >
        <Input disabled={readOnly}/>
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item
        label="3.1.3 Date (to)"
        name="year_to"
        extra={'Date format: YYYY'}
      >
        <Input disabled={readOnly}/>
      </Form.Item>
    </Col>
    <Col xs={8}>
      <Form.Item label="3.1.4 Level of description" name="description_level" required rules={[{ required: true }]}>
        <FormSelect
          data={LEVELS}
          valueField={'id'}
          labelField={'level'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={8}>
      <Form.Item label="Original metadata language" name="original_locale">
        <FormRemoteSelect
          valueField={'id'}
          labelField={'locale_name'}
          placeholder={'- Choose language -'}
          selectAPI={'/v1/controlled_list/select/locales/'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Creators disabled={readOnly} />
    </Col>
    <Col xs={12}>
      <Form.Item label="3.2.1 Creator (ISAAR)" name="isaar">
        <FormRemoteSelectWithEdit
          fieldName={'isaar'}
          form={form}
          valueField={'id'}
          labelField={'name'}
          selectAPI={'/v1/isaar/select/'}
          api={'/v1/isaar/'}
          label={'Isaar-CPF'}
          module={'isaar'}
          disabled={readOnly}
        />
      </Form.Item>
      <Form.Item label="3.4.3 Language / scripts of material" name="language">
        <FormRemoteSelect
          valueField={'id'}
          labelField={'language'}
          mode={'multiple'}
          selectAPI={'/v1/authority_list/select/languages/'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="3.4.1 Access rights" name="access_rights">
        <FormRemoteSelect
          valueField={'id'}
          labelField={'statement'}
          selectAPI={'/v1/controlled_list/select/access_rights/'}
          disabled={true}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="3.4.2 Reproduction rights" name="reproduction_rights">
        <FormRemoteSelect
          valueField={'id'}
          labelField={'statement'}
          selectAPI={'/v1/controlled_list/select/reproduction_rights/'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Access rights (legacy)" name="access_rights_legacy">
        <Input.TextArea rows={3} disabled={true}/>
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Reproduction rights (legacy)" name="reproduction_rights_legacy">
        <Input.TextArea rows={3} disabled={true}/>
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="3.3.3 Accruals" name="accruals">
        <FormSelect
          data={ACCRUALS}
          valueField={'id'}
          labelField={'accrual'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Rights restriction reason" name="rights_restriction_reason">
        <FormRemoteSelect
          valueField={'id'}
          labelField={'reason'}
          selectAPI={'/v1/controlled_list/select/rights_restriction/'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
  </Row>
);

const Tab02 = ({form, locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <Form.Item label={`3.1.3 Predominant date`} name="predominant_date">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Extents disabled={readOnly} />
      </Col>
      <Col xs={12}>
        <Form.Item label="Estimated amount of carriers" name="carrier_estimated" style={{marginBottom: 0}}>
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'carrier_estimated'}
          toField={'carrier_estimated_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Estimated amount of carriers - Original language')}
          name="carrier_estimated_original"
          style={{marginBottom: 0}}>
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'carrier_estimated_original'}
          toField={'carrier_estimated'}
          disabled={readOnly}/>
      </Col>
    </Row>
  )
};

const Tab03 = ({form, locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={12}>
        <Form.Item label={`3.2.2 Administrative / Biographical history`} name="administrative_history" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'administrative_history'}
          toField={'administrative_history_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.2.2 Administrative history - Original language')}
          name="administrative_history_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'administrative_history_original'}
          toField={'administrative_history'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`3.2.3 Archival history`} name="archival_history" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'archival_history'}
          toField={'archival_history_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.2.3 Archival history - Original language')}
          name="archival_history_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'archival_history_original'}
          toField={'archival_history'}
          disabled={readOnly}/>
      </Col>
    </Row>
  )
};

const Tab04 = ({form, locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={12}>
        <Form.Item label={`3.3.1 Scope and content (abstract)`} name="scope_and_content_abstract" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'scope_and_content_abstract'}
          toField={'scope_and_content_abstract_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.3.1 Scope and content (abstract) - Original Language')}
          name="scope_and_content_abstract_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'scope_and_content_abstract_original'}
          toField={'scope_and_content_abstract'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`3.3.1 Scope and content (narrative)`} name="scope_and_content_narrative" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'scope_and_content_narrative'}
          toField={'scope_and_content_narrative_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.3.1 Scope and content (narrative) - Original Language')}
          name="scope_and_content_narrative_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'scope_and_content_narrative_original'}
          toField={'scope_and_content_narrative'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`3.3.2 Appraisal`} name="appraisal" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={80} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'appraisal'}
          toField={'appraisal_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.3.2 Appraisal - Original language')}
          name="appraisal_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={80} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'appraisal_original'}
          toField={'appraisal'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`3.3.4 System of arrangement information`} name="system_of_arrangement_information" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={80} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'system_of_arrangement_information'}
          toField={'system_of_arrangement_information_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.3.4 System of arrangement information - Original language')}
          name="system_of_arrangement_information_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={80} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'system_of_arrangement_information_original'}
          toField={'system_of_arrangement_information'}
          disabled={readOnly}/>
      </Col>
    </Row>
  )
};

const Tab05 = ({form, locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <Form.Item label={`Embargo`} name="embargo" extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'}>
          <Input disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`3.4.4 Physical characteristics and technical requirements`} name="physical_characteristics" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={100} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'physical_characteristics'}
          toField={'physical_characteristics_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.4.4 Physical characteristics and technical requirements - Original language')}
          name="physical_characteristics_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={100} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'physical_characteristics_original'}
          toField={'physical_characteristics'}
          disabled={readOnly}/>
      </Col>
      <Col xs={24}>
        <RelatedFindingAids disabled={readOnly} />
      </Col>
    </Row>
  )
};

const Tab06 = ({form, locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <LocationOfOriginals disabled={readOnly} />
      </Col>
      <Col xs={24}>
        <LocationOfCopies disabled={readOnly} />
      </Col>
      <Col xs={12}>
        <Form.Item label={`3.5.4 Publication note`} name="publication_note" style={{marginBottom: 0}}>
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'publication_note'}
          toField={'publication_note_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.5.4 Publication note - Original Language')}
          name="publication_note_original"
          style={{marginBottom: 0}}>
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'publication_note_original'}
          toField={'publication_note'}
          disabled={readOnly}/>
      </Col>
    </Row>
  )
};

const Tab07 = ({form, locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={12}>
        <Form.Item label={`3.6.1 Note`} name="note" style={{marginBottom: 0}}>
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'note'}
          toField={'note_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.6.1 Note - Original language')}
          name="note_original"
          style={{marginBottom: 0}}>
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'note_original'}
          toField={'note'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Internal note`} name="internal_note" style={{marginBottom: 0}}>
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'internal_note'}
          toField={'internal_note_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Internal note - Original language')}
          name="internal_note_original"
          style={{marginBottom: 0}}>
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'internal_note_original'}
          toField={'internal_note'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`3.7.1 Archivists note`} name="archivists_note" style={{marginBottom: 0}}>
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'archivists_note'}
          toField={'archivists_note_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, '3.7.1 Archivists note - Original language')}
          name="archivists_note_original"
          style={{marginBottom: 0}}>
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'archivists_note_original'}
          toField={'archivists_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={24}>
        <Form.Item label={`3.7.2 Rules and conventions`} name="rules_and_conventions">
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
      </Col>
    </Row>
  )
};

export const IsadForm = ({form, readOnly, onActiveTabChange}) => {

  useEffect(() => {
    onActiveTabChange('required_values')
  }, [])

  const onChange = (activeKey) => {
    onActiveTabChange(activeKey)
  }

  const items = [
    {
      key: 'required_values',
      label: 'Required Values',
      children: <Tab01 form={form} readOnly={readOnly}/>
    }, {
      key: 'identity',
      label: 'Identity',
      children: <Tab02 form={form} readOnly={readOnly}/>
    }, {
      key: 'context',
      label: 'Context',
      children: <Tab03 form={form} readOnly={readOnly}/>
    }, {
      key: 'content',
      label: 'Content',
      children: <Tab04 form={form} readOnly={readOnly}/>
    }, {
      key: 'access_and_use',
      label: 'Access & Use',
      children: <Tab05 form={form} readOnly={readOnly}/>
    }, {
      key: 'allied_materials',
      label: 'Allied Materials',
      children: <Tab06 form={form} readOnly={readOnly}/>
    }, {
      key: 'notes',
      label: 'Notes',
      children: <Tab07 form={form} readOnly={readOnly}/>
    },
  ]

  return (
    <React.Fragment>
      <Col xs={24}>
        <Tabs defaultActiveKey="required_values" items={items} onChange={onChange} />
      </Col>
    </React.Fragment>
  )
};
