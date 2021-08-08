import { IFormComTypeEnum } from './Table/Form/constant';

/** CRUD 主体配置定义 */
export interface ICrud<P = unknown, R = ListResBody, T = unknown> {
  /** 业务标题，用作表单弹框、信息提示等场景展示 */
  title?: string;

  /** toolbar 批量操作按钮 */
  batchToolbar?: ICrudColumnToolbar<T>[];

  /** 列表数据请求 Promise */
  request?: ICrudListRequest<P, R>;

  /** 字段属性 */
  columns: ICrudColumn[];

  /** 搜索 */
  // searchConfigs: ISearch[];

  /** 是否可筛选 */
  isFilter?: boolean;
}

/** list接口请求参数 */
export interface IListRequestParams {
  [key: string]: any;
  pageSize?: number;
  current?: number;
}

/** 列表接口返回数据 */
export type ListResBody = {
  code: number;
  data: ListResData[];
};

export interface ListResData {
  id: number;
  key: number;
  name: string;
  age: number;
  score: number;
  level: number;
  birthday: string;
  address: string;
  description: string;
  title: string;
  department: string;
  mapping: string;
  flag: false;
  tags: string[];
}

/** 列表数据请求 Promise  */
export type ICrudListRequest<P, R> = (params: P) => Promise<R>;

/** 表头字段定义 */
export interface ICrudColumn {
  /** 属性名称 */
  title?: string;

  placeholder?: string;

  /** 属性字段名 */
  dataIndex: string;

  /** 是否隐藏 */
  isHide?: boolean;

  /** 自定义显示内容 */
  render?: (value?: unknown) => string;

  /** 是否只读 */
  readonly?: boolean;

  /** form表单类型 */
  type?: IFormComTypeEnum;

  /** 排序 */
  sorter?: SorterResult;

  /** 是否可筛选 */
  isFilter?: boolean;

  /** 下拉选项 不能单纯的用label value 如Cascader */
  options?: any[];

  /** 校验规则，同 antd */
  rules?: any[];
}

export interface SorterResult {
  compare?: (a: ListResData, b: ListResData) => number;
}

export type ICrudColumnToolbar<T = unknown> = {
  /** 内置绑定方法 */
  toolbarType?: ICrudToolbarTypeEnum;
} & ICrudToolbar<T>;

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

/** form item 类型 */
export enum ICurdFromItemTypeEnum {
  Input = 'input',
  Select = 'select',
  Picker = 'picker',
}

/** 操作按钮定义 */
export type ICrudToolbar<T = unknown> = {
  className?: string;
  key?: string;

  /** 按钮文本展示 */
  label?: string;
  type?: string;

  plain?: boolean;

  /** 请求 Promise */
  request?: (row: T[] | T, rowKey?: (string | number)[] | number) => Promise<T>;

  /** 覆盖渲染，优先级最高，覆盖 ToolbarType 内部定义方法 */
  render?: (row?: T | T[], index?: (string | number)[] | number) => any;
};

export type ISearch = {
  type: string;
  label: string;
  value: string;
  prop: string;
  placeholder: string;
  dataType?: string;
  data?: Array<any>;
};
