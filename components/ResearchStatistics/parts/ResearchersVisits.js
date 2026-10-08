import {useData} from "../../../utils/hooks/useData";
import {Col, Row, Statistic} from "antd";
import {Line, Pie} from '@ant-design/plots';
import React from "react";

const ResearchersVisits = ({params}) => {
    const { data, loading } = useData(`/v1/research/statistics/researcher-visits`, params);

    const getLineChart = () => {
        const config = {
            data: data['by_month'],
            padding: 'auto',
            xField: 'month',
            yField: 'total',
            color: '#ed8251',
            xAxis: { tickCount: 5 }
        };

        return <Line {...config} />
    }

    return (
        <Row>
            <Col span={12}>
                <Statistic title="Total visits" value={data ? `${data['total_visits']} visits` : ''} loading={loading}/>
            </Col>
            <Col span={12}>
                <Statistic title="Total duration of visits (hours)" value={data ? `${data['total_hours']} hours` : ''}
                           loading={loading}/>
            </Col>

            <Col span={24}>
                <br/>
                <h3>Number of visits per month</h3>
                <br/>
                {data && getLineChart()}
            </Col>
        </Row>

    )
}

export default ResearchersVisits;