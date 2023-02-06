import React from "react";
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

const {TabPane} = Tabs;

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
      <Form.Item label="Reference code" name="reference_code" required rules={[{ required: true }]}>
        <Input disabled={true}/>
      </Form.Item>
    </Col>
    <Col xs={20}>
      <Form.Item label="Title" name="title" required rules={[{ required: true }]}>
        <Input disabled={true}/>
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item
        label="Date (From)"
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
        label="Date (To)"
        name="year_to"
        extra={'Date format: YYYY'}
      >
        <Input disabled={readOnly}/>
      </Form.Item>
    </Col>
    <Col xs={8}>
      <Form.Item label="Description level" name="description_level" required rules={[{ required: true }]}>
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
      <Form.Item label="ISAAR" name="isaar">
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
      <Form.Item label="Language" name="language">
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
      <Form.Item label="Access Rights" name="access_rights">
        <FormRemoteSelect
          valueField={'id'}
          labelField={'statement'}
          selectAPI={'/v1/controlled_list/select/access_rights/'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Reproduction rights" name="reproduction_rights">
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
      <Form.Item label="Accruals" name="accruals">
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

const Tab02 = ({locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <Form.Item label={`Predominant date`} name="predominant_date">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Extents disabled={readOnly} />
      </Col>
      <Col xs={12}>
        <Form.Item label="Estimated Amount of Carriers" name="carrier_estimated">
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Estimated Amount of Carriers - Original Language')}
          name="carrier_estimated_original">
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
      </Col>
    </Row>
  )
};

const Tab03 = ({locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={12}>
        <Form.Item label={`Administrative history`} name="administrative_history">
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Administrative History - Original Language')}
          name="administrative_history_original">
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Archival history`} name="archival_history">
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Archival History - Original Language')}
          name="archival_history_original">
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
      </Col>
    </Row>
  )
};

const Tab04 = ({locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={12}>
        <Form.Item label={`Scope and Content (Abstract)`} name="scope_and_content_abstract">
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Scope and Content (Abstract) - Original Language')}
          name="scope_and_content_abstract_original">
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Scope and Content (Narrative)`} name="scope_and_content_narrative">
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Scope and Content (Narrative) - Original Language')}
          name="scope_and_content_narrative_original">
          <FormFormattedText disabled={readOnly} height={150} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Appraisal`} name="appraisal">
          <FormFormattedText disabled={readOnly} height={80} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Appraisal - Original Language')}
          name="appraisal_original">
          <FormFormattedText disabled={readOnly} height={80} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`System of Arrangement`} name="system_of_arrangement_information">
          <FormFormattedText disabled={readOnly} height={80} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'System of Arrangement - Original Language')}
          name="system_of_arrangement_information_original">
          <FormFormattedText disabled={readOnly} height={80} />
        </Form.Item>
      </Col>
    </Row>
  )
};

const Tab05 = ({locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <Form.Item label={`Embargo`} name="embargo" extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'}>
          <Input disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Physical characteristics`} name="physical_characteristics">
          <FormFormattedText disabled={readOnly} height={100} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Physical characteristics - Original Language')}
          name="physical_characteristics_original">
          <FormFormattedText disabled={readOnly} height={100} />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <RelatedFindingAids disabled={readOnly} />
      </Col>
    </Row>
  )
};

const Tab06 = ({locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <LocationOfOriginals disabled={readOnly} />
      </Col>
      <Col xs={24}>
        <LocationOfCopies disabled={readOnly} />
      </Col>
      <Col xs={12}>
        <Form.Item label={`Publication Note`} name="publication_note">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Publication Note - Original Language')}
          name="publication_note_original">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
    </Row>
  )
};

const Tab07 = ({locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={12}>
        <Form.Item label={`Note`} name="note">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Note - Original Language')}
          name="note_original">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Internal Note`} name="internal_note">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Internal Note - Original Language')}
          name="internal_note_original">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Archivists note`} name="archivists_note">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Archivists note - Original Language')}
          name="archivists_original">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label={`Rules and Conventions`} name="rules_and_conventions">
          <Input.TextArea rows={3} disabled={readOnly}/>
        </Form.Item>
      </Col>
    </Row>
  )
};

export const IsadForm = ({form, locale, readOnly}) => {
  return (
    <React.Fragment>
      <Col xs={24}>
        <Tabs defaultActiveKey="required_values">
          <TabPane tab={'Required Values'} key="required_values" forceRender={true}>
            <Tab01 form={form} readOnly={readOnly}/>
          </TabPane>
          <TabPane tab={'Identity'} key="identity" forceRender={true}>
            <Tab02 form={form} locale={locale} readOnly={readOnly}/>
          </TabPane>
          <TabPane tab={'Context'} key="context" forceRender={true} >
            <Tab03 form={form} locale={locale} readOnly={readOnly}/>
          </TabPane>
          <TabPane tab={'Content'} key="content" forceRender={true}>
            <Tab04 form={form} locale={locale} readOnly={readOnly}/>
          </TabPane>
          <TabPane tab={'Access & Use'} key="access_and_use" forceRender={true}>
            <Tab05 form={form} locale={locale} readOnly={readOnly}/>
          </TabPane>
          <TabPane tab={'Allied Materials'} key="allied_materials" forceRender={true}>
            <Tab06 form={form} locale={locale} readOnly={readOnly}/>
          </TabPane>
          <TabPane tab={'Notes'} key="notes" forceRender={true}>
            <Tab07 form={form} locale={locale} readOnly={readOnly}/>
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};
