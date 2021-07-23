import React, { useMemo } from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import type { TablePaginationConfig } from 'antd';
import type {
  TableCurrentDataSource,
  SorterResult,
} from 'antd/lib/table/interface';
import type { ParamsType, CrudTableProps } from './Table.d';
import { useFetchData, parseDefaultColumnConfig } from './utils';
import { FetcherResult } from '../../service';

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
    columns: propsColumns,
    request,
    defaultData,
    params = {},
    defaultClassName,
    ...restProps
  } = props;

  const className = useMemo(() => {
    return classNames(defaultClassName, propsClassName);
  }, [defaultClassName, propsClassName]);
  const { sort, filter } = parseDefaultColumnConfig(propsColumns);

  const fetchPagination =
    typeof propsPagination === 'object'
      ? (propsPagination as TablePaginationConfig)
      : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 };

  /** 列表页刷新请求统一入口 */
  const fetchData = useMemo(() => {
    if (!request) return undefined;
    return async (pageParams?: Record<string, any>) => {
      /** 合并table额外的params, eg：表单联动 */
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
  }, [params, filter, sort, request]);

  /** 收集组件触发请求的action, 内建业务模块代码 */
  const action = useFetchData(fetchData, defaultData, {
    pageInfo: fetchPagination,
    dataSource: props.dataSource,
    effects: [JSON.stringify(params)],
    onPageInfoChange: pageInfo => {
      if (propsPagination) {
        propsPagination?.onChange?.(pageInfo.current, pageInfo.pageSize);
      }
    },
  });

  /** 合并外置props,只接管业务逻辑，对其他属性只做代理 */
  const getTableProps = () => ({
    ...restProps,
    className,
    // pagination,
    dataSource: action.dataSource,
    columns: propsColumns,
    onChange: (
      changePagination: TablePaginationConfig,
      filters: Record<string, (React.Key | boolean)[] | null>,
      sorter: SorterResult<T> | SorterResult<T>[],
      extra: TableCurrentDataSource<T>,
    ) => {
      restProps.onChange?.(changePagination, filters, sorter, extra);
    },
  });

  return <Table {...getTableProps()} className={className} />;
};

CrudTable.defaultProps = {
  defaultClassName: 'crud-table',
};

export default CrudTable;
