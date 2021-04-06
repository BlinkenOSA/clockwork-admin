import {Button, Col, Drawer, Modal, Row, Table, Tooltip} from "antd";
import React, {useState, useEffect} from "react";
import {EditOutlined, DeleteOutlined, PlusOutlined, LoadingOutlined} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.css';
import {remove} from "../../utils/api";
import _ from 'lodash';
import {PopupForm} from "../Forms/PopupForm";
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";

const LABELS = {
  'archival-units-fonds': 'Fonds',
  'archival-units-subfonds': 'Subfonds',
  'archival-units-series': 'Series',

};

const ArchivalUnitTable = ({columns}) => {
  const { params, tableState, handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable(module);

  const [drawerShown, setDrawerShown] = useState(false);
  const [action, setAction] = useState('create');
  const [module, setModule] = useState('archival-units-fonds');
  const [selectedRecord, setSelectedRecord] = useState(undefined);

  const {data, loading, refresh} = useData(`/v1/archival_unit/`, params);

  useEffect(() => {
    if (data) {
      handleDataChange(data.count);
    }
  }, [data]);

  const renderActionButtons = (record) => {
    return (
      <Button.Group>
        {
          record.level !== 'S' &&
          <Tooltip key={'add'} title={`Create ${record.level === 'F' ? 'Subfonds' : 'Series'}`}>
            <Button size="small" icon={<PlusOutlined/>} onClick={() => onCreate(record.id, record.level)} />
          </Tooltip>
        }
        <Tooltip key={'edit'} title={'Edit'}>
          <Button size="small" icon={<EditOutlined/>} onClick={() => onEdit(record.id, record.level)}/>
        </Tooltip>
        {
          record.is_removable &&
          <Tooltip key={'delete'} title={'Delete'}>
            <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.id, record.level)}/>
          </Tooltip>
        }
      </Button.Group>
    );
  };

  const getPopupColumns = (columns, actions) => {
    const c = [...columns];
    c.push(
      {
        key: 'actions',
        title: 'Actions',
        width: 150,
        className: style.ActionColumn,
        render: (record) => renderActionButtons(record, actions)
      }
    );
    return c;
  };

  const getFooter = () => {
    return (
      <Row>
        <Col span={8}>
          <Button type={'primary'} onClick={() => onCreate(undefined, 'F')}>
            {`New Fonds`}
          </Button>
        </Col>
      </Row>
    )
  };

  const onDelete = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        remove(`/v1/archival_unit/${id}/`).then(() => {
          handleDelete(data.length);
          deleteAlert();
          refresh();
        })
      }
    });
  };

  const getModule = (level) => {
    const MODULES = {
      'F': 'archival-units-fonds',
      'SF': 'archival-units-subfonds',
      'S': 'archival-units-series'
    };
    return MODULES[level];
  };

  const onCreate = (selectedRecord, level) => {
    let module = '';
    setSelectedRecord(selectedRecord);

    if (level === 'F') {
      module = selectedRecord ? getModule('SF') : getModule('F')
    } else {
      module = getModule('S')
    }

    setModule(module);
    setAction('create');
    setDrawerShown(true);
  };

  const onEdit = (id, level) => {
    setSelectedRecord(id);
    setModule(getModule(level));
    setAction('edit');
    setDrawerShown(true);
  };

  const onClose = () => {
    refresh();
    setDrawerShown(false);
  };

  return (
    <React.Fragment>
      <TableFilters module={'archival-units'} onFilterChange={handleFilterChange}/>
      <Table
        bordered={true}
        className={style.Table}
        rowKey={record => record.id}
        dataSource={data ? data.results : []}
        columns={getPopupColumns(columns, [])}
        size={'small'}
        footer={() => getFooter()}
        loading={{
          spinning: loading,
          indicator: <LoadingOutlined/>,
        }}
        pagination={tableState['pagination']}
        onChange={handleTableChange}
      />
      <Drawer
        title={_.capitalize(action)}
        width={'50%'}
        onClose={(e) => onClose()}
        visible={drawerShown}
        destroyOnClose={true}
      >
        <PopupForm
          api={`/v1/archival_unit/`}
          preCreateAPI={action === 'create' ? `/v1/archival_unit/create/` : null}
          label={LABELS[module]}
          selectedRecord={selectedRecord}
          module={module}
          type={action}
          onClose={onClose}
        />
      </Drawer>
    </React.Fragment>
  )
};

export default ArchivalUnitTable;
