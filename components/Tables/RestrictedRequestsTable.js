import {Badge, Button, Popconfirm, Popover, Table, Tooltip} from "antd";
import React, {useEffect} from "react";
import {
  CheckOutlined, CloseOutlined, FileProtectOutlined, InfoCircleOutlined, CheckSquareOutlined
} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.scss';
import {useTable} from "../../utils/hooks/useTable";
import moment from "moment";
import {AiOutlineLoading} from "react-icons/ai";
import {put} from "../../utils/api";

const STATUS = {
  'new': 'New',
  'approved': 'Approved',
  'rejected': 'Rejected',
  'lifted': 'Lifted',
  'approved_on_site': 'Approved for on-site'
}

const RestrictedRequestsTable = ({...props}) => {
  const { data, loading, refresh , tableState,
    handleDataChange, handleTableChange, handleExpandedRowsChange, handleFilterChange } = useTable('restricted-requests', `/v1/research/restricted-requests`);

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
      width: 200,
      sorter: true,
    }, {
      title: 'View',
      key: 'view',
      width: 100,
      sorter: false,
      render: (record) => renderView(record)
    }, {
      title: 'Researcher',
      key: 'request_item__request__researcher__last_name',
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
    }, {
      title: 'Info',
      width: 50,
      className: style.ActionColumn,
      render: (data) => renderInfo(data),
    }, {
      title: 'Actions',
      width: 100,
      className: style.ActionColumn,
      render: (data) => renderActions(data),
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
        case 'approved_on_site':
          return '#4dc098';
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

  const onAccept = (record) => {
    put(`/v1/research/restricted-requests/approve/${record.id}/`).then(() => {
        refresh();
    })
  }

  const onAcceptOnSite = (record) => {
    put(`/v1/research/restricted-requests/approve_on_site/${record.id}/`).then(() => {
      refresh();
    })
  }

  const onReject = (record) => {
      put(`/v1/research/restricted-requests/reject/${record.id}/`).then(() => {
          refresh();
      })
  }

  const onLift = (record) => {
      put(`/v1/research/restricted-requests/lift/${record.id}/`).then(() => {
          refresh();
      })
  }

  const renderActions = (record) => {
    return (
        <Button.Group>
            <Tooltip key={'approve'} title={'Approve'}>
              <Popconfirm
                  title={<span>Are you sure you would like to <strong>approve access</strong> for this item<br/>but keep it's restricted status?</span>}
                  icon={<CheckOutlined style={{color: '#83c04d'}} />}
                  onConfirm={() => onAccept(record)}
                  okText="Yes"
                  cancelText="No"
                  placement="left"
              >
                <Button size="small" icon={<CheckOutlined />}/>
              </Popconfirm>
            </Tooltip>
            <Tooltip key={'approve_on_site'} title={'Approve for on-site'}>
              <Popconfirm
                title={<span>Are you sure you would like to <strong>approve access for <u>on-site viewing</u></strong> for this item<br/>but keep it's restricted status?</span>}
                icon={<CheckSquareOutlined style={{color: '#83c04d'}} />}
                onConfirm={() => onAcceptOnSite(record)}
                okText="Yes"
                cancelText="No"
                placement="left"
              >
                <Button size="small" icon={<CheckSquareOutlined />}/>
              </Popconfirm>
            </Tooltip>
            <Tooltip key={'reject'} title={'Reject'}>
                <Popconfirm
                    title={<span>Are you sure you would like to <strong>reject access</strong> for this item<br/>but keep it's restricted status?</span>}
                    icon={<CloseOutlined style={{color: '#e06d3c'}} />}
                    onConfirm={() => onReject(record)}
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                >
                    <Button size="small" icon={<CloseOutlined />}/>
                </Popconfirm>
            </Tooltip>
            <Tooltip key={'lift'} title={'Lift'}>
                <Popconfirm
                    title={<span>Are you sure you would like to <strong>lift the restriction permanently</strong> for this item?</span>}
                    icon={<FileProtectOutlined style={{color: '#223f00'}} />}
                    onConfirm={() => onLift(record)}
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                >
                    <Button size="small" icon={<FileProtectOutlined />} />
                </Popconfirm>
            </Tooltip>
        </Button.Group>
    )
  }

  const renderView = (record) => {
    return (
        <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
          <a href={`https://catalog.archivum.org/catalog/${record['catalog_link']}`}
             target={'_blank'} style={{color: "black"}}>
            <div className={style.CatalogLink}>Catalog</div>
          </a>
          <div style={{fontSize: '12px'}}>|</div>
          <a href={`/finding_aids/entities/edit/${record['finding_aids_entity']}`}
             target={'_blank'} style={{color: "black"}}>
            <div className={style.CatalogLink}>AMS</div>
          </a>
        </div>
    )
  }

  const renderInfo = (record) => {
    const content = (
        <div>
          <div style={{marginBottom: '10px'}}>
            <strong>Research Subject:</strong><br/>
            {record['research_subject']}
          </div>
          <div>
            <strong>Motivation:</strong><br/>
            {record['motivation']}
          </div>
        </div>
    )

    return (
        <Popover content={content} title="Research Data" trigger="hover">
          <InfoCircleOutlined />
        </Popover>
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
