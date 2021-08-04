import {Col, Row} from "antd";
import React from "react";
import {useData} from "../../../utils/hooks/useData";
import { Area } from '@ant-design/charts';
import Spin from "antd/es/spin";
import style from './AnalyticsDisplays.module.css';

const Totals = () => {
  const { data, loading } = useData(`/v1/dashboard/analytics/totals/`);

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
            <Area {...config} /> :
            <div className={style.Spin}>
              <Spin size="large" />
            </div>
        }
      </Col>
    </Row>
  );
};

export default Totals;
