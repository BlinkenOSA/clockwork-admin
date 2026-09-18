import {useData} from "../../../utils/hooks/useData";
import {Col, Row, Statistic} from "antd";
import {Bar, Line, Pie} from '@ant-design/plots';
import React from "react";

const RequestsOrigin = ({params}) => {
    const { data, loading } = useData(`/v1/research/statistics/requested-materials/origin`, params);

    const config = {
        appendPadding: 10,
        data: data ? data['by_item_origin'] : [],
        angleField: 'total',
        colorField: 'item_origin',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: data ? `${data['total']}` : '',
            },
        }
    };

    return <Pie {...config} />;
}

const RequestsCarrierType = ({params}) => {
    const { data, loading } = useData(`/v1/research/statistics/requested-materials/carrier-type`, params);

    const config = {
        data: data ? data['by_carrier_type'] : [],
        xField: 'total',
        yField: 'carrier_type',
        seriesField: 'carrier_type',
        legend: false,
    };
    return <Bar {...config} />;
}

const ResearchersRequests = ({params}) => {
    return (
        <Row gutter={[20]}>
            <Col span={12}>
                <h3>Requests by item origin</h3>
                <br/>
                <RequestsOrigin params={params} />
            </Col>
            <Col span={12}>
                <h3>Requests by carrier type</h3>
                <br/>
                <RequestsCarrierType params={params}/>
            </Col>
        </Row>

    )
}

export default ResearchersRequests;