/** CRUD 主体配置定义 */
export interface ICrud<P = unknown, R = unknown> {
  /** 业务标题，用作表单弹框、信息提示等场景展示 */
  title?: string;

  /** toolbar 批量操作按钮 */
  batchToolbar?: ICrudColumnToolbar[];

  /** 列表数据请求 Promise */
  request?: ICrudListRequest<P, R>;

  /** 字段属性 */
  columns: ICrudColumn[];
}

/** 列表数据请求 Promise  */
export type ICrudListRequest<P, R> = (params: P) => Promise<R>;

/** 字段定义 */
export interface ICrudColumn {
  /** 属性名称 */
  title?: string;

  placeholder?: string;

  /** 属性字段名 */
  dataIndex: string;

  /** 是否只读 */
  readonly?: boolean;
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
