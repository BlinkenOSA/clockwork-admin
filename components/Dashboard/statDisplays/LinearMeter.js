import {useData} from "../../../utils/hooks/useData";
import {Col, Row, Statistic} from "antd";
import React from "react";


const LinearMeter = ({archivalUnitID = 0}) => {
  const { data, loading } = useData(`/v1/dashboard/stats/linear-meter/${archivalUnitID}`);

  return (
    <Row gutter={[10]}>
      <Col span={8}>
        <Statistic title="Extent" value={data ? `${data['linear_meter']} linear meter` : ''} loading={loading}/>
      </Col>
      <Col span={8}>
        <Statistic title="Extent (compared to Fond)" value={data ? `${data['linear_meter_percentage']} %` : ''} loading={loading}/>
      </Col>
      <Col span={8}>
        <Statistic title="Extent (compared to All)" value={data ? `${data['linear_meter_all_pecentage']} %` : ''} loading={loading}/>
      </Col>
    </Row>
  )
};

export default LinearMeter;
