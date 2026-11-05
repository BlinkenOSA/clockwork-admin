import {useData} from "../../../utils/hooks/useData";
import {Col, Row, Statistic, Table} from "antd";
import {Bar, Line, Pie} from '@ant-design/plots';
import React from "react";

const PopularCollections = ({params}) => {
    const { data, loading } = useData(`/v1/research/statistics/requested-materials/archival-units`, params);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'No. of requests',
            dataIndex: 'total',
            key: 'total',
            width: 130
        },
    ];

    return (
        <Row gutter={[24]}>
            <Col span={24}>
                <h3>Most popular collections by request</h3>
                {data &&
                    <Table
                        bordered={true}
                        loading={loading}
                        size={'small'}
                        pagination={false}
                        dataSource={data['archival_units']}
                        columns={columns}
                    />
                }
            </Col>
        </Row>
    )
}

export default PopularCollections;