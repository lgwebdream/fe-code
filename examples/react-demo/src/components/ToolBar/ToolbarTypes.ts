import React, { CSSProperties, ReactElement } from 'react';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import { ICrudColumn, ICrudToolbar } from '../CrudTypes';

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

export interface SearchOptions<T = unknown> {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  columns?: ICrudColumn<T>[];
  onSearch?: (values: T) => void;
  onReset?: () => void;
  render?: () => ReactElement;
}

export interface ToolBarProps<T = unknown> {
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  toolbarOptions?: ToolBarOptions<T>;
  batchOptions?: ICrudToolbar<T>[];
  searchOptions?: SearchOptions<T>;
}
