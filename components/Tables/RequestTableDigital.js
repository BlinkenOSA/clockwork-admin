import {Alert, Badge, Button, Col, Drawer, Modal, Progress, Row, Table, Tooltip, message} from "antd";
import React, {useEffect, useState} from "react";
import {
  PlusOutlined,
  PrinterOutlined,
  UndoOutlined,
  EditOutlined,
  DeleteOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.scss';
import {get, post, put, remove} from "../../utils/api";
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
  'lifted': 'Lifted',
  'approved_on_site': 'Approved for on-site viewing'
}

const SHARE_JOB_STEP_LABELS = {
  pending: 'Pending',
  checking_files: 'Checking files',
  creating_directory: 'Creating directory',
  copying_files: 'Copying files',
  sharing_directory: 'Sharing directory',
  sending_notifications: 'Sending notifications',
  completed: 'Completed',
  failed: 'Failed',
}

const RequestTableDigital = () => {
  const { data, loading, refresh , tableState,
    handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable('requests', '/v1/research/requests/digital');

  const [drawerShown, setDrawerShown] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(undefined);
  const [shareJob, setShareJob] = useState(undefined);
  const [shareJobsByItem, setShareJobsByItem] = useState({});
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareStartingId, setShareStartingId] = useState(undefined);

  const shareJobFinished = shareJob && ['completed', 'failed'].includes(shareJob.status);

  const columns = [
    {
      title: 'Planned Visit',
      dataIndex: 'request_date',
      key: 'request__request_date',
      width: 120,
      render: (data) => renderDate(data),
      sorter: true,
    }, {
      title: 'Identifier',
      key: 'ordering',
      width: 130,
      render: (record) => renderIdentifier(record),
      sorter: true,
    }, {
      title: 'Folders / Items',
      key: 'parts',
      width: 130,
      render: (record) => renderFoldersItems(record),
      sorter: false,
    }, {
      title: 'MLR',
      key: 'mlr',
      width: 130,
      render: (record) => renderMLR(record),
      sorter: false,
    }, {
      title: 'Researcher',
      key: 'request__researcher__last_name',
      width: 100,
      render: (record) => renderResearcher(record),
      sorter: true,
    }, {
      title: 'Status',
      key: 'status',
      width: 130,
      className: style.ActionColumn,
      render: (record) => renderStatus(record),
      sorter: false,
    }, {
      key: 'actions',
      title: 'Actions',
      width: 100,
      className: style.ActionColumn,
      render: (record) => renderActions(record)
    }
  ];

  useEffect(() => {
    if (data) {
      handleDataChange(data.count)
    }
  }, [data]);

  useEffect(() => {
    if (!shareModalOpen || !shareJob?.id || shareJobFinished) {
      return;
    }

    const intervalId = setInterval(() => {
      get(`/v1/research/requested-materials-sharepoint-jobs/${shareJob.id}/`).then((response) => {
        setShareJob(response.data);
        setShareJobsByItem((currentJobs) => ({
          ...currentJobs,
          [response.data.request_item_id]: response.data,
        }));
      }).catch(() => {
        setShareJob((currentJob) => currentJob ? {
          ...currentJob,
          status: 'failed',
          error_message: 'Could not refresh SharePoint job status.',
        } : currentJob);
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [shareModalOpen, shareJob?.id, shareJobFinished]);

  useEffect(() => {
    if (shareJobFinished) {
      refresh();
    }
  }, [shareJobFinished]);

  const renderDate = (data) => {
    return moment(data).format('YYYY-MM-DD, dddd')
  }

  const renderIdentifier = (record) => {
    if (record['item_origin'] === 'FA') {
      if (record['has_restricted_content']) {
        return (
          <div>
            <div>{record['archival_reference_number']}</div>
            <Badge count={'Has Restricted Material'} style={{ backgroundColor: '#e03c3c', borderRadius: '3px', fontSize: '0.8em' }} />
          </div>
        )
      } else {
        return record['archival_reference_number']
      }
    } else {
      return record['identifier']
    }
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

  const renderActions = (record) => {
    const detectDisabled = () => {
      return record['status'] !== '1' && record['status'] !== '2' && record['status'] !== '3'
    }

    if (record['research_allowed']) {
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
    } else {
      return ''
    }
  }

  const onStatusChange = (action, id) => {
    put(`/v1/research/requests/${action}/${id}/`).then(() => {
      refresh();
    })
  }

  const renderMLR = (record) => {
    if (record['mlr'].hasOwnProperty('locations')) {
      return (
        <div>
          <div>{record['mlr']['locations']}</div>
          {
            record['mlr']['another_request'] &&
            <Badge count={'Appears in another request'} style={{ backgroundColor: '#666', borderRadius: '3px', fontSize: '0.8em' }} />
          }
          {
            record['has_digital_version'] &&
            <Badge count={record['digital_version_barcode']} style={{ backgroundColor: '#e06d3c', borderRadius: '3px', fontSize: '0.8em' }} />
          }
        </div>
      )
    }

    if (record['library_id']) {
      return (
        <div>
          <LibraryMLRInfo kohaID={record['library_id']} />
        </div>
      )
    }

    return record['mlr']
  }

  const renderFoldersItems = (record) => {
    const getStyle = (rec) => {
      switch (rec['status']) {
        case 'new':
          return {backgroundColor: '#e03c3c'};
        case 'approved':
          return {backgroundColor: '#83c04d'}
        case 'approved_on_site':
          return {backgroundColor: '#4dc098'};
        case 'rejected':
          return {backgroundColor: '#e06d3c'}
        case 'lifted':
          return undefined;
      }
    }

    const renderRecords = () => (
      record['parts'].map(rec => {
        if (rec['is_restricted']) {
          return (
            <Tooltip key={rec['id']} title={STATUS[rec['status']]} placement={'left'}>
              <div className={style.Restricted} style={getStyle(rec)}>
                {rec['reference_code']}
              </div>
            </Tooltip>
          )
        }

        if (rec['is_missing']) {
          return (
            <div>
              <Badge count={`${rec['reference_code']} - missing`} style={{
                backgroundColor: '#1fb7fb',
                borderRadius: '3px',
                fontSize: '0.8em' }} />
            </div>
          )
        }

        return (
          <div>
            {rec['reference_code']}
          </div>
        )
      })
    )

    return renderRecords()
  }

  const onShare = async (id) => {
    setShareStartingId(id);
    setShareModalOpen(true);
    setShareJob(undefined);

    try {
      const response = await post(`/v1/research/request_item/${id}/requested-materials-sharepoint/`);
      setShareJob(response.data);
      setShareJobsByItem((currentJobs) => ({
        ...currentJobs,
        [id]: response.data,
      }));
    } catch (error) {
      setShareModalOpen(false);
      message.error('Could not start SharePoint sharing.', 3);
    } finally {
      setShareStartingId(undefined);
    }
  };

  const getShareJobStepLabel = (job) => {
    if (!job) {
      return '';
    }

    return SHARE_JOB_STEP_LABELS[job.current_step] || _.startCase(job.current_step);
  };

  const renderShareJobBadge = (job) => {
    const shareStepLabel = getShareJobStepLabel(job);

    if (job.status === 'completed') {
      return <span className={style.ShareJobSuccess}>Share completed</span>;
    }

    if (job.status === 'failed') {
      return <span className={style.ShareJobFailed}>{shareStepLabel}: failed</span>;
    }

    return (
      <span className={style.ShareJobRunning}>
        {shareStepLabel}: {job.progress_percent ?? 0}%
      </span>
    );
  };

  const renderStatus = (record) => {
    const canShare = record['has_digital_version'] && record['status'] !== '9';
    const currentShareJob = shareJobsByItem[record.id];
    const shareInProgress = currentShareJob && !['completed', 'failed'].includes(currentShareJob.status);

    const generateBadges = (badgeText, color, withUndo=true) => {
      return (
        <div className={style.StatusWrapper}>
          <div className={style.BadgeWithUndoButton}>
            <div onClick={() => onStatusChange('next', record['id'])} className={style.Badge}>
              <Badge count={badgeText} style={{ backgroundColor: color, borderRadius: '3px', fontSize: '0.8em' }} />
            </div>
            {
              canShare &&
              <Tooltip title={'Share'}>
                <Button
                  size="small"
                  icon={<CloudUploadOutlined/>}
                  className={style.UndoButton}
                  loading={shareStartingId === record.id}
                  disabled={shareInProgress}
                  onClick={() => onShare(record.id)}
                />
              </Tooltip>
            }
            {
              withUndo &&
              <Tooltip title={'Undo'}>
                <div onClick={() => onStatusChange('previous', record['id'])}>
                  <Button size="small" icon={<UndoOutlined/>} className={style.UndoButton}/>
                </div>
              </Tooltip>
            }
          </div>
          {
            currentShareJob &&
            <button
              type="button"
              className={style.ShareJobBadge}
              onClick={() => {
                setShareJob(currentShareJob);
                setShareModalOpen(true);
              }}
            >
              {renderShareJobBadge(currentShareJob)}
            </button>
          }
        </div>
      );
    }

    if (!record['research_allowed']) {
      return <Badge count={'Waiting for approval'} style={{ backgroundColor: "#666", borderRadius: '3px', fontSize: '0.8em' }} />
    }

    switch (record['status']) {
      case '1':
        return generateBadges('In Queue', '#ba3300', false);
      case '2':
        return generateBadges('Pending', '#fa8c16', false);
      case '3':
        return generateBadges('Delivered', 'rgba(45,184,227,0.66)', false);
      case '4':
        return generateBadges('Returned', '#83c04d');
      case '5':
        return generateBadges('Reshelved', '#376e18');
      case '9':
        return generateBadges('Served', '#223f00');
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

  const onShareModalClose = () => {
    setShareModalOpen(false);
    setShareJob(undefined);
  };

  const renderShareJobStatus = () => {
    if (!shareJob) {
      return <div>Starting SharePoint sharing job...</div>;
    }

    const shareStepLabel = getShareJobStepLabel(shareJob);
    const progressPercent = shareJob.progress_percent ?? 0;
    const progressStatus = shareJob.status === 'failed' ? 'exception' : shareJob.status === 'completed' ? 'success' : 'active';

    return (
      <div className={style.ShareJobStatus}>
        <Alert
          type={shareJob.status === 'failed' ? 'error' : shareJob.status === 'completed' ? 'success' : 'info'}
          showIcon
          message={shareStepLabel}
          description={shareJob.message || 'SharePoint job is running.'}
        />
        <div className={style.ShareJobProgress}>
          <Progress percent={progressPercent} status={progressStatus} />
        </div>
        <div className={style.ShareJobMeta}>
          <div><strong>Status:</strong> {_.capitalize(shareJob.status)}</div>
          <div><strong>Step:</strong> {shareStepLabel}</div>
          <div><strong>Progress:</strong> {shareJob.progress_current} / {shareJob.progress_total}</div>
        </div>
        {
          shareJob.error_message &&
          <Alert
            type={'error'}
            showIcon
            message={shareJob.error_message}
          />
        }
      </div>
    );
  };

  const getFooter = () => {
    return (
      <Row gutter={12}>
        <Col span={16}>
          <a href={'/requests/create'}>
            <Button type={'primary'}>
              <PlusOutlined />
              Create Request
            </Button>
          </a>
          <a href={'/requests/print'} target={'_blank'} style={{marginLeft: '10px'}}>
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
      <TableFilters
        module={'requests'}
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
      <Modal
        title={'Share requested materials'}
        open={shareModalOpen}
        onCancel={onShareModalClose}
        footer={[
          <Button key={'close'} onClick={onShareModalClose}>
            Close
          </Button>
        ]}
        width={420}
        destroyOnClose={true}
      >
        {renderShareJobStatus()}
      </Modal>
    </React.Fragment>
  )
};

export default RequestTableDigital;
