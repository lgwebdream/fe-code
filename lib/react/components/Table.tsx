import React from 'react';
import { Table, TableProps, SpinProps } from 'antd';
import type { ColumnType, SortOrder } from 'antd/lib/table/interface';
import type { CSSProperties } from 'react';
import { FetcherResult } from '../service';
import { ToolBarProps } from './ToolBar';

type ParamsType = Record<string, any>;

export type CrudTableProps<T, U extends ParamsType, ValueType = 'text'> = {
  columns?: ColumnType<T>[];

  params?: U;

  columnsStateMap?: Record<string, ColumnType<T>>;

  onColumnsStateChange?: (map: Record<string, ColumnType<T>>) => void;

  onSizeChange?: (size: 'small' | 'middle' | 'large' | undefined) => void;

  /** 渲染 table */
  tableRender?: (
    props: CrudTableProps<T, U, ValueType>,
    defaultDom: JSX.Element,
    /** 各个区域的 dom */
    domList: {
      toolbar: JSX.Element | undefined;
      alert: JSX.Element | undefined;
      table: JSX.Element | undefined;
    },
  ) => React.ReactNode;

  tableExtraRender?: (
    props: CrudTableProps<T, U, ValueType>,
    dataSource: T[],
  ) => React.ReactNode;

  /** 一个获得 dataSource 的方法 */
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[] | null>,
  ) => Promise<Partial<FetcherResult<T>>>;

  /** 对数据进行一些处理 */
  postData?: (data: any[]) => any[];
  /** 默认的数据 */
  defaultData?: T[];

  /** 渲染操作栏 */
  toolBarRender?: ToolBarProps<T>['toolBarRender'] | false;

  /** 数据加载完成后触发 */
  onLoad?: (dataSource: T[]) => void;

  /** loading 被修改时触发，一般是网络请求导致的 */
  onLoadingChange?: (loading: boolean | SpinProps | undefined) => void;

  /** 数据加载失败时触发 */
  onRequestError?: (e: Error) => void;

  /** 给封装的 table 的 className */
  tableClassName?: string;

  /** 给封装的 table 的 style */
  tableStyle?: CSSProperties;

  /** 左上角的 title */
  headerTitle?: React.ReactNode;

  /**  是否显示搜索表单 */
  search?: false;

  /** 格式化搜索表单提交数据 */
  beforeSearchSubmit?: (params: Partial<U>) => any;

  /** 选择项配置 */
  rowSelection?: TableProps<T>['rowSelection'] | false;

  style?: React.CSSProperties;

  /** 提交表单时触发 */
  onSubmit?: (params: U) => void;

  /** 重置表单时触发 */
  onReset?: () => void;

  /** 空值时显示 */
  columnEmptyText?: string;

  /** 是否手动触发请求 */
  manualRequest?: boolean;

  /** 可编辑表格修改数据的改变 */
  onDataSourceChange?: (dataSource: T[]) => void;

  /** Debounce time */
  debounceTime?: number;
} & Omit<TableProps<T>, 'columns' | 'rowSelection'>;

const CrudTable = <
  T extends Record<string, any>,
  U extends ParamsType,
  ValueType,
>(
  props: CrudTableProps<T, U, ValueType>,
) => {
  const { rowKey, tableLayout, columns: propsColumns = [] } = props;

  return (
    <Table<T>
      columns={propsColumns}
      rowKey={rowKey}
      tableLayout={tableLayout}
    />
  );
};

export default CrudTable;
