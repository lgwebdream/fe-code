import React, { useMemo } from 'react';
import { Table } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';
import type { TablePaginationConfig } from 'antd';
import type { ParamsType, CrudTableProps } from './typing';
import { FetcherResult } from '../../service';
import { parseDefaultColumnConfig, useFetchData } from './utils';

const CrudTable = <
  T extends Record<string, any>,
  U extends ParamsType,
  ValueType,
>(
  props: CrudTableProps<T, U, ValueType> & {
    defaultClassName?: string;
  },
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

  /** 数据请求 */
  const fetchData = useMemo(() => {
    if (!request) return undefined;
    return async (pageParams?: Record<string, any>) => {
      const actionParams = {
        ...(pageParams || {}),
        ...params,
      };
      const response = await request(
        actionParams as unknown as U,
        sort,
        filter,
      );
      return response as FetcherResult<T>;
    };
  }, [params, request]);

  // /** 收集组件触发请求action, 暂时忽略默认数据 */
  const action = useFetchData(fetchData, {
    pageInfo: fetchPagination,
  });

  const getTableProps = () => ({
    ...restProps,
    className,
    dataSource: action.dataSource,
    columns: propsColumns,
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Table<T> {...getTableProps()} rowKey={rowKey} tableLayout={tableLayout} />
  );
};

CrudTable.defaultProps = {
  defaultClassName: 'crud-table',
};

export default CrudTable;
