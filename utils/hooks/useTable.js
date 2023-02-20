import React, {useEffect, useState} from 'react';
import useStickyState from "./useStickyState";
import {createParams} from "../../components/Tables/functions/createParams";
import {useDeepCompareEffect} from "react-use";
import {useData} from "./useData";
import {get} from "../api";

const PAGINATION_INIT = {
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '50', '100'],
  showTotal: (total, range) => {return `${range[0]}-${range[1]} of ${total} items`}
};

export const useTable = (module, api) => {
  const [ params, setParams ] = useState(undefined);
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState([]);

  const [ tableState, setTableState ] = useStickyState({
    filters: {},
    pagination: PAGINATION_INIT,
    expandedRows: []
  }, `ams-${module}-table`);

  useEffect(() => {
    if (params) {
      fetchData()
    }
  }, [params])

  useDeepCompareEffect(() => {
    setParams(Object.assign({}, params, createParams(tableState)));
  }, [tableState])

  const fetchData = () => {
    get(api, params).then(response => {
      setLoading(false);
      setData(response.data)
    }).catch(error => {
      setData(undefined);
      setLoading(false);
    })
  }

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
  };

  const handleFilterChange = (changedValues, allValues) => {
    if (Object.entries(allValues).length > 0) {

      // set pagination
      setTableState(prevTableState => ({
        ...prevTableState,
        pagination: {
          ...prevTableState.pagination,
          current: 1
        },
        filters: allValues
      }));
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
    data: data,
    loading: loading,
    refresh: fetchData,
    tableState: tableState,
    handleExpandedRowsChange: handleExpandedRowsChange,
    handleDataChange: handleDataChange,
    handleTableChange: handleTableChange,
    handleFilterChange: handleFilterChange,
    handleDelete: handleDelete
  }
};
