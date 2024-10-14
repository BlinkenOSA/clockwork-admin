export const createParams = ({ pagination={}, filters={}, ...sorter}) => {
  let paginationParams, sorterParams = {};

  // Sorting
  const createSortParams = (sorter) => {
    const {columnKey, order, column} = sorter;
    if (columnKey && column) {
      if (column.hasOwnProperty('sortKeys')) {
        return {ordering: order === 'ascend' ? `${column.sortKeys.join(',')}` : `-${column.sortKeys.join(',')}`}
      } else {
        return {ordering: order === 'ascend' ? `${columnKey}` : `-${columnKey}`}
      }
    }
  };

  if (Object.entries(sorter).length > 0) {
    const {columnKey} = sorter;
    if (columnKey) {
      sorterParams = createSortParams(sorter);
    }
  }

  // Pagination
  const loadPagination = (pagination) => {
    const {pageSize, current} = pagination;
    return {
      limit: pageSize,
      offset: (current - 1) * pageSize
    }
  };

  const {current} = pagination;
  if (current) {
    paginationParams = loadPagination(pagination);
  }

  return Object.assign({}, paginationParams, sorterParams, filters);
};
