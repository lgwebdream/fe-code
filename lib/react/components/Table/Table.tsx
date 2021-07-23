import React, { useMemo } from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import type { TablePaginationConfig } from 'antd';
import type { ParamsType, CrudTableProps } from './Table.d';
import { useFetchData } from './utils';

export type ICrudTableProps<
  T extends Record<string, any>,
  U extends ParamsType,
  ValueType,
> = CrudTableProps<T, U, ValueType> & {
  defaultClassName?: string;
};

const CrudTable = <
  T extends Record<string, any>,
  U extends ParamsType,
  ValueType,
>(
  props: ICrudTableProps<T, U, ValueType>,
) => {
  const {
    className: propsClassName,
    pagination: propsPagination,
    request,
    params,
    defaultClassName,
  } = props;

  const className = useMemo(() => {
    return classNames(defaultClassName, propsClassName);
  }, [defaultClassName, propsClassName]);
  // const { sort, filter } = parseDefaultColumnConfig(propsColumns);

  const fetchPagination =
    typeof propsPagination === 'object'
      ? (propsPagination as TablePaginationConfig)
      : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };

  /** 收集组件触发请求action, 暂时忽略默认数据 */
  const action = useFetchData(request, { pageInfo: fetchPagination }, params);

  return (
    <Table {...props} className={className} dataSource={action.dataSource} />
  );
};

CrudTable.defaultProps = {
  defaultClassName: 'crud-table',
};

export default CrudTable;
