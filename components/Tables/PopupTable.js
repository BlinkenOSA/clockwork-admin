import {Button, Col, Drawer, Modal, Row, Table, Tooltip} from "antd";
import React, {useState, useEffect} from "react";
import {EditOutlined, DeleteOutlined, EyeOutlined, LoadingOutlined} from "@ant-design/icons";
import TableFilters from "./TableFilters";
import style from './Table.module.css';
import {remove} from "../../utils/api";
import _ from 'lodash';
import {PopupForm} from "../Forms/PopupForm";
import {useData} from "../../utils/hooks/useData";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";


const PopupTable = ({api, columns, module, actions=[], field, label, showFilter=false, footer=true, ...props}) => {
  const { params, tableState, handleDataChange, handleTableChange, handleFilterChange, handleDelete } = useTable(module);

  const [drawerShown, setDrawerShown] = useState(false);
  const [action, setAction] = useState('create');
  const [selectedRecord, setSelectedRecord] = useState(undefined);

  const { data, loading, refresh } = useData(api, params);

  useEffect(() => {
    if (data) {
      handleDataChange(data.count);
    }
  }, [data]);

  const renderActionButtons = (record, actions) => {
    const getButtons = () => {
      return actions.map((action) => {
        switch (action) {
          case 'view':
            return (
              <Tooltip key={'view'} title={'View'}>
                <Button size="small" icon={<EyeOutlined/>} onClick={() => onView(record.id)}/>
              </Tooltip>
            );
          case 'edit':
            return (
              <Tooltip key={'edit'} title={'Edit'}>
                <Button size="small" icon={<EditOutlined/>} onClick={() => onEdit(record.id)}/>
              </Tooltip>
            );
          case 'delete':
            return (
              record.is_removable && <Tooltip key={'delete'} title={'Delete'}>
                <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(record.id)}/>
              </Tooltip>
            );
          default:
            break;
        }
      })
    };

    return (
      <Button.Group>
        {getButtons()}
      </Button.Group>
    )
  };

  const getPopupColumns = (columns, actions) => {
    const c = [...columns];
    if (actions.length > 0) {
      c.push(
        {
          key: 'actions',
          title: 'Actions',
          width: 150,
          className: style.ActionColumn,
          render: (record) => renderActionButtons(record, actions)
        }
      )
    }
    return c;
  };

  const getFooter = () => {
    return (
      <Row>
        <Col span={8}>
          <Button type={'primary'} onClick={onCreate}>
            {`New ${label}`}
          </Button>
        </Col>
      </Row>
    )
  };

  const showDeleteConfirm = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        remove(`${api}${id}/`).then(() => {
          handleDelete(data.length);
          deleteAlert();
          refresh();
        })
      }
    });
  };

  const onDelete = (id) => {
    showDeleteConfirm(id)
  };

  const onCreate = () => {
    setSelectedRecord(undefined);
    setAction('create');
    setDrawerShown(true);
  };

  const onEdit = (id) => {
    setSelectedRecord(id);
    setAction('edit');
    setDrawerShown(true);
  };

  const onView = (id) => {
    setSelectedRecord(id);
    setAction('view');
    setDrawerShown(true);
  };

  const onClose = () => {
    refresh();
    setDrawerShown(false);
  };

  return (
    <React.Fragment>
      {showFilter &&
        <TableFilters module={module} onFilterChange={handleFilterChange}/>
      }
      <Table
        bordered={true}
        className={style.Table}
        rowKey={record => record.id}
        dataSource={data ? data.results : []}
        columns={getPopupColumns(columns, actions, module)}
        size={'small'}
        footer={footer ? () => getFooter() : false}
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
          api={api}
          selectedRecord={selectedRecord}
          module={module}
          type={action}
          field={field}
          label={label}
          onClose={onClose}
        />
      </Drawer>
    </React.Fragment>
  )
};

export default PopupTable;
