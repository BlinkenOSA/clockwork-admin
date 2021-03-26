import {Button, Col, Modal, notification, Row, Table} from "antd";
import React, {useState, useEffect} from "react";
import {LoadingOutlined } from "@ant-design/icons";
import useStickyState from "../../utils/hooks/useStickyState";
import {createParams} from "./functions/createParams";
import {getColumns} from "./functions/getColumns";
import TableFilters from "./TableFilters";
import style from './Table.module.css';
import Link from "next/link";
import {remove} from "../../utils/api";
import {useData} from "../../utils/hooks/useData";

const PAGINATION_INIT = {
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50', '100'],
  showTotal: (total, range) => {return `${range[0]}-${range[1]} of ${total} items`}
};

const SimpleTable = ({api, columns, module, button, actions=[], ...props}) => {
  const [ params, setParams ] = useState({});
  const [ tableState, setTableState ] = useStickyState({pagination: PAGINATION_INIT}, `ams-${module}-table`);

  const { data, loading, refresh} = useData(api, params);

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

  const getFooter = () => {
    return (
      <Row>
        <Col span={8}>
          <Link href={`/${module}/create`}>
            <Button type={'primary'}>
              {button}
            </Button>
          </Link>
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
          refresh();
        })
      }
    });
  };

  const onDelete = (id) => {
    showDeleteConfirm(id)
  };

  return (
    <React.Fragment>
      <TableFilters module={module} onFilterChange={handleFilterChange}/>
      <Table
        api={api}
        bordered={true}
        className={style.Table}
        rowKey={record => record.id}
        dataSource={data ? data.results : []}
        columns={getColumns(columns, actions, module, onDelete)}
        size={'small'}
        footer={() => getFooter()}
        loading={{
          spinning: loading,
          indicator: <LoadingOutlined/>,
        }}
        pagination={tableState['pagination']}
        onChange={handleTableChange}
      />
    </React.Fragment>
  )
};

export default SimpleTable;
