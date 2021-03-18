import {Button, Col, Row, Table} from "antd";
import React, {useState, useEffect} from "react";
import {LoadingOutlined } from "@ant-design/icons";
import useStickyState from "../../utils/hooks/useStickyState";
import {createParams} from "./functions/createParams";
import {getColumns} from "./functions/getColumns";
import TableFilters from "./TableFilters";
import style from './Table.module.css';
import Link from "next/link";
import useSWR from "swr";
import {get} from "../../utils/api";

const PAGINATION_INIT = {
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50', '100'],
  showTotal: (total, range) => {return `${range[0]}-${range[1]} of ${total} items`}
};

const SimpleTable = ({api, columns, module, button, actions=[], ...props}) => {
  const [ params, setParams ] = useState({});
  const [ tableState, setTableState ] = useStickyState({pagination: PAGINATION_INIT}, `ams-${module}-table`);

  const { data, error } = useSWR([`/v1/accession/`, params], url => get(url, params));

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

  return (
    <React.Fragment>
      <TableFilters module={module} onFilterChange={handleFilterChange}/>
      <Table
        api={api}
        bordered={true}
        className={style.Table}
        rowKey={record => record.id}
        dataSource={data ? data.results : []}
        columns={getColumns(columns, actions, module)}
        size={'small'}
        footer={() => getFooter()}
        loading={{
          spinning: !data,
          indicator: <LoadingOutlined/>,
        }}
        pagination={tableState['pagination']}
        onChange={handleTableChange}
      />
    </React.Fragment>
  )
};

export default SimpleTable;
