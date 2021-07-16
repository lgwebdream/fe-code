import React, { useEffect, useMemo } from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import type { ParamsType, CrudTableProps } from './typing';
import { FetcherResult } from '../../service';
import { parseDefaultColumnConfig } from './utils';

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
    request,
    params,
    defaultClassName,
    ...restProps
  } = props;

  const className = classNames(defaultClassName, propsClassName);
  const { sort, filter } = parseDefaultColumnConfig(propsColumns);

  const getTableProps = () => ({
    ...restProps,
    className,
    columns: propsColumns,
  });

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table<T> {...getTableProps()} rowKey={rowKey} tableLayout={tableLayout} />
  );
};

CrudTable.defaultProps = {
  defaultClassName: 'crud-table',
};

export default CrudTable;
