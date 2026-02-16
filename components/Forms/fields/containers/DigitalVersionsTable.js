import {Button, Table} from "antd";
import ResearchCloudLink from "../finding_aids/ResearchCloudLink";
import style from "./DigitalVersionsTable.module.scss";

const DigitalVersionsTable = ({digitalVersions}) => {
    const renderLevel = (text, record) => {
        switch (text) {
            case 'A':
                return 'Access Copy';
            case 'M':
                return 'Master';
        }
    }

    const renderAvailability = (text, record) => {
        switch (record['level']) {
            case 'A':
                if (record['available_research_cloud']) {
                    return (
                        <div className={style.Availability}>
                            <ResearchCloudLink path={record['research_cloud_path']} buttonText={'In Research Cloud'}/>
                        </div>
                    )
                }

                if (record['available_online']) {
                    return (
                        <div className={style.Availability}>
                            <Button size={'small'}>In the Catalog</Button>
                        </div>
                    )
                }

                return (
                    <div className={style.Availability}>
                        <Button size={'small'}>On the network drive</Button>
                    </div>
                )
            case 'M':
                const physical_copies = record['physical_copies'];

                return (
                    <div className={style.Availability}>
                        { physical_copies.map((physical_copy, index) => (
                            <div key={index} className={style.AvailabilityRow}>
                                <div className={style.StorageUnit}>
                                    {physical_copy['storage_unit']}
                                </div>
                                <div className={style.StorageLabel}>
                                    {physical_copy['storage_unit_label']}
                                </div>
                            </div>
                        ))}
                    </div>
                )


        }
    }

    const columns = [
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: renderLevel,
            filters: [
                { text: 'Master', value: 'M' },
                { text: 'Access Copy', value: 'A' }
            ],
            onFilter: (value, record) => record.level.indexOf(value) === 0,
            width: 150,
        }, {
            title: 'Filename',
            dataIndex: 'filename',
            key: 'filename',
            width: 250,
        }, {
            title: 'Available',
            dataIndex: 'available',
            key: 'available',
            render: renderAvailability,
        }
    ]

    return (
        <Table
            bordered={true}
            rowKey={record => record.id}
            dataSource={digitalVersions}
            columns={columns}
            size={'small'}
            pagination={false}
        />
    )
}

export default DigitalVersionsTable;