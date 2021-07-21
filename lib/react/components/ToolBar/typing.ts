import { CheckboxProps, InputProps, SelectProps, FormItemProps } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import React, { CSSProperties, ReactElement } from 'react';

export interface ToolBarOptions<T> {
  headerTitle?: React.ReactNode;
  tooltip?: string | LabelTooltipType;
  tip?: string;
  className?: string;
  style?: CSSProperties;
  prefixCls?: string;
  render?: (rows: {
    selectedRowKeys?: (string | number)[];
    selectedRows?: T[];
  }) => ReactElement;
}

// export interface BatchOperationOptions<T> extends ICrudToolbar<T> {
//   style?: CSSProperties;
//   className?: string;
//   prefixCls?: string;
//   key?: string;
//   // onAddRow?: () => void;
//   // onDeleteRows?: () => void;
//   // onModifyRows?: () => void;
//   // render?: (rows: {
//   //   selectedRowKeys?: (string | number)[];
//   //   selectedRows?: T[];
//   // }) => ReactElement;
// }

export interface SearchOptions<T, VT> {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  columns?: FormItemOptions<VT>[];
  onSearch?: (values: Object) => void;
  onReset?: () => void;
  render?: (rows: {
    selectedRowKeys?: (string | number)[];
    selectedRows?: T[];
  }) => ReactElement;
}

export type FormItemType = 'input' | 'checkbox' | 'select';

export type FormElementOptions<VT> = InputProps &
  CheckboxProps &
  SelectProps<VT>;

export interface FormItemOptions<VT> extends FormItemProps {
  label?: string;
  name: string;
  type: FormItemType;
  options: FormElementOptions<VT>;
}
