import { Button, ButtonProps } from 'antd';
import React, { useCallback } from 'react';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { getClassName } from './utils';
import type { BatchOperationOptions } from './typing';

export interface BatchOperationProps<T> {
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  options?: BatchOperationOptions<T>;
}

const BatchOperation = <T extends Object>(props: BatchOperationProps<T>) => {
  const { selectedRowKeys = [], selectedRows = [], options } = props;

  const {
    prefixCls,
    className,
    style,
    render,
    onAddRow,
    onDeleteRows,
    onModifyRows,
  } = options || {};

  const getButton = useCallback((bProps: ButtonProps & { key: string }) => {
    const { key, onClick, type, children, icon, danger, disabled } = bProps;

    return onClick ? (
      <Button
        key={key}
        onClick={onClick}
        type={type}
        icon={icon}
        danger={danger}
        disabled={disabled}
      >
        {children}
      </Button>
    ) : null;
  }, []);

  const nextClassName = classnames(
    getClassName('batch-operation', prefixCls),
    className,
  );

  const columns = [
    getButton({
      type: 'primary',
      children: '新增',
      icon: <PlusOutlined />,
      key: 'add',
      onClick: onAddRow,
    }),
    getButton({
      type: 'primary',
      children: '批量删除',
      disabled: !selectedRowKeys?.length,
      danger: true,
      icon: <DeleteOutlined />,
      key: 'delete',
      onClick: onDeleteRows,
    }),
    getButton({
      children: '批量修改',
      icon: <EditOutlined />,
      disabled: !selectedRowKeys?.length,
      key: 'modify',
      onClick: onModifyRows,
    }),
  ].filter(comp => comp);

  const dynamicRender = render?.({
    selectedRowKeys,
    selectedRows,
  });

  return (
    <div style={style} className={nextClassName}>
      {dynamicRender || columns.map(comp => comp)}
    </div>
  );
};

export default BatchOperation;
