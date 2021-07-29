import { TableProps, SpinProps } from 'antd';
import type { ColumnType } from 'antd/lib/table/interface';
import type { CSSProperties } from 'react';
import type { ICrudListRequest } from '../CrudTypes';

export type ParamsType = Record<string, any>;

/** 操作类型 */
export type ActionType<T = {}> = {
  /** 刷新 */
  reload: (resetRowSelected?: boolean) => void;
  /** 刷新并且重置 */
  reloadAndRest?: () => void;
  /** @name 清空选择 */
  clearSelected?: () => void;
} & T;

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

  /** 内置action，可以手动操作table */
  actionRef?: React.MutableRefObject<ActionType | undefined> | ((actionRef: ActionType) => void);

  tableExtraRender?: (
    props: CrudTableProps<T, U, ValueType>,
    dataSource: T[],
  ) => React.ReactNode;

  /** 一个获得 dataSource 的方法 */
  request?: ICrudListRequest<T>;

  /** 对数据进行一些处理 */
  postData?: (data: any[]) => any[];
  /** 默认的数据 */
  defaultData?: T[];

  /** 渲染操作栏 */
  // toolBarRender?: ToolBarProps<T>['toolBarRender'] | false;

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
  rowSelection?: TableProps<T>['rowSelection'];

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

export type CrudTableParams = {
  current?: number;
  pageSize?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
};

export type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export type UseFetchActions = {
  pageInfo: CrudTableParams;
  dataSource?: any;
  effects?: any[];
  setPageInfo?: (pageInfo: Partial<PageInfo>) => void;
  reload?: () => Promise<void>;
  onPageInfoChange?: (pageInfo: PageInfo) => void;
  onDataSourceChange?: (dataSource?: any) => void;
  onRequestError?: (e: Error) => void;
};
