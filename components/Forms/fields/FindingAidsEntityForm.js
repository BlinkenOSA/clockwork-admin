import React, {useEffect, useState} from "react";
import {Badge, Button, Checkbox, Col, DatePicker, Form, Input, Row, Space, Tabs} from "antd";
import FormSelect from "../components/FormSelect";
import FormRemoteSelect from "../components/FormRemoteSelect";
import {renderLabelFlag} from "../../../utils/functions/renderLabelFlag";
import {FormFormattedText} from "../components/FormFormattedText";
import {Dates} from "./finding_aids/Dates";
import {Languages} from "./finding_aids/Languages";
import {Extents} from "./finding_aids/Extents";
import {ContributorsPeople} from "./finding_aids/ContributorsPeople";
import {ContributorsCorporations} from "./finding_aids/ContributorsCorporations";
import {AdditionalCountries} from "./finding_aids/AdditionalCountries";
import {AdditionalPlaces} from "./finding_aids/AdditionalPlaces";
import {FormRemoteSelectWithEdit} from "../components/FormRemoteSelectWithEdit";
import FormTranslateButton from "../components/FormTranslateButton";
import DigitalVersionTab from "./finding_aids/DigitalVersionTab";
import FormDatePicker from "../components/FormDatePicker";
import dayjs from "dayjs";
import {Identifiers} from "./finding_aids/Identifiers";
import {FormFormattedTextV3} from "../components/FormFormattedTextV3";

const L1_LEVELS = [
  { id: 'F', level: 'Folders'},
  { id: 'I', level: 'Items'},
];

const L2_LEVELS = [
  { id: 'I', level: 'Items'}
];

const DESCRIPTION_LEVELS = [
  { id: 'L1', level: 'Level 1'},
  { id: 'L2', level: 'Level 2'},
];

const ACCESS_RIGHTS = [
  { id: 1, right: 'Not Restricted'},
  { id: 3, right: 'Restricted'},
];

const createData = (maxValue) => {
  const data = [...Array(maxValue+1).keys()].map(value => {return {id: value, number: value}});
  data.shift();
  return data;
};

const Identifier = ({initialValues, type}) => (
  <Row gutter={[12]} style={{
    backgroundColor: '#f5f5f5',
    padding: '10px 0px',
  }}>
    <Form.Item name="archival_unit" required rules={[{ required: true }]}>
      <Input hidden={true}/>
    </Form.Item>
    <Col xs={4}>
      <Form.Item label="Description level" name="description_level" required rules={[{ required: true }]}>
        <FormSelect
          data={DESCRIPTION_LEVELS}
          valueField={'id'}
          labelField={'level'}
          disabled={type !== 'create'}
          allowClear={false}
        />
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues['description_level'] !== curValues['description_level']}
      >
        {({getFieldValue}) =>
          <Form.Item label="Level" name="level" required rules={[{required: true}]}>
            <FormSelect
              data={getFieldValue('description_level') === 'L1' ? L1_LEVELS : L2_LEVELS}
              valueField={'id'}
              labelField={'level'}
              disabled={type !== 'create'}
            />
          </Form.Item>
        }
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues['description_level'] !== curValues['description_level']}
      >
        {({ getFieldValue }) =>
          <Form.Item label="Folder No." name="folder_no" required rules={[{ required: true }]}>
            <FormSelect
              data={createData(initialValues['folder_no'])}
              valueField={'id'}
              labelField={'number'}
              disabled={getFieldValue('description_level') === 'L1'}
              allowClear={false}
            />
          </Form.Item>
        }
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item label="Sequence No." name="sequence_no" required rules={[{ required: true }]}>
        <Input disabled={true}/>
      </Form.Item>
    </Col>
    <Col xs={8}>
      <Form.Item label="Archival Reference Code" name="archival_reference_code" >
        <Input disabled={true}/>
      </Form.Item>
    </Col>
  </Row>
);

const Tab01 = ({form, locale, readOnly}) => {
  const accessRights = Form.useWatch('access_rights', form)
  const dateFrom = Form.useWatch('date_from', form)
  const restrictionDate = Form.useWatch('access_rights_restriction_date', form)

  const setRestrictionDate = (number) => {
    let dObj;
    if (restrictionDate) {
      dObj = dayjs(restrictionDate)
    } else {
      if (dateFrom) {
        try {
          dObj = dayjs(`${dateFrom.slice(0, 4)}-12-31`)
        } catch (error) {
          // Invalid date
        }
      }
    }
    if (dObj.isValid()) {
      form.setFieldValue('access_rights_restriction_date', dObj.add(number, 'year').format('YYYY-MM-DD'))
    }
  }

  return (
    <Row gutter={[12]}>
      <Col xs={6}>
        <Form.Item label="Legacy ID" name="legacy_id" >
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Primary Type" name="primary_type">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'type'}
            placeholder={'- Choose primary type -'}
            selectAPI={'/v1/controlled_list/select/primary_types/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Original locale" name="original_locale">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'locale_name'}
            placeholder={'- Choose language -'}
            selectAPI={'/v1/controlled_list/select/locales/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="UUID" name="uuid" required rules={[{ required: true }]}>
          <Input disabled={true}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Title" name="title" required rules={[{ required: true }]} style={{marginBottom: 0}}>
          <Input disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'title'}
          toField={'title_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Title - Original Language')}
          name="title_original"
          style={{marginBottom: 0}}>
          <Input disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'title_original'}
          toField={'title'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Date From`} name="date_from" extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'} required rules={[{ required: true }]}>
          <Input disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label={`Date To`} name="date_to" extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'}>
          <Input disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label={`Date Ca. Span`} name="date_ca_span">
          <Input disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Dates disabled={readOnly} />
      </Col>
      <Col xs={12}>
        <Form.Item label="Access Rights" name="access_rights" required rules={[{ required: true }]}>
          <FormSelect
            data={ACCESS_RIGHTS}
            valueField={'id'}
            labelField={'right'}
            allowClear={false}
          />
        </Form.Item>
          <label>Restriction Date</label>
          <Space.Compact block>
            <Button onClick={() => setRestrictionDate(5)} disabled={readOnly || accessRights === '2'}>
              +5Y
            </Button>
            <Button onClick={() => setRestrictionDate(-5)} disabled={readOnly || accessRights === '2'}>
              -5Y
            </Button>
            <Form.Item name="access_rights_restriction_date" style={{width: '100%'}}>
              <FormDatePicker
                format={'YYYY-MM-DD'}
                disabled={readOnly || accessRights === '2'} />
            </Form.Item>
          </Space.Compact>
      </Col>
      <Col xs={12}>
        <Form.Item label="Restriction Explanation" name="access_rights_restriction_explanation">
          <Input.TextArea rows={4} disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Contents Summary`} name="contents_summary" style={{marginBottom: 0}}>
            <FormFormattedTextV3 disabled={readOnly} height={170} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'contents_summary'}
          toField={'contents_summary_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Contents Summary - Original Language')}
          name="contents_summary_original"
          style={{marginBottom: 0}}>
          <FormFormattedTextV3 disabled={readOnly} height={170} />
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'contents_summary_original'}
          toField={'contents_summary'}
          disabled={readOnly}/>
      </Col>
      <Col xs={4}>
        <Form.Item label="Confidential" name="confidential" valuePropName={'checked'}>
          <Checkbox style={{marginLeft: '20px'}} disabled={readOnly} />
        </Form.Item>
      </Col>
      <Col xs={20}>
        <Form.Item label="Confidential Display Text" name="confidential_display_text">
          <Input disabled={readOnly} />
        </Form.Item>
      </Col>
    </Row>
  );
}

const IdentifierTemplate = ({initialValues, type}) => (
  <Row gutter={[12]} style={{
    backgroundColor: '#f5f5f5',
    padding: '10px 0px',
  }}>
    <Form.Item name="archival_unit" required rules={[{ required: true }]}>
      <Input hidden={true}/>
    </Form.Item>
    <Col xs={10}>
      <Form.Item label={`Template Name`} name="template_name">
        <Input />
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item label="Description level" name="description_level" required rules={[{ required: true }]}>
        <FormSelect
          data={DESCRIPTION_LEVELS}
          valueField={'id'}
          labelField={'level'}
          allowClear={false}
        />
      </Form.Item>
    </Col>
    <Col xs={4}>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues['description_level'] !== curValues['description_level']}
      >
        {({getFieldValue}) =>
          <Form.Item label="Level" name="level" required rules={[{required: true}]}>
            <FormSelect
              data={getFieldValue('description_level') === 'L1' ? L1_LEVELS : L2_LEVELS}
              valueField={'id'}
              labelField={'level'}
            />
          </Form.Item>
        }
      </Form.Item>
    </Col>
    <Col xs={6}>
      <Form.Item label="Archival Reference Code" name="archival_reference_code" >
        <Input disabled={true}/>
      </Form.Item>
    </Col>
  </Row>
);

const Tab01Template = ({form, locale, readOnly, type}) => {
  const accessRights = Form.useWatch('access_rights', form)
  const dateFrom = Form.useWatch('date_from', form)
  const restrictionDate = Form.useWatch('access_rights_restriction_date', form)

  const setRestrictionDate = (number) => {
    let dObj;
    if (restrictionDate) {
      dObj = dayjs(restrictionDate)
    } else {
      if (dateFrom) {
        try {
          dObj = dayjs(`${dateFrom.slice(0, 4)}-12-31`)
        } catch (error) {
          // Invalid date
        }
      }
    }
    if (dObj.isValid()) {
      form.setFieldValue('access_rights_restriction_date', dObj.add(number, 'year').format('YYYY-MM-DD'))
    }
  }

  return (
    <Row gutter={[12]}>
      <Form.Item name="is_template">
        <Input hidden={true}/>
      </Form.Item>
      <Col xs={6}>
        <Form.Item label="Legacy ID" name="legacy_id">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Primary Type" name="primary_type">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'type'}
            placeholder={'- Choose primary type -'}
            selectAPI={'/v1/controlled_list/select/primary_types/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="Original locale" name="original_locale">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'locale_name'}
            placeholder={'- Choose language -'}
            selectAPI={'/v1/controlled_list/select/locales/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={6}>
        <Form.Item label="UUID" name="uuid">
          <Input disabled={true}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label="Title" name="title" style={{marginBottom: 0}}>
          <Input disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'title'}
          toField={'original_title'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Title - Original Language')}
          name="original_title"
          style={{marginBottom: 0}}>
          <Input disabled={readOnly}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'original_title'}
          toField={'title'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Date From`} name="date_from" extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={8}>
        <Form.Item label={`Date To`} name="date_to" extra={'Date format: YYYY, or YYYY-MM, or YYYY-MM-DD'}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label={`Date Ca. Span`} name="date_ca_span">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Dates disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label="Access Rights" name="access_rights">
          <FormSelect
            data={ACCESS_RIGHTS}
            valueField={'id'}
            labelField={'right'}
            allowClear={false}
          />
        </Form.Item>
        <label>Restriction Date</label>
        <Space.Compact block>
          <Button onClick={() => setRestrictionDate(5)} disabled={readOnly || accessRights === '2'}>
            +5Y
          </Button>
          <Button onClick={() => setRestrictionDate(-5)} disabled={readOnly || accessRights === '2'}>
            -5Y
          </Button>
          <Form.Item name="access_rights_restriction_date" style={{width: '100%'}}>
            <FormDatePicker
              format={'YYYY-MM-DD'}
              disabled={readOnly || accessRights === '2'}/>
          </Form.Item>
        </Space.Compact>
      </Col>
      <Col xs={12}>
        <Form.Item label="Restriction Explanation" name="access_rights_restriction_explanation">
          <Input.TextArea rows={4} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Contents Summary`} name="contents_summary">
          <FormFormattedText disabled={readOnly} height={120}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Contents Summary - Original Language')}
          name="contents_summary_original">
          <FormFormattedText disabled={readOnly} height={120}/>
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label="Confidential" name="confidential" valuePropName={'checked'}>
          <Checkbox style={{marginLeft: '20px'}} disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={20}>
        <Form.Item label="Confidential Display Text" name="confidential_display_text">
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
    </Row>
  );
}

const Tab02 = ({form, locale, readOnly}) => {
  const timeStart = Form.useWatch('time_start', form)
  const timeEnd = Form.useWatch('time_end', form)

  useEffect(() => {
    const ts = dayjs(timeStart, 'HH:mm:ss')
    const te = dayjs(timeEnd, 'HH:mm:ss')

    if (timeStart) {
      if (timeEnd) {
        if (ts.isValid() && te.isValid()) {
          if (ts.isBefore(te)) {
            const duration = te.diff(ts)
            form.setFieldValue('duration', dayjs(duration).subtract(1, 'hour').format('HH:mm:ss'))
          } else {
            form.setFieldValue('duration', '')
          }
        } else {
          form.setFieldValue('duration', '')
        }
      } else {
        if (ts.isValid()) {
          form.setFieldValue('duration', timeStart)
        } else {
          form.setFieldValue('duration', '')
        }
      }
    } else {
      form.setFieldValue('duration', '')
    }

  }, [timeStart, timeEnd])

  return (
    <Row gutter={[12]}>
      <Col xs={24}>
        <Identifiers disabled={readOnly} />
      </Col>
      <Col xs={12}>
        <Form.Item label="Form/Genre" name="genre">
          <FormRemoteSelect
            valueField={'id'}
            labelField={'genre'}
            mode={'multiple'}
            selectAPI={'/v1/authority_list/select/genres/'}
            disabled={readOnly}
          />
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label={`Time Start`} name="time_start" extra={'Format: hh:mm:ss'}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label={`Time End`} name="time_end" extra={'Format: hh:mm:ss'}>
          <Input disabled={readOnly}/>
        </Form.Item>
      </Col>
      <Col xs={4}>
        <Form.Item label={`Duration`} name="duration">
          <Input disabled={true}/>
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label={`Physical Condition`} name="physical_condition">
          <FormFormattedText disabled={readOnly} height={100}/>
        </Form.Item>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Physical Description`} name="physical_description" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={100}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'physical_description'}
          toField={'physical_description_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Physical Description - Original Language')}
          name="physical_description_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={100}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'physical_description_original'}
          toField={'physical_description'}
          disabled={readOnly}/>
      </Col>
      <Col xs={24}>
        <Languages disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item label={`Language Statement`} name="language_statement" style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={100}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toOriginal'}
          fieldName={'language_statement'}
          toField={'language_statement_original'}
          disabled={readOnly}/>
      </Col>
      <Col xs={12}>
        <Form.Item
          label={renderLabelFlag(locale, 'Language Statement - Original Language')}
          name="language_statement_original"
          style={{marginBottom: 0}}>
          <FormFormattedText disabled={readOnly} height={100}/>
        </Form.Item>
        <FormTranslateButton
          form={form}
          mode={'toEnglish'}
          fieldName={'language_statement_original'}
          toField={'language_statement'}
          disabled={readOnly}/>
      </Col>
      <Col xs={24}>
        <Extents form={form} disabled={readOnly}/>
      </Col>
    </Row>
  )
};

const Tab03 = ({form, readOnly}) => (
  <Row gutter={[12]}>
    <Col xs={24}>
      <ContributorsPeople form={form} disabled={readOnly} />
    </Col>
    <Col xs={24}>
      <ContributorsCorporations form={form} disabled={readOnly} />
    </Col>
    <Col xs={24}>
      <AdditionalCountries form={form} disabled={readOnly} />
    </Col>
    <Col xs={24}>
      <AdditionalPlaces form={form} disabled={readOnly} />
    </Col>
  </Row>
);

const Tab04 = ({form, readOnly}) => (
  <Row gutter={[12]}>
    <Col xs={12}>
      <Form.Item label="Spatial Coverage (Countries)" name="spatial_coverage_country">
        <FormRemoteSelect
          valueField={'id'}
          labelField={'country'}
          mode={'multiple'}
          placeholder={'- Select Countries -'}
          selectAPI={'/v1/authority_list/select/countries/'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Spatial Coverage (Places)" name="spatial_coverage_place">
        <FormRemoteSelectWithEdit
          fieldName={'spatial_coverage_place'}
          form={form}
          valueField={'id'}
          labelField={'place'}
          selectAPI={'/v1/authority_list/select/places/'}
          api={'/v1/authority_list/places/'}
          module={'places'}
          mode={'multiple'}
          placeholder={'- Select Place -'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Subject (People)" name="subject_people">
        <FormRemoteSelectWithEdit
          fieldName={'subject_people'}
          form={form}
          valueField={'id'}
          labelField={'name'}
          selectAPI={'/v1/authority_list/select/people/'}
          api={'/v1/authority_list/people/'}
          module={'people'}
          mode={'multiple'}
          placeholder={'- Select People -'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={12}>
      <Form.Item label="Subject (Corporations)" name="subject_corporation">
        <FormRemoteSelectWithEdit
          fieldName={'subject_corporation'}
          form={form}
          valueField={'id'}
          labelField={'name'}
          selectAPI={'/v1/authority_list/select/corporations/'}
          api={'/v1/authority_list/corporations/'}
          module={'corporations'}
          mode={'multiple'}
          placeholder={'- Select Corporations -'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
    <Col xs={24}>
      <Form.Item label="Keywords" name="subject_keyword">
        <FormRemoteSelectWithEdit
          fieldName={'subject_keyword'}
          form={form}
          valueField={'id'}
          labelField={'keyword'}
          selectAPI={'/v1/controlled_list/select/keywords/'}
          api={'/v1/controlled_list/keywords/'}
          module={'keywords'}
          mode={'multiple'}
          placeholder={'- Select Keywords -'}
          disabled={readOnly}
        />
      </Form.Item>
    </Col>
  </Row>
);

const Tab05 = ({form, locale, readOnly}) => (
  <Row gutter={[12]}>
    <Col xs={12}>
      <Form.Item label={`Note`} name="note">
        <FormFormattedText disabled={readOnly} height={200} style={{marginBottom: 0}}/>
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
        label={renderLabelFlag(locale, 'Note - Original Language')}
        name="note_original"
        style={{marginBottom: 0}}>
        <FormFormattedText disabled={readOnly} height={200} />
      </Form.Item>
      <FormTranslateButton
        form={form}
        mode={'toEnglish'}
        fieldName={'note_original'}
        toField={'note'}
        disabled={readOnly}/>
    </Col>
    <Col xs={24}>
      <Form.Item label={`Internal Note`} name="internal_note">
        <FormFormattedText disabled={readOnly} height={100} />
      </Form.Item>
    </Col>
  </Row>
);

export const FindingAidsEntityForm = ({form, locale, type, initialValues, onActiveTabChange, isTemplate=false}) => {
  const readOnly = type === 'view';

  useEffect(() => {
    onActiveTabChange('basic')
  }, [])

  const onChange = (activeKey) => {
    onActiveTabChange(activeKey)
  }

  let items = [
    {
      key: 'basic',
      label: 'Basic Metadata',
      forceRender: true,
      children: isTemplate ?
          <Tab01Template form={form} locale={locale} readOnly={readOnly} type={type} /> :
          <Tab01 form={form} locale={locale} readOnly={readOnly} type={type} />
    }, {
      key: 'extra',
      label: 'Extra Metadata',
      forceRender: true,
      children: <Tab02 form={form} locale={locale} readOnly={readOnly} />
    }, {
      key: 'contributors',
      label: 'Contributors',
      forceRender: true,
      children: <Tab03 form={form} locale={locale} readOnly={readOnly} />
    }, {
      key: 'subjects',
      label: 'Subjects',
      forceRender: true,
      children: <Tab04 form={form} locale={locale} readOnly={readOnly} />
    }, {
      key: 'notes',
      label: 'Notes',
      forceRender: true,
      children: <Tab05 form={form} locale={locale} readOnly={readOnly}/>
    }
  ]

  const getItems = () => {
    const digitalVersion = {
      key: 'digital_version',
      label: 'Digital Version',
      forceRender: true,
      children: <DigitalVersionTab form={form} initialValues={initialValues} locale={locale} readOnly={readOnly} />
    }

    if (!isTemplate) {
      items.push(digitalVersion)
    }

    return items
  }

  return (
    <React.Fragment>
      <Col xs={24}>
        {
          isTemplate ?
          <IdentifierTemplate form={form} locale={locale} readOnly={readOnly} type={type} initialValues={initialValues}/> :
          <Identifier form={form} locale={locale} readOnly={readOnly} type={type} initialValues={initialValues}/>
        }
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey="basic" items={getItems()} />
      </Col>
    </React.Fragment>
  )
};
