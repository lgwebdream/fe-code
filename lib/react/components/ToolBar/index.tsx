import React, { useMemo } from 'react';
import classnames from 'classnames';
import BatchOperation from './BatchOperation';
import FilberSearch from './FilterSearch';
import { getClassName } from './utils';
import type {
  BatchOperationOptions,
  SearchOptions,
  ToolBarOptions,
} from './typing';

export interface ToolBarProps<T = unknown, VT = unknown> {
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  toolbarOptions?: ToolBarOptions<T>;
  batchOperationOptions?: BatchOperationOptions<T>;
  searchOptions?: SearchOptions<T, VT>;
}

const ToolBar = <T extends Object, VT>(props: ToolBarProps<T, VT>) => {
  const {
    selectedRowKeys,
    selectedRows,
    searchOptions,
    toolbarOptions,
    batchOperationOptions,
  } = props;

  const { prefixCls, style, className, render } = toolbarOptions || {};

  const nextClassName = classnames(
    getClassName('toolbar', prefixCls),
    className,
  );

  const nextStyle = useMemo(
    () => ({
      padding: 10,
      ...style,
    }),
    [style],
  );

  const dynamicRender = render?.({ selectedRowKeys, selectedRows });

  return (
    <div className={nextClassName} style={nextStyle}>
      {dynamicRender || (
        <>
          <FilberSearch<T, VT>
            options={searchOptions}
            selectedRowKeys={selectedRowKeys}
            selectedRows={selectedRows}
          />
          <BatchOperation<T>
            options={batchOperationOptions}
            selectedRowKeys={selectedRowKeys}
            selectedRows={selectedRows}
          />
        </>
      )}
    </div>
  );
};

ToolBar.BatchOperation = BatchOperation;
ToolBar.FilberSearch = FilberSearch;

export default ToolBar;
