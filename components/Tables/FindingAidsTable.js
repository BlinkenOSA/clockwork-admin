import {Button, Col, Drawer, Dropdown, Menu, Modal, Row, Table, Tooltip} from "antd";
import React, {useState, useEffect} from "react";
import {
  CopyOutlined,
  FormOutlined,
  EditOutlined,
  DeleteOutlined,
  GlobalOutlined,
  LoadingOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  WarningOutlined,
  DownOutlined
} from "@ant-design/icons";
import style from './Table.module.css';
import {post, put, remove} from "../../utils/api";
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";
import {renderArchivalUnitReferenceCode} from "../../utils/renders/renderArchivalUnitReferenceCode";
import Link from "next/link";
import _ from "lodash";
import {PopupForm} from "../Forms/PopupForm";


const FindingAidsTable = ({containerID, containerListRefresh, templateData, recordTotalPublished}) => {
  const { params, tableState, handleDataChange, handleTableChange, handleDelete } = useTable(`finding-aids-table-${containerID}`);
  const { data, loading, refresh } = useData(containerID ? `/v1/finding_aids/list/${containerID}/` : undefined, params);

  const [ publishing, setPublishing ] = useState({});
  const [ confidentialSetting, setConfidentialSetting ] = useState({});

  const [ selectedRecord, setSelectedRecord ] = useState(undefined);
  const [ drawerShown, setDrawerShown ] = useState(false);
  const [ action, setAction ] = useState('edit');

  useEffect(() => {
    if (data) {
      handleDataChange(data.count);
    }
  }, [data]);

  useEffect(() => {
    refresh()
  }, [recordTotalPublished]);

  const renderActionButtons = (record) => {
    return (
      <React.Fragment>
        <Button.Group>
          <Tooltip key={'clone'} title={'Clone'}>
            <Button
              size="small"
              icon={<CopyOutlined />}
              style={{marginRight: '5px'}}
              onClick={() => onClone(record.id)}
            />
          </Tooltip>
          <Tooltip key={'quick_edit'} title={'Quick Edit'}>
            <Button size="small" icon={<FormOutlined/>} onClick={() => onQuickEdit(record.id)} />
          </Tooltip>
          <Link href={`/finding-aids/entities/edit/${record.id}`}>
            <Tooltip key={'edit'} title={'Edit'}>
              <Button size="small" icon={<EditOutlined/>} />
            </Tooltip>
          </Link>
          {
            record.is_removable &&
            <Tooltip key={'delete'} title={'Delete'}>
              <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.id)}/>
            </Tooltip>
          }
          {
            record.published &&
            <a
              href={`https://catalog.osaarchivum.org/catalog/${record.catalog_id}`}
              target={'_blank'}
              style={{marginTop: 0, marginLeft: '5px'}}
            >
              <Tooltip key={'catalog_link'} title={'Catalog URL'}>
                <Button size="small" icon={<GlobalOutlined/>}/>
              </Tooltip>
            </a>
          }
        </Button.Group>
      </React.Fragment>
    )
  };

  const columns = [
    {
      title: 'Archiaval Reference Code',
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
      title: 'Date',
      key: 'date',
      sorter: false,
      render: (record) => renderDate(record),
      width: 150
    }, {
      key: 'actions',
      title: 'Actions',
      width: 150,
      className: style.ActionColumn,
      render: (record) => renderActionButtons(record, ['view', 'quick_edit', 'edit', 'delete'])
    }, {
      title: 'Publish',
      width: 135,
      className: style.PublishColumn,
      render: (record) => renderPublishButtons(record)
    }
  ];

  const renderDate = (record) => {
    if (record.date_to) {
      return `${record.date_from} - ${record.date_to}`
    } else {
      return record.date_from
    }
  };

  const renderPublishButtons = (record) => {
    const renderContainerPublishButton = () => {
      if (record.published) {
        return (
          <Tooltip title={'Unpublish'}>
            <Button
              size="small"
              className={style.ButtonPublished}
              loading={publishing.hasOwnProperty(record.id) ? publishing[record.id] : false}
              onClick={() => {onAction('unpublish', record.id)}}
              icon={<ArrowDownOutlined/>}
            />
          </Tooltip>
        );
      } else {
        return (
          <Tooltip title={'Publish'}>
            <Button
              size="small"
              className={style.ButtonNotPublished}
              loading={publishing.hasOwnProperty(record.id) ? publishing[record.id] : false}
              onClick={() => {onAction('publish', record.id)}}
              icon={<ArrowUpOutlined/>}
            />
          </Tooltip>
        );
      }
    };

    const renderConfidentialButton = () => {
      if (record.confidential) {
        return (
          <Tooltip title={'Unset confidential'}>
            <Button
              size="small" type={'warning'}
              className={style.ButtonConfidential}
              loading={confidentialSetting.hasOwnProperty(record.id) ? confidentialSetting[record.id] : false}
              onClick={() => {onAction('set_non_confidential', record.id)}}
              icon={<WarningOutlined />}
            />
          </Tooltip>
        );
      } else {
        return (
          <Tooltip title={'Set confidential'}>
            <Button
              size="small"
              type={'warning'}
              loading={confidentialSetting.hasOwnProperty(record.id) ? confidentialSetting[record.id] : false}
              onClick={() => {onAction('set_confidential', record.id)}}
              icon={<WarningOutlined />}
            />
          </Tooltip>
        );
      }
    };

    return (
      <Button.Group>
        { renderContainerPublishButton() }
        { renderConfidentialButton() }
      </Button.Group>
    )
  };

  const onClone = (id) => {
    const { confirm } = Modal;

    confirm({
      title: `Are you sure you would like to clone the record?`,
      okText: 'Yes',
      okType: 'warning',
      cancelText: 'No',
      onOk() {
        post(`/v1/finding_aids/clone/${id}/`).then(() => {
          refresh();
        })
      }
    });
  };

  const onAction = (action, id) => {
    const { confirm } = Modal;

    if (action === 'publish' || action === 'unpublish') {
      confirm({
        title: `Are you sure you would like to ${action} the record?`,
        okText: 'Yes',
        okType: 'warning',
        cancelText: 'No',
        onOk() {
          setPublishing({[id]: true});
          put(`/v1/finding_aids/${action}/${id}/`).then(() => {
            setPublishing({[id]: false});
            containerListRefresh();
          })
        }
      });
    } else {
      confirm({
        title: `Are you sure you would like to ${action === 'set_confidential' ? 'set confidential status to' : 'remove confidential status from'} the record?`,
        okText: 'Yes',
        okType: 'warning',
        cancelText: 'No',
        onOk() {
          setConfidentialSetting({[id]: true});
          put(`/v1/finding_aids/${action}/${id}/`).then(() => {
            refresh();
            setConfidentialSetting({[id]: false});
          })
        }
      });
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
        remove(`/v1/finding_aids/${id}/`).then(() => {
          handleDelete(data.length);
          deleteAlert();
          refresh();
          containerListRefresh();
        })
      }
    });
  };

  const onQuickEdit = (id) => {
    setSelectedRecord(id);
    setDrawerShown(true);
  };

  const onDrawerClose = () => {
    refresh();
    setDrawerShown(false);
  };

  const getTemplateButton = () => {
    const menu = (
      <Menu>
        {
          templateData.map(data => {
            return (
              <Menu.Item key={data.id}>
                <Link href={`/finding-aids/entities/create/from-template/${data.id}/${containerID}`}>{data.template_name}</Link>
              </Menu.Item>
            )
          })
        }
      </Menu>
    );

    if (templateData.length > 0) {
      return (
        <Dropdown overlay={menu}>
          <Button style={{marginLeft: '10px'}} disabled={templateData.length === 0}>
            New from Template <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  };

  const getFooter = () => {
    return (
      <Row>
        <Col span={12}>
          <Link href={`/finding-aids/entities/create/${containerID}`}>
            <Button type={'primary'}>
              New Folder / Item
            </Button>
          </Link>
          { getTemplateButton() }
        </Col>
      </Row>
    )
  };

  return (
    <React.Fragment>
      <Table
        bordered={true}
        className={style.FindingAidsTable}
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
        title={_.capitalize(`Quick ${action} Finding Aids Record`)}
        width={'50%'}
        onClose={(e) => onDrawerClose()}
        open={drawerShown}
        destroyOnClose={true}
      >
        <PopupForm
          api={'/v1/finding_aids/'}
          preCreateAPI={action === 'create' ? `/v1/finding_aids/pre_create/${containerID}` : null}
          selectedRecord={selectedRecord}
          module={'finding-aids-quick-edit'}
          type={action}
          label={'Finding Aids Record'}
          onClose={onDrawerClose}
        />
      </Drawer>
    </React.Fragment>
  )
};

export default FindingAidsTable;
