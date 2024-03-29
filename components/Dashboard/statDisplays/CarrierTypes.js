import {Col, Row, Spin} from "antd";
import React from "react";
import {useData} from "../../../utils/hooks/useData";
import { Bar } from '@ant-design/plots';
import style from "./StatDisplays.module.css";
import ColorHash from 'color-hash'

const CarrierTypes = ({archivalUnitID = 0}) => {
  const { data, loading } = useData(`/v1/dashboard/stats/carrier-types/${archivalUnitID}`);
  const colorHash = new ColorHash();

  const config = {
    data: data,
    xField: 'total',
    yField: 'type',
    seriesField: 'type',
    color: function color(_ref) {
      const type = _ref.type;
      return colorHash.hex(type);
    },
    legend: false
  };

  return (
    <Row gutter={[10]}>
      <Col span={24}>
        {
          data ?
            <Bar {...config} /> :
            <div className={style.Spin}>
              <Spin size="large" />
            </div>
        }
      </Col>
    </Row>
  );
};

export default CarrierTypes;
