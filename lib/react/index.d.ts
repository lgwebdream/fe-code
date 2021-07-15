import React from 'react';
import { Rule } from 'antd/es/form/index.d';

/** 表单枚举类型 */
export enum ICrudFormTypeEnum {
  Text = 'text',
  Number = 'number',
  Select = 'select',
  Date = 'date',
  DateTime = 'datetime',
}

/** 操作类型枚举 */
export enum ICrudOperationTypeEnum {
  /** 添加 */
  Add = 'add',
  /** 编辑 */
  Edit = 'edit',
  /** 删除 */
  Delete = 'delete',
  /** 导出 */
  Export = 'export',
}

/** 操作容器定义 */
export enum ICurdContainerTypeEnum {
  /** modal 弹框模式 */
  Modal = 'modal',
  /** panel 窗体模式 */
  Panel = 'panel',
}

/** 操作按钮定义 */
export interface ICrudOperation<T> {
  /** 按钮文本展示 */
  label?: string;

  /** 图标展示 */
  icon?: string | React.ReactElement;

  /** 操作类型，内部定义 */
  operationType?: ICrudOperationTypeEnum;

  config?: {
    /** 请求 URL，用作请求数据 */
    url?: string;

    /** 内部操作，操作前回调 */
    before?: (row?: T) => void;

    /** 内部操作，操作后回调 */
    after?: (row?: T) => void;

    /** 格式化返回 */
    formatter?: (result: any) => T | unknown;
  };

  /** 覆盖渲染，优先级最高，覆盖 operationType 内部定义方法 */
  render?: (row?: T, index?: number) => React.ReactElement;
}

/** 字段定义 */
export interface ICrudField<T> {
  /** 属性名称 */
  label?: string;

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
  };

  /** 校验规则，同 antd */
  rules?: Rule[];

  /** 覆盖渲染，优先级最高 */
  render?: (row: T, index?: number) => string | React.ReactElement;
}

export interface ICrudListConfig<T> {
  /** 主键，作用行级索引，以及接口请求主键 */
  primaryKey: string | number;

  /** 优先级高，动态数据，请求列表 URL */
  url?: string;

  /** 静态数据 */
  data?: T[];

  /** 格式化返回数据 */
  formatter?: (result: T) => { rows: T[]; total: number };
}

// 支持的组件类型，后续扩充统一维护
export type SchemaComponentTypes =
  | 'form'
  | 'button'
  | 'table'
  | 'select'
  | 'page'
  | undefined;

/** CRUD 主体配置定义 */
export declare interface ICrud<T> {
  /** 业务组件标识 */
  type: SchemaComponentTypes;

  /** 业务标题，用作表单弹框、信息提示等场景展示 */
  title?: string;

  /** 页面渲染内容 */
  body: {
    /** 列表数据配置 */
    listConfig: ICrudListConfig<T>;

    /** 操作容器类型 */
    containerType?: ICurdContainerTypeEnum;

    /** 批量操作按钮 */
    batchOperations?: ICrudOperation<T>[];

    /** 行级操作按钮 */
    rowOperations?: ICrudOperation<T>[];

    /** 头部操作按钮 */
    headOperations?: ICrudOperation<T>[];

    /** 字段属性 */
    fields: ICrudField<T>[];
  };
}

/** 操作类型 */

export type ActionType = {
  /** 刷新 */
  reload: (resetPageIndex?: boolean) => void;
  /** 重置 */
  reset?: () => void;
  /** 清空选择 */
  clearSelected?: () => void;
};
