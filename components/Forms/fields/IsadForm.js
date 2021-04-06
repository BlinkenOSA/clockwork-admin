import React, {useEffect} from "react";
import {Col, Form, Input, Row, Tabs} from "antd";
import FormSelect from "../components/FormSelect";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {Creators} from "./isad/Creators";
import {FormRemoteSelectWithEdit} from "../components/FormRemoteSelectWithEdit";
import {renderLabelFlag} from "../../../utils/functions/renderLabelFlag";

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
        name="date_from"
        required
        rules={[{ required: true }]}
        help={'Date format: YYYY'}
      >
        <Input disabled={readOnly}/>
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item
        label="Date (To)"
        name="date_to"
        required
        rules={[{ required: true }]}
        help={'Date format: YYYY'}
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

const Tab02 = ({form, locale, readOnly}) => {
  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <Form.Item label={`Predominant date`} name="predominant_date">
          <Input disabled={readOnly}/>
        </Form.Item>
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
          </TabPane>
          <TabPane tab={'Content'} key="content" forceRender={true}>
          </TabPane>
          <TabPane tab={'Access & Use'} key="access_and_use" forceRender={true}>
          </TabPane>
          <TabPane tab={'Allied Materials'} key="allied_materials" forceRender={true}>
          </TabPane>
          <TabPane tab={'Notes'} key="notes" forceRender={true}>
          </TabPane>
        </Tabs>
      </Col>
    </React.Fragment>
  )
};
