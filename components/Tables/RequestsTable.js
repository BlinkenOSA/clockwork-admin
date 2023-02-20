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
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";
import moment from "moment";
import {PopupForm} from "../Forms/PopupForm";
import _ from 'lodash';
import Link from "next/link";

const ORIGIN = {
  'FA': 'Archival',
  'L': 'Library',
  'FL': 'Film Library'
}

const ResearchersTable = ({...props}) => {
  const { data, loading, refresh , tableState,
    handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable('isad', `/v1/research/requests`);

  const [drawerShown, setDrawerShown] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(undefined);

  const columns = [
    {
      title: 'Request Date',
      dataIndex: 'request_date',
      key: 'request__request_date',
      width: 100,
      render: (data) => renderDate(data) ,
      sorter: false,
    }, {
      title: 'Identifier',
      key: 'archival_reference_number',
      width: 130,
      render: (record) => renderIdentifier(record),
      sorter: false,
    }, {
      title: 'MLR',
      key: 'mlr',
      width: 150,
      render: (record) => renderMLR(record),
      sorter: false,
    }, {
      title: 'Researcher',
      dataIndex: 'researcher',
      key: 'researcher',
      width: 100,
      sorter: false,
    }, {
      title: 'Origin',
      key: 'item_origin',
      width: 80,
      render: (record) => renderOrigin(record),
      sorter: false,
    }, {
      title: 'Carrier Type',
      dataIndex: 'carrier_type',
      key: 'carrier_type',
      width: 100,
      sorter: false,
    }, {
      title: 'Status',
      key: 'status',
      width: 120,
      className: style.ActionColumn,
      render: (record) => renderStatus(record),
      sorter: false,
    }, {
      key: 'actions',
      title: 'Actions',
      width: 60,
      className: style.ActionColumn,
      render: (record) => renderActions(record)
    }
  ];

  useEffect(() => {
    if (data) {
      handleDataChange(data.count)
    }
  }, [data]);

  const renderDate = (data) => {
    return (moment(data).format('YYYY-MM-DD, dddd'))
  }

  const renderIdentifier = (record) => {
    if (record['item_origin'] === 'FA') {
      return record['archival_reference_number']
    } else {
      return record['identifier']
    }
  }

  const renderOrigin = (record) => {
    if (record['has_digital_version']) {
      return `${ORIGIN[record['item_origin']]} (Digital)`
    } else {
      return ORIGIN[record['item_origin']]
    }

  }

  const renderActions = (record) => {
    const detectDisabled = () => {
      return record['status'] !== '1' && record['status'] !== '2'
    }

    return (
      <Button.Group>
        <Tooltip key={'edit'} title={'Edit'}>
          <Button
            size="small"
            icon={<EditOutlined/>}
            disabled={detectDisabled()}
            onClick={() => {
              setSelectedRecord(record.id)
              setDrawerShown(true)
            }}/>
        </Tooltip>
        <Tooltip key={'delete'} title={'Delete'}>
          <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.id)}/>
        </Tooltip>
      </Button.Group>
    )
  }

  const onStatusChange = (action, id) => {
    put(`/v1/research/requests/${action}/${id}/`).then(() => {
      refresh();
    })
  }

  const renderMLR = (record) => {
    if (record['has_digital_version']) {
      return (
        <div>
          <div>{record['mlr']}</div>
          <Badge count={record['digital_version_barcode']} style={{ backgroundColor: '#e06d3c', borderRadius: '3px', fontSize: '0.8em' }} />
        </div>
      )
    }
    return record['mlr']
  }

  const renderStatus = (record) => {
    const generateBadges = (badgeText, color, withUndo=true) => {
      return (
        <div className={style.BadgeWithUndoButton}>
          <div onClick={() => onStatusChange('next', record['id'])} className={style.Badge}>
            <Badge count={badgeText} style={{ backgroundColor: color, borderRadius: '3px', fontSize: '0.8em' }} />
          </div>
          {
            withUndo &&
            <Tooltip title={'Undo'}>
              <div onClick={() => onStatusChange('previous', record['id'])}>
                <Button size="small" icon={<UndoOutlined/>} className={style.UndoButton}/>
              </div>
            </Tooltip>
          }
        </div>
      );
    }

    switch (record['status']) {
      case '1':
        return (generateBadges('In Queue', '#ba3300', false));
      case '2':
        return (generateBadges('Pending', '#fa8c16'));
      case '3':
        return (generateBadges('Delivered', 'rgba(45,184,227,0.66)'));
      case '4':
        return (generateBadges('Returned', '#83c04d'));
      case '5':
        return (generateBadges('Reshelved', '#376e18', false));
      case '9':
        return (generateBadges('Served', '#223f00', false));
      default:
        break;
    }
  }

  const onDelete = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to delete this request?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        remove(`/v1/research/request_item/${id}/`).then(() => {
          handleDelete(data.length);
          deleteAlert();
          refresh();
        })
      }
    });
  };

  const onClose = () => {
    refresh();
    setDrawerShown(false);
  }

  const getFooter = () => {
    return (
      <Row gutter={12}>
        <Col span={16}>
          <a href={'/researchers-db/requests/create'}>
            <Button type={'primary'}>
              <PlusOutlined />
              Create Request
            </Button>
          </a>
          <a href={'/researchers-db/requests/print'} target={'_blank'} style={{marginLeft: '10px'}}>
            <Button type={'default'}>
              <PrinterOutlined />
              Print Requests
            </Button>
          </a>
        </Col>
      </Row>
    )
  }

  return (
    <React.Fragment>
      <TableFilters module={'requests'} onFilterChange={handleFilterChange}/>
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
        footer={() => getFooter()}
        pagination={tableState['pagination']}
        onChange={handleTableChange}
      />
      <Drawer
        title={_.capitalize('edit')}
        width={'50%'}
        onClose={(e) => onClose()}
        open={drawerShown}
        destroyOnClose={true}
      >
        <PopupForm
          api={`/v1/research/request_item/`}
          label={'Request Item'}
          selectedRecord={selectedRecord}
          module={'request_item'}
          type={'edit'}
          onClose={onClose}
        />
      </Drawer>
    </React.Fragment>
  )
};

export default ResearchersTable;
