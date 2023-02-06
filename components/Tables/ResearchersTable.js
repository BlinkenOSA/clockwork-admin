import {Badge, Button, Col, Modal, Row, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  PlusOutlined, PrinterOutlined
} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.scss';
import {put, remove} from "../../utils/api";
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";
import Link from "next/link";

const ResearchersTable = ({...props}) => {
  const { params, tableState, handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable('isad');
  const { data, loading, refresh} = useData(`/v1/research/researcher`, params);

  const [publishing, setPublishing] = useState({});

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'last_name',
      width: 200,
      sorter: true,
    }, {
      title: 'Card No.',
      dataIndex: 'card_number',
      key: 'card_number',
      width: 120,
      sorter: true,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      sorter: false,
    }, {
      title: 'Country',
      dataIndex: 'country',
      key: 'country__country',
      sorter: true,
    }, {
      title: 'Citizenship',
      dataIndex: 'citizenship',
      key: 'citizenship__nationality',
      sorter: true,
    }, {
      title: 'Created',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 150,
      sorter: true,
    }, {
      key: 'crud',
      title: 'Create/Edit/Delete',
      width: 150,
      className: style.ActionColumn,
      render: (record) => renderActionButtons(record)
    }, {
      key: 'status',
      title: 'Status',
      className: 'centerColumn',
      render: (record) => renderStatus(record),
      width: 190
    }
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

  const onAction = (action, id) => {
    const { confirm } = Modal;

    confirm({
      title: `Are you sure you would like to ${action} this record?`,
      okText: 'Yes',
      okType: 'warning',
      cancelText: 'No',
      onOk() {
        setPublishing({[id]: true});
        put(`/v1/research/researcher/${action}/${id}/`).then(() => {
          refresh();
          setPublishing({[id]: false});
        })
      }
    });
  };

  const renderResearcherApprovedStatus = (record) => {
    switch (record.approved) {
      case true:
        return (
          <div onClick={() => onAction('disapprove', record.id)} className={style.ResearcherStatusButton}>
            <Badge count={'Approved'} style={{ backgroundColor: '#376e18', borderRadius: '3px', fontSize: '0.8em' }} />
          </div>
        );
      case false:
        return (
          <div onClick={() => onAction('approve', record.id)} className={style.ResearcherStatusButton}>
            <Badge count={'Not Approved'} style={{ backgroundColor: '#fa8c16', borderRadius: '3px', fontSize: '0.8em' }} />
          </div>
        );
      default:
        break;
    }
  };


  const renderResearcherActiveStatus = (record) => {
    switch (record.active) {
      case true:
        return (
          <div onClick={() => onAction('deactivate', record.id)} className={style.ResearcherStatusButton}>
            <Badge count={'Active'} style={{ backgroundColor: '#376e18', borderRadius: '3px', fontSize: '0.8em' }} />
          </div>
        );
      case false:
        return (
          <div onClick={() => onAction('activate', record.id)} className={style.ResearcherStatusButton}>
            <Badge count={'Not Active'} style={{ backgroundColor: '#ba3300', borderRadius: '3px', fontSize: '0.8em' }} />
          </div>
        );
      default:
        break;
    }
  };

  const renderStatus = (record) => {
    return (
      <div className={style.ResearcherStatus}>
        {renderResearcherApprovedStatus(record)}
        {renderResearcherActiveStatus(record)}
      </div>
    )
  }

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

  const getFooter = () => {
    return (
      <Row gutter={12}>
        <Col span={16}>
          <a href={'/researchers-db/researchers/create'}>
            <Button type={'primary'}>
              <PlusOutlined />
              New Researcher
            </Button>
          </a>
        </Col>
      </Row>
    )
  }

  return (
    <React.Fragment>
      <TableFilters module={'researcher'} onFilterChange={handleFilterChange}/>
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
        footer={() => getFooter()}
      />
    </React.Fragment>
  )
};

export default ResearchersTable;
