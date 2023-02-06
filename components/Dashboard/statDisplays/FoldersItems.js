import {useData} from "../../../utils/hooks/useData";
import {Col, Row, Statistic} from "antd";
import React from "react";

const FoldersItems = ({archivalUnitID = 0}) => {
  const { data, loading } = useData(`/v1/dashboard/stats/folders-items/${archivalUnitID}`);

  return (
    <Row gutter={[10]} style={{marginTop: '20px'}}>
      <Col span={8}>
        <Statistic title="Folders/Items" value={data ? `${data['total_items']} records` : ''} loading={loading}/>
      </Col>
      <Col span={8}>
        <Statistic title="Folders/Items (Published)" value={data ? `${data['published_items']} records` : ''} loading={loading}/>
      </Col>
      <Col span={8}>
        <Statistic title="Published records percentage" value={data ? `${data['published_items_percentage']} %` : ''} loading={loading}/>
      </Col>
    </Row>
  )
};

export default FoldersItems;
