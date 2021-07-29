import React, { CSSProperties } from 'react';
import { ButtonProps } from 'antd';
import { Rule } from 'antd/es/form/index.d';
import { ColumnType, SortOrder } from 'antd/lib/table/interface';
import type { CrudTableParams, CrudTableProps } from './Table/TableTypes';
import { IFormComTypeEnum } from './Form/constant';
import { IFormItemProps } from './Form/FormTypes';
import { FetcherResult } from './service';

/** 操作容器定义 */
export enum ICurdContainerTypeEnum {
  /** modal 弹框模式 */
  Modal = 'modal',
  /** panel 窗体模式 */
  Panel = 'panel',
}

/** 内置功能类型 */
export enum ICrudToolbarTypeEnum {
  /** 添加 */
  Add = 'add',
  /** 编辑 */
  Edit = 'edit',
  /** 删除 */
  Delete = 'delete',
  /** 批量删除 */
  DeleteBatch = 'deleteBatch',
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
  request?: (row: T[] | T, rowKey?: (string | number)[] | number) => Promise<T>;

  /** 覆盖渲染，优先级最高，覆盖 ToolbarType 内部定义方法 */
  render?: (
    row?: T | T[],
    index?: (string | number)[] | number,
  ) => React.ReactElement;
} & ButtonProps;

export type ICrudColumnToolbar<T = unknown> = {
  /** 内置绑定方法 */
  toolbarType?: ICrudToolbarTypeEnum;
} & ICrudToolbar<T>;

/** 字段定义 */
export interface ICrudColumn<T = unknown> extends ColumnType<T> {
  /** 属性名称 */
  title?: string;

  placeholder?: string;

  /** 属性字段名 */
  dataIndex: string;

  /** 表单条目属性 */
  itemProps?: IFormItemProps;

  /** 对应表单属性，以此同样可知晓其展示规则、表单展示规则 */
  type?: IFormComTypeEnum;

  /** 是否只读 */
  readonly?: boolean;

  /** 是否可筛选 */
  isFilter?: boolean;

  /** 下拉选项 */
  options?: { label: string; value: string }[];

  /** 校验规则，同 antd */
  rules?: Rule[];
}

/** 表格排序字段 */
export type ICrudListRequestSort = Record<string, SortOrder>;
/** 表格筛选字段ƒ */
export type ICrudListRequestFilter = Record<string, React.ReactText[] | null>;

/** 列表数据请求 Promise  */
export type ICrudListRequest<T extends Record<string, any>> = (
  params: CrudTableParams | T,
  sort?: ICrudListRequestSort,
  filter?: ICrudListRequestFilter,
) => Promise<FetcherResult<T>>;

/** CRUD 主体配置定义 */
export interface ICrud<T = unknown> {
  /** 业务标题，用作表单弹框、信息提示等场景展示 */
  title?: string;

  /** 表格其他属性扩展 */
  tableProps?: CrudTableProps<T, {}>;

  /** 操作容器类型 */
  containerType?: ICurdContainerTypeEnum;

  /** 列表数据请求 Promise */
  request?: ICrudListRequest<T>;

  /** toolbar 批量操作按钮 */
  batchToolbar?: ICrudColumnToolbar<T>[];

  /** toolbar 行级操作按钮 */
  rowToolbar?: ICrudColumnToolbar<T>[];

  /** 字段属性 */
  columns: ICrudColumn<T>[];
}

export interface ICrudActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: React.Key) => boolean;
  cancelEditable: (rowKey: React.Key) => boolean;
}