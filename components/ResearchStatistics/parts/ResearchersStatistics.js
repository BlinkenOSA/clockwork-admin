import {useData} from "../../../utils/hooks/useData";
import {Col, Row, Statistic} from "antd";
import {Line, Pie} from '@ant-design/plots';
import React from "react";

const ResearchersStatistics = ({params}) => {
    const { data, loading } = useData(`/v1/research/statistics/researcher-registration`, params);

    const getOccupationChart = () => {
        const getData = () => {
            const getOccupationName = (name) => {
                switch (name) {
                    case 'ceu':
                        return 'CEU (General)';
                    case 'ceu_faculty':
                        return 'CEU Faculty';
                    case 'ceu_student':
                        return 'CEU Student';
                    case 'other':
                        return 'Other';
                    default:
                        return name;
                }
            }

            return data['by_occupation'].map(item => {
                return {
                    type: getOccupationName(item['occupation']),
                    value: item['total']
                }
            })
        }

        const config = {
            appendPadding: 10,
            data: data ? getData() : [],
            angleField: 'value',
            colorField: 'type',
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
            },
        };
        return <Pie {...config} />;
    }

    const getLineChart = () => {
        const config = {
            data: data['by_month'],
            padding: 'auto',
            xField: 'month',
            yField: 'total',
            color: '#44be24',
            xAxis: { tickCount: 5 }
        };

        return <Line {...config} />
    }

    return (
        <Row gutter={[24]}>
            <Col md={12}>
                <h3>Newly registered researchers by occupation</h3>
                <br/>
                {data && getOccupationChart()}
            </Col>
            <Col md={12}>
                <h3>Monthly newly registered researchers</h3>
                <br/>
                {data && getLineChart()}
            </Col>
        </Row>
    )
}

export default ResearchersStatistics;