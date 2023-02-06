import React, {useState} from 'react';
import useStickyState from "./useStickyState";
import {createParams} from "../../components/Tables/functions/createParams";

const PAGINATION_INIT = {
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50', '100'],
  showTotal: (total, range) => {return `${range[0]}-${range[1]} of ${total} items`}
};

export const useTable = (module) => {
  const [ params, setParams ] = useState({});
  const [ tableState, setTableState ] = useStickyState({
    pagination: PAGINATION_INIT,
    expandedRows: []
  }, `ams-${module}-table`);

  const handleExpandedRowsChange = (expandedRows) => {
    setTableState(prevTableState => ({
      ...prevTableState,
      expandedRows: expandedRows
    }))
  };

  const handleDataChange = (total) => {
    setTableState(prevTableState => ({
      ...prevTableState,
      pagination: {
        ...prevTableState.pagination,
        total: total
      },
    }));
  };

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

  const handleFilterChange = (changedValues, allValues) => {
    if (Object.entries(allValues).length > 0) {

      // set pagination
      setTableState(prevTableState => ({
        ...prevTableState,
        pagination: {
          ...prevTableState.pagination,
          current: 1
        }
      }));

      setParams(Object.assign({}, allValues));
    }
  };

  const handleDelete = (dataLength) => {
    if(dataLength === 1) {
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

  return {
    params: params,
    tableState: tableState,
    handleExpandedRowsChange: handleExpandedRowsChange,
    handleDataChange: handleDataChange,
    handleTableChange: handleTableChange,
    handleFilterChange: handleFilterChange,
    handleDelete: handleDelete
  }
};
