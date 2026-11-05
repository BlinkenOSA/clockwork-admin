import {Button, Modal, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {
    LoadingOutlined,
    CloseCircleOutlined
} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.scss';
import {put, remove} from "../../utils/api";
import {useTable} from "../../utils/hooks/useTable";
import {renderArchivalUnitReferenceCode} from "../../utils/renders/renderArchivalUnitReferenceCode";

const ISADTable = ({...props}) => {
    const { data, loading, refresh, tableState,
        handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable(
            'finding_aids',
        `/v1/finding_aids/missing/`);

    const [missingLoading, setMissingLoading] = useState(false);

    useEffect(() => {
        if (data) {
            handleDataChange(data.count)
        }
    }, [data]);

    const onSetNotMissing = (id) => {
        confirm({
            title: `Are you sure you would like to set the missing status of the record?`,
            okText: 'Yes',
            okType: 'warning',
            cancelText: 'No',
            onOk() {
                setMissingLoading(true);
                put(`/v1/finding_aids/set_non_missing/${id}/`).then(() => {
                    refresh();
                    setMissingLoading(false);
                })
            }
        });
    }

    const renderMissingButton = (record) => {
        return (
            <Tooltip title={'Set non missing'}>
                <Button
                    size="small"
                    className={style.ButtonMissing}
                    loading={missingLoading}
                    onClick={() => {onSetNotMissing(record.id)}}
                    icon={<CloseCircleOutlined />}
                />
            </Tooltip>
        );
    };

    const columns = [
        {
            title: 'Archival Reference Code',
            dataIndex: 'archival_reference_code',
            key: 'archival_reference_code',
            sorter: false,
            render: renderArchivalUnitReferenceCode,
            width: 250
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: false,
        }, {
            key: 'actions',
            title: 'Actions',
            width: 150,
            className: style.ActionColumn,
            render: (record) => renderMissingButton(record)
        },
    ]

    return (
        <React.Fragment>
            <TableFilters
                module={'finding-aids-missing'}
                onFilterChange={handleFilterChange}
                filters={tableState['filters']}
            />
            <Table
                bordered={true}
                className={style.Table}
                rowKey={record => record.id}
                dataSource={data ? data.results : []}
                columns={columns}
                size={'small'}
                loading={{
                    spinning: loading,
                    indicator: <LoadingOutlined/>,
                }}
                pagination={tableState['pagination']}
                onChange={handleTableChange}
            />
        </React.Fragment>
    )
};

export default ISADTable;
