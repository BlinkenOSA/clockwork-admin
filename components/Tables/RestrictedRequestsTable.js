import {Badge, Button, Col, Drawer, Modal, Row, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {
  PlusOutlined,
  PrinterOutlined,
  UndoOutlined,
  LoadingOutlined, EyeOutlined, EditOutlined, DeleteOutlined,
} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.scss';
import {put, remove} from "../../utils/api";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";
import moment from "moment";
import {PopupForm} from "../Forms/PopupForm";
import _ from 'lodash';
import {AiOutlineLoading} from "react-icons/ai";
import LibraryMLRInfo from "./components/LibraryMLRInfo";


const STATUS = {
  'new': 'New',
  'approved': 'Approved',
  'rejected': 'Rejected',
  'lifted': 'Lifted'
}

const RestrictedRequestsTable = ({...props}) => {
  const { data, loading, refresh , tableState,
    handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable('restricted-requests', `/v1/research/restricted-requests`);

  useEffect(() => {
    if (data) {
      handleDataChange(data.count)
    }
  }, [data]);

  const columns = [
    {
      title: 'Reference Code',
      dataIndex: 'reference_code',
      key: 'request_item__container__archival_unit__reference_code',
      sorter: true,
    }, {
      title: 'Researcher',
      key: 'request_item__request__researcher__last_name',
      width: 150,
      render: (record) => renderResearcher(record),
      sorter: true,
    }, {
      title: 'Request Date',
      dataIndex: 'request_date',
      key: 'request_item__request__request_date',
      render: (data) => renderDate(data) ,
      sorter: true,
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      className: style.ActionColumn,
      render: (data) => renderStatus(data),
      sorter: true,
    }
  ];

  const renderDate = (data) => {
    return (moment(data).format('YYYY-MM-DD, dddd'))
  }

  const renderStatus = (data) => {
    const getColor = () => {
      switch (data) {
        case 'new':
          return '#e03c3c';
        case 'approved':
          return '#83c04d';
        case 'rejected':
          return '#e06d3c';
        case 'lifted':
          return '#223f00';
      }
    }

    return (
        <Badge count={STATUS[data]} style={{ backgroundColor: getColor(), borderRadius: '3px', fontSize: '0.8em' }} />
    )
  }

  const renderResearcher = (record) => {
    if (record['researcher_email']) {
      return (
          <>
            <div>{record['researcher']}</div>
            <div className={style.Italic}>{record['researcher_email']}</div>
          </>
      )
    } else {
      return record['researcher']
    }
  }

  return (
    <React.Fragment>
      <TableFilters
        module={'restricted-requests'}
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
          indicator: <AiOutlineLoading/>,
        }}
        pagination={tableState['pagination']}
        onChange={handleTableChange}
      />
    </React.Fragment>
  )
};

export default RestrictedRequestsTable;
