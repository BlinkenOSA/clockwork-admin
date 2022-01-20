import style from "../Forms/Forms.module.css";
import {Row, Col, Form, Divider} from "antd";
import FormRemoteSelect from "../Forms/components/FormRemoteSelect";
import React, {useState} from "react";
import {renderArchivalUnitDropdown} from "../../utils/renders/renderArchivalUnitDropdown";
import FoldersItems from "./statDisplays/FoldersItems";
import LinearMeter from "./statDisplays/LinearMeter";
import dynamic from "next/dynamic";

const CarrierTypes = dynamic(
  () => import('./statDisplays/CarrierTypes'),
  { ssr: false }
);

const DashboardContentStats = () => {
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

  const getArchivalUnit = () => {
    if (series) {
      return series
    } else {
      if (subfonds) {
        return subfonds
      } else {
        return fonds
      }
    }
  };

  return (
    <React.Fragment>
      <Form
        name={`dashboard-select-archival-unit`}
        scrollToFirstError={true}
        form={form}
        onValuesChange={onValuesChange}
        layout={'vertical'}
        className={style.Form}
      >
        <Row>
          <Col xs={24}>
            <Form.Item name="fonds" required>
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
        </Row>
        <Row gutter={[10]}>
          <Col xs={12}>
            <Form.Item name="subfonds" required>
              <FormRemoteSelect
                valueField={'id'}
                labelField={'title_full'}
                renderFunction={renderArchivalUnitDropdown}
                selectAPI={fonds ? `/v1/archival_unit/select/${fonds}/` : undefined}
                placeholder={'- Select Subfonds -'}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="series" required>
              <FormRemoteSelect
                valueField={'id'}
                labelField={'title_full'}
                renderFunction={(data) => renderArchivalUnitDropdown(data, false)}
                selectAPI={subfonds ? `/v1/archival_unit/select/${subfonds}/` : undefined}
                placeholder={'- Select Series -'}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider style={{margin: '5px 0px 10px 0px'}}/>
      <div>
        <LinearMeter archivalUnitID={getArchivalUnit()} />
        <FoldersItems archivalUnitID={getArchivalUnit()} />
        <Divider style={{margin: '10px 0px'}}/>
        <CarrierTypes archivalUnitID={getArchivalUnit()} />
      </div>
    </React.Fragment>
  )
};

export default DashboardContentStats;
