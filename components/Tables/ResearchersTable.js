import {Button, Modal, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, LoadingOutlined, ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.css';
import {put, remove} from "../../utils/api";
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";
import Link from "next/link";

const ResearchersTable = ({...props}) => {
  const { params, tableState, handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable('isad');
  const { data, loading, refresh} = useData(`/v1/research/`, params);

  const [publishing, setPublishing] = useState({});

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      sorter: true,
    }, {
      title: 'Card No.',
      dataIndex: 'card_number',
      key: 'card_number',
      width: 100,
      sorter: false,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      sorter: false,
    }, {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      sorter: false,
    }, {
      title: 'Created',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 150,
      sorter: false,
    }, {
      key: 'crud',
      title: 'Create/Edit/Delete',
      width: 150,
      className: style.ActionColumn,
      render: (record) => renderActionButtons(record)
    },
  ];

  useEffect(() => {
    if (data) {
      handleDataChange(data.count)
    }
  }, [data]);

  const renderActionButtons = (record) => {
    return (
      <Button.Group>
        <Link href={`/researchers-db/researchers/view/${record.id}`}>
          <Tooltip key={'view'} title={'View'}>
            <Button size="small" icon={<EyeOutlined/>}/>
          </Tooltip>
        </Link>
        <Link href={`/researchers-db/researchers/edit/${record.id}`}>
          <Tooltip key={'edit'} title={'Edit'}>
            <Button size="small" icon={<EditOutlined/>}/>
          </Tooltip>
        </Link>
        {
          record.is_removable &&
          <Tooltip key={'delete'} title={'Delete'}>
            <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.id)}/>
          </Tooltip>
        }
      </Button.Group>
    )
  };

  const renderStatusButtons = (record) => {
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
        remove(`/v1//researchers-db/researchers/${id}/`).then(() => {
          handleDelete(data.length);
          deleteAlert();
          refresh();
        })
      }
    });
  };

  return (
    <React.Fragment>
      <TableFilters module={'researchers'} onFilterChange={handleFilterChange}/>
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

export default ResearchersTable;
