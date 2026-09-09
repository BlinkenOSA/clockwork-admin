import {Button, Col, Modal, Row, Table} from "antd";
import React, {useEffect} from "react";
import {AiOutlineLoading } from "react-icons/ai";
import {getColumns} from "./functions/getColumns";
import TableFilters from "./TableFilters";
import style from './Table.module.scss';
import Link from "next/link";
import {remove} from "../../utils/api";
import {useTable} from "../../utils/hooks/useTable";
import {deleteAlert} from "./functions/deleteAlert";


const SimpleTable = ({
  api,
  columns,
  module,
  button,
  actions = [],
  footer = true,
  showFilters = true,
  numberRows = false,
  externalFilters,
  rowKey = (record) => record.id,
  onDataLoaded,
  ...props
}) => {
  const { data, loading, refresh, tableState,
    handleDataChange, handleTableChange, handleFilterChange, handleDelete, setFilters } = useTable(module, api);

  useEffect(() => {
    if (data) {
      handleDataChange(data.count)
    }
  }, [data]);

  useEffect(() => {
    if (onDataLoaded) {
      onDataLoaded(data);
    }
  }, [data, onDataLoaded]);

  useEffect(() => {
    if (externalFilters !== undefined) {
      setFilters(externalFilters);
    }
  }, [externalFilters]);

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

  const onDelete = (id) => {
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

  const currentPage = tableState?.pagination?.current || 1;
  const pageSize = tableState?.pagination?.pageSize || 10;
  const rowNumberOffset = (currentPage - 1) * pageSize;
  const results = Array.isArray(data?.results) ? data.results : [];
  const tableData = numberRows
    ? results.map((record, index) => ({
      ...record,
      __rowNumber: rowNumberOffset + index + 1
    }))
    : results;

  return (
    <React.Fragment>
      {
        showFilters &&
        <TableFilters
          module={module}
          onFilterChange={handleFilterChange}
          filters={tableState['filters']}
        />
      }
      <Table
        bordered={true}
        className={style.Table}
        rowKey={rowKey}
        dataSource={tableData}
        columns={getColumns(columns, actions, module, onDelete)}
        size={'small'}
        footer={footer ? () => getFooter() : false}
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

export default SimpleTable;
