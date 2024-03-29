import {Col, Row, Spin} from "antd";
import React from "react";
import {useData} from "../../../utils/hooks/useData";
import { Line } from '@ant-design/plots';
import style from './AnalyticsDisplays.module.css';

const Activity = () => {
  const { data, loading } = useData(`/v1/dashboard/analytics/activity/`);

  const config = {
    data: data,
    padding: 'auto',
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    xAxis: { tickCount: 5 },
    slider: {
      start: 0,
      end: 1,
    },
  };

  return (
    <Row gutter={[10]}>
      <Col span={24}>
        {
          data ?
            <Line {...config} /> :
            <div className={style.Spin}>
              <Spin size="large" />
            </div>
        }
      </Col>
    </Row>
  );
};

export default Activity;
