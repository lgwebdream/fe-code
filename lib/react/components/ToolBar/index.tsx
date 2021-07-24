import React, { useMemo } from 'react';
import classnames from 'classnames';
import BatchOperation from './BatchOperation';
import FilberSearch from './FilterSearch';
import { getClassName } from './utils';
import { ToolBarProps } from './ToolBar';

const ToolBar = (props: ToolBarProps) => {
  const {
    selectedRowKeys,
    selectedRows,
    searchOptions,
    toolbarOptions,
    batchOptions,
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
          <FilberSearch {...searchOptions} />
          <BatchOperation
            options={batchOptions}
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
