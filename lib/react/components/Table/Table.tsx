import React from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import type { TablePaginationConfig } from 'antd';
import type { ParamsType, CrudTableProps } from './typing';
import { parseDefaultColumnConfig, useFetchData } from './utils';

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
    rowKey,
    tableLayout,
    className: propsClassName,
    columns: propsColumns = [],
    pagination: propsPagination,
    request,
    params,
    defaultClassName,
    ...restProps
  } = props;

  const className = classNames(defaultClassName, propsClassName);
  const { sort, filter } = parseDefaultColumnConfig(propsColumns);

  const fetchPagination =
    typeof propsPagination === 'object'
      ? (propsPagination as TablePaginationConfig)
      : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };

  /** 收集组件触发请求action, 暂时忽略默认数据 */
  const action = useFetchData(
    request,
    { pageInfo: fetchPagination },
    sort,
    filter,
  );

  const getTableProps = () => ({
    ...restProps,
    className,
    dataSource: action.dataSource,
    columns: propsColumns,
  });

  return (
    <Table {...getTableProps()} rowKey={rowKey} tableLayout={tableLayout} />
  );
};

CrudTable.defaultProps = {
  defaultClassName: 'crud-table',
};

export default CrudTable;
