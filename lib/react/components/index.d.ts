import React, { CSSProperties } from 'react';
import { ButtonProps } from 'antd';
import { Rule } from 'antd/es/form/index.d';
import { ColumnType, SortOrder } from 'antd/lib/table/interface';
import type { CrudTableParams, CrudTableProps } from './Table/typing';
import { ToolBarProps } from './ToolBar';

/** 表单枚举类型 */
export enum ICrudFormTypeEnum {
  Text = 'text',
  Number = 'number',
  Select = 'select',
  Date = 'date',
  DateTime = 'datetime',
}

/** 操作容器定义 */
export enum ICurdContainerTypeEnum {
  /** modal 弹框模式 */
  Modal = 'modal',
  /** panel 窗体模式 */
  Panel = 'panel',
}

/** 操作按钮定义 */
export type ICrudToolbar<T = unknown> = {
  style?: CSSProperties;
  className?: string;
  prefixCls?: string;
  key?: string;

  /** 按钮文本展示 */
  label?: string;

  /** 图标展示 */
  icon?: React.ReactElement;

  /** 请求 Promise */
  request?: (
    selectedRows: T[],
    selectedRowKeys?: (string | number)[],
  ) => Promise<T>;

  /** 覆盖渲染，优先级最高，覆盖 ToolbarType 内部定义方法 */
  render?: (row?: T, index?: number) => React.ReactElement;
} & ButtonProps;

/** 字段定义 */
export interface ICrudField<T> extends ColumnType<T> {
  /** 属性名称 */
  title?: string;

  /** 属性字段名 */
  dataIndex: string;

  /** 对应表单属性，以此同样可知晓其展示规则、表单展示规则 */
  type?: ICrudFormTypeEnum;

  /** 是否只读 */
  readonly?: boolean;

  /** 是否可筛选 */
  isFilter?: boolean;

  /** 公共配置读取 */
  config?: {
    /** 下拉选项 */
    options?: { text: string; value: string }[];

    /** 其他待扩展 */
    request?: () => Promise<{ text: string; value: string }[]>;
  };

  /** 校验规则，同 antd */
  rules?: Rule[];
}

export type ICrudListRequestSort = Record<string, SortOrder>;
export type ICrudListRequestFilter = Record<string, React.ReactText[] | null>;

/** 列表数据请求 Promise  */
export type ICrudListRequest<T extends Record<string, any>> = (
  params: CrudTableParams | T,
  sort?: ICrudListRequestSort,
  filter?: ICrudListRequestFilter,
) => Promise<{
  rows: T[];
  total?: number;
  page?: number;
  pageCount?: number;
}>;

/** CRUD 主体配置定义 */
export interface ICrud<T> {
  /** 业务标题，用作表单弹框、信息提示等场景展示 */
  title?: string;

  /** toolbar 其他属性扩展 */
  toolbarProps?: ToolBarProps<T>;

  /** 表格其他属性扩展 */
  tableProps?: CrudTableProps<T, {}>;

  /** 操作容器类型 */
  containerType?: ICurdContainerTypeEnum;

  /** 列表数据请求 Promise */
  request?: ICrudListRequest<T>;

  /** toolbar 批量操作按钮 */
  batchToolbar?: ICrudToolbar<T>[];

  /** toolbar 行级操作按钮 */
  rowToolbar?: ICrudToolbar<T>[];

  /** 字段属性 */
  columns: ICrudField<T>[];
}
