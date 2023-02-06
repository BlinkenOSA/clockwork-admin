import {Button, Modal, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, LoadingOutlined, ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.scss';
import {put, remove} from "../../utils/api";
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";
import {renderArchivalUnit} from "../../utils/renders/renderArchivalUnit";
import {renderStatus} from "../../utils/renders/renderStatus";
import Link from "next/link";

const ISADTable = ({...props}) => {
  const { params, tableState, handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable('isad');
  const { data, loading, refresh} = useData(`/v1/isad/`, params);

  const [publishing, setPublishing] = useState({});

  const columns = [
    {
      title: 'Reference Code',
      dataIndex: 'reference_code',
      key: 'reference_code',
      render: renderArchivalUnit,
      sorter: true,
      ellipsis: true
    }, {
      key: 'crud',
      title: 'Create/Edit/Delete',
      width: 150,
      className: style.ActionColumn,
      render: (record) => renderCRUDButtons(record)
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: renderStatus,
      className: 'centerColumn',
      width: 100
    }, {
      key: 'actions',
      title: 'Actions',
      width: 100,
      className: style.ActionColumn,
      render: (record) => renderPublishButtons(record)
    }
  ];

  useEffect(() => {
    if (data) {
      handleDataChange(data.count)
    }
  }, [data]);

  const renderCRUDButtons = (record) => {
    if (record.status === 'Not exists') {
      return (
        <Link href={`/isad/create/${record.id}`}>
          <Tooltip key={'create'} title={'Create'}>
            <Button size="small" icon={<PlusOutlined/>}/>
          </Tooltip>
        </Link>
      )
    } else {
      return (
        <Button.Group>
          <Link href={`/isad/view/${record.isad}`}>
            <Tooltip key={'view'} title={'View'}>
              <Button size="small" icon={<EyeOutlined/>}/>
            </Tooltip>
          </Link>
          <Link href={`/isad/edit/${record.isad}`}>
            <Tooltip key={'edit'} title={'Edit'}>
              <Button size="small" icon={<EditOutlined/>}/>
            </Tooltip>
          </Link>
          {
            record.is_removable &&
            <Tooltip key={'delete'} title={'Delete'}>
              <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.isad)}/>
            </Tooltip>
          }
        </Button.Group>
      )
    }
  };

  const renderPublishButtons = (record) => {
    switch (record.status) {
      case 'Published':
        return (
          <Tooltip key={'unplublish'} title={'Unpublish'}>
            <Button
              size="small"
              icon={<ArrowDownOutlined />}
              loading={publishing.hasOwnProperty(record.isad) ? publishing[record.isad] : false}
              onClick={() => onPublish('unpublish', record.isad)}
            />
          </Tooltip>
        );
      case 'Draft':
        return (
          <Tooltip key={'publish'} title={'Publish'}>
            <Button
              size="small"
              icon={<ArrowUpOutlined />}
              loading={publishing.hasOwnProperty(record.isad) ? publishing[record.isad] : false}
              onClick={() => onPublish('publish', record.isad)}
            />
          </Tooltip>
        );
      default:
        break;
    }
  };

  const onPublish = (action, id) => {
    const { confirm } = Modal;

    confirm({
      title: `Are you sure you would like to ${action} this record?`,
      okText: 'Yes',
      okType: 'warning',
      cancelText: 'No',
      onOk() {
        setPublishing({[id]: true});
        put(`/v1/isad/${action}/${id}/`).then(() => {
          refresh();
          setPublishing({[id]: false});
        })
      }
    });
  };

  const onDelete = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        remove(`/v1/isad/${id}/`).then(() => {
          handleDelete(data.length);
          deleteAlert();
          refresh();
        })
      }
    });
  };

  return (
    <React.Fragment>
      <TableFilters module={'isad'} onFilterChange={handleFilterChange}/>
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
