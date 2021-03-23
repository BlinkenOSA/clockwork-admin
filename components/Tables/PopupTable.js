import {Button, Col, Drawer, Modal, notification, Row, Table, Tooltip} from "antd";
import React, {useState, useEffect} from "react";
import {EditOutlined, DeleteOutlined, EyeOutlined, LoadingOutlined} from "@ant-design/icons";
import useStickyState from "../../utils/hooks/useStickyState";
import {createParams} from "./functions/createParams";
import TableFilters from "./TableFilters";
import style from './Table.module.css';
import useSWR, {mutate} from "swr";
import {get, remove} from "../../utils/api";
import _ from 'lodash';
import {PopupForm} from "../Forms/PopupForm";

const PAGINATION_INIT = {
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50', '100'],
  showTotal: (total, range) => {return `${range[0]}-${range[1]} of ${total} items`}
};

const PopupTable = ({api, columns, module, actions=[], field, label, showFilter=false, ...props}) => {
  const [drawerShown, setDrawerShown] = useState(false);
  const [action, setAction] = useState('create');
  const [selectedRecord, setSelectedRecord] = useState(undefined);

  const [ params, setParams ] = useState({});
  const [ tableState, setTableState ] = useStickyState({pagination: PAGINATION_INIT}, `ams-${module}-table`);

  const { data, error } = useSWR([`${api}`, params], url => get(url, params));

  useEffect(() => {
    if (data) {
      setTableState(prevTableState => ({
        ...prevTableState,
        pagination: {
          ...prevTableState.pagination,
          total: data.count
        },
      }));
    }
  }, [data]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableState(prevTableState => ({
      ...prevTableState,
      pagination: {
        ...prevTableState.pagination.showTotal,
        ...pagination
      },
      ...filters,
      ...sorter
    }));
    setParams(Object.assign({}, params, createParams({pagination, filters, sorter})));
  };

  const handleFilterChange = (filterValues) => {
    if (Object.entries(filterValues).length > 0) {

      // set pagination
      setTableState(prevTableState => ({
        ...prevTableState,
        pagination: {
          ...prevTableState.pagination,
          current: 1
        }
      }));

      setParams(Object.assign({}, filterValues));
    }
  };

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

  const deleteAlert = () => {
    notification.warning({
      duration: 3,
      message: 'Removed!',
      description: `Record was removed!`,
    });
  };

  const handleDelete = () => {
    if(data.length === 1) {
      // set pagination
      setTableState(prevTableState => ({
        ...prevTableState,
        pagination: {
          ...prevTableState.pagination,
          current: prevTableState.pagination['current'] - 1
        }
      }));
    } else {
      mutate([`${api}`, params]);
    }
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
          handleDelete();
          deleteAlert();
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
    mutate([`${api}`, params]);
    setDrawerShown(false);
  };

  return (
    <React.Fragment>
      {showFilter &&
        <TableFilters module={module} onFilterChange={handleFilterChange}/>
      }
      <Table
        api={api}
        bordered={true}
        className={style.Table}
        rowKey={record => record.id}
        dataSource={data ? data.results : []}
        columns={getPopupColumns(columns, actions, module)}
        size={'small'}
        footer={() => getFooter()}
        loading={{
          spinning: !data,
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
