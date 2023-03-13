import {Button, Card, Col, Drawer, Modal, Row, Table, Tooltip} from "antd";
import React, {useState, useEffect} from "react";
import {ArrowUpOutlined, ArrowDownOutlined, EditOutlined, DeleteOutlined, LoadingOutlined, BarcodeOutlined,
  CloseOutlined, TableOutlined, CaretRightOutlined, PrinterOutlined, CaretUpOutlined, CaretDownOutlined} from "@ant-design/icons";
import style from './Table.module.scss';
import {put, remove} from "../../utils/api";
import _ from 'lodash';
import {PopupForm} from "../Forms/PopupForm";
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";
import Collapse from "@kunukn/react-collapse";
import {ContainerCreateForm} from "../Forms/ContainerCreateForm";
import Link from "next/link";
import FindingAidsTemplateTable from "./FindingAidsTemplateTable";
import FindingAidsTable from "./FindingAidsTable";
import dynamic from "next/dynamic";
import LabelTypeSelector from "../LabelTypeSelector/LabelTypeSelector";

const FindingAidsGrid = dynamic(
  () => import('../Grids/FindingAidsGrid'),
  { ssr: false }
);

const ContainerTable = ({seriesID, seriesTitle}) => {
  const api = seriesID ? `/v1/container/list/${seriesID}/` : undefined;
  const { data, loading, refresh, tableState,
    handleExpandedRowsChange, handleDataChange, handleTableChange, handleDelete } = useTable(
      `container-table-${seriesID ? seriesID : 0}`, api);

  const [drawerShown, setDrawerShown] = useState(false);
  const [action, setAction] = useState('edit');
  const [selectedRecord, setSelectedRecord] = useState(undefined);
  const [formType, setFormType] = useState('container');
  const [publishing, setPublishing] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [faTemplateOpen, setFATemplateOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const templateData = useData(seriesID ? `/v1/finding_aids/templates/select/${seriesID}/` : undefined);

  useEffect(() => {
    if (data) {
      handleDataChange(data.count);
    }
  }, [data]);

  const renderActionButtons = (record) => {
    return (
      <Button.Group>
        <Tooltip key={'edit'} title={'Edit'}>
          <Button size="small" icon={<EditOutlined/>} onClick={() => onEdit(record.id)}/>
        </Tooltip>
        {
          record.is_removable &&
          <Tooltip key={'delete'} title={'Delete'}>
            <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.id)}/>
          </Tooltip>
        }
      </Button.Group>
    )
  };

  const renderBarcodeButton = (value, record) => {
    return record['barcode'] ? (
        <span
          className={style.BarcodeText}
          onClick={() => {
            setSelectedRecord(record.id);
            setAction('update');
            setFormType('barcode');
            setDrawerShown(true);
          }}>
          {record['barcode']}
        </span>
      ) : (
        <Tooltip title='Barcode'>
          <Button size="small" icon={<BarcodeOutlined/>} onClick={() => {
            setSelectedRecord(record.id);
            setAction('update');
            setFormType('barcode');
            setDrawerShown(true);
          }}/>
        </Tooltip>
      )
  };

  const renderPublishButton = (record) => {
    const renderContainerPublishButton = () => {
      const disabled = record.total_number === 0;
      if (record.total_number !== 0 && record.total_number === record.total_published_number) {
        return (
          <Tooltip title={'Unpublish all in container'}>
            <Button
              size="small"
              disabled={disabled}
              onClick={() => onPublish('unpublish', record.id)}
              icon={<ArrowDownOutlined/>}
              className={record.total_number === record.total_published_number ? style.ButtonPublished : style.ButtonNotPublished}
            />
          </Tooltip>
        );
      } else {
        return (
          <Tooltip title={'Publish all in container'}>
            <Button
              size="small"
              disabled={disabled}
              onClick={() => onPublish( 'publish', record.id)}
              icon={<ArrowUpOutlined/>}
              className={record.total_number === record.total_published_number ? style.ButtonPublished : style.ButtonNotPublished}
            />
          </Tooltip>
        );
      }
    };

    if (record.total_number !== 0) {
      return (
        <Button.Group>
          {renderContainerPublishButton()}
          <Button
            size="small"
            disabled
            className={style.PublishInfo}
            loading={publishing}
          >
            { record.total_number } / { record.total_published_number }
          </Button>
        </Button.Group>
      )
    } else {
      return ''
    }

  };

  const columns = [
    {
      title: 'Container No.',
      dataIndex: 'reference_code',
      key: 'reference_code',
      width: 250
    }, {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      className: style.ActionColumn,
      render: renderBarcodeButton
    }, {
      title: 'Carrier Type',
      dataIndex: 'carrier_type',
      key: 'carrier_type',
      width: 300
    }, {
      key: 'actions',
      title: 'Actions',
      width: 150,
      className: style.ActionColumn,
      render: (record) => renderActionButtons(record, ['edit', 'delete'])
    }, {
      key: 'publish',
      title: 'Publish',
      width: 135,
      className: style.PublishColumn,
      render: renderPublishButton
    }
  ];

  const onPublish = (action, id) => {
    const { confirm } = Modal;

    if (action === 'publish' || action === 'unpublish') {
      confirm({
          title: `Are you sure you would like to ${action} the records in this container?`,
          okText: 'Yes',
          okType: 'warning',
          cancelText: 'No',
          onOk() {
            setPublishing(true);
            put(`/v1/container/${action}/${id}/`).then(() => {
              refresh();
              setPublishing(false);
            })
          }
        }
      );
    } else {
      confirm({
          title: `Are you sure you would like to ${action === 'publish_all' ? 'publish' : 'unpublish'} all the records in this container?`,
          okText: 'Yes',
          okType: 'warning',
          cancelText: 'No',
          onOk() {
            setPublishing(true);
            put(`/v1/container/${action === 'publish_all' ? 'publish' : 'unpublish'}/${seriesID}/all/`).then(() => {
              refresh();
              setPublishing(false);
            })
          }
        }
      );
    }
  };

  const onDelete = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        remove(`/v1/container/${id}`).then(() => {
          handleDelete(data.length);
          deleteAlert();
          refresh();
        })
      }
    });
  };

  const onEdit = (id) => {
    setSelectedRecord(id);
    setAction('edit');
    setFormType('container');
    setDrawerShown(true);
  };

  const onClose = () => {
    refresh();
    setDrawerShown(false);
  };

  const expandedRowRender = (record, index) => {
    return (
      <FindingAidsTable
        containerID={record.id}
        containerListRefresh={refresh}
        recordTotalPublished={record.total_published_number}
        templateData={templateData ? templateData['data'] : {}}
      />
    )
  };

  const onRow = ({id}) => {
    return tableState['expandedRows'].includes(id) && {className: style.ExpandedParent}
  };

  const getFooter = () => {
    return (
      <Row gutter={[12]}>
        <Col span={16}>
          <Button type={'default'} onClick={() => setCreateFormOpen(!createFormOpen)}>
            {
              createFormOpen ?
              <div><CaretUpOutlined/><span style={{marginLeft: '5px'}}>Container Form</span></div> :
              <div><CaretRightOutlined/><span style={{marginLeft: '5px'}}>Container Form</span></div>
            }
          </Button>
          <Button type={'default'} onClick={() => setFATemplateOpen(!faTemplateOpen)} style={{marginLeft: '10px'}}>
            {
              faTemplateOpen ?
              <div><CaretDownOutlined/><span style={{marginLeft: '5px'}}>Templates</span></div> :
              <div><CaretRightOutlined/><span style={{marginLeft: '5px'}}>Templates</span></div>
            }
          </Button>
          <Tooltip key={'table_view'} title={'Table View'}>
            <Button type={'default'} onClick={() => setModalVisible(!modalVisible)} style={{marginLeft: '10px'}}>
              <TableOutlined/> Table View
            </Button>
          </Tooltip>
          <LabelTypeSelector seriesID={seriesID} />
        </Col>
        <Col span={8} style={{textAlign: 'right'}}>
          <Tooltip key={'publish_all'} title={'Publish All'}>
            <Button type={'default'} onClick={() => onPublish('publish_all')}>
              <ArrowUpOutlined/> Publish
            </Button>
          </Tooltip>
          <Tooltip key={'unpublish_all'} title={'Unpublish All'}>
            <Button type={'default'} onClick={() => onPublish('unpublish_all')} style={{marginLeft: '10px'}}>
              <ArrowDownOutlined/> Unpublish
            </Button>
          </Tooltip>
          <Link href={'/finding-aids'}>
            <Button type={'default'} style={{marginLeft: '10px'}}>
              <CloseOutlined/> Close
            </Button>
          </Link>
        </Col>
      </Row>
    )
  };

  return (
    <React.Fragment>
      <Collapse isOpen={createFormOpen}>
        <Card size="small" style={{marginBottom: '10px'}} title={'Create Containers'}>
          <ContainerCreateForm seriesID={seriesID} containerListRefresh={refresh}/>
        </Card>
      </Collapse>
      <Card size="small" style={{marginBottom: '10px'}}>
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
          expandable={{
            onExpandedRowsChange: handleExpandedRowsChange,
            expandedRowKeys: tableState['expandedRows'],
            expandedRowRender: expandedRowRender,
          }}
          footer={() => getFooter()}
          pagination={tableState['pagination']}
          onChange={handleTableChange}
          onRow={onRow}
        />
      </Card>
      <Collapse isOpen={faTemplateOpen}>
        <Card size="small" style={{marginBottom: '10px'}}>
          <FindingAidsTemplateTable seriesID={seriesID} />
        </Card>
      </Collapse>
      <Drawer
        title={_.capitalize(action)}
        width={'50%'}
        onClose={(e) => onClose()}
        open={drawerShown}
        destroyOnClose={true}
      >
        <PopupForm
          api={'/v1/container/'}
          selectedRecord={selectedRecord}
          module={formType}
          type={action}
          label={formType === 'container' ? 'Container' : 'Barcode'}
          onClose={onClose}
        />
      </Drawer>
      <Modal
        title={seriesTitle}
        centered
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
        maskClosable={false}
        destroyOnClose={true}
        width="100vw"
        wrapClassName={style.TableViewModal}
      >
        <FindingAidsGrid seriesID={seriesID} />
      </Modal>
    </React.Fragment>
  )
};

export default ContainerTable;
