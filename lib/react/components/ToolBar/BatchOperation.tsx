import React from 'react';
import { Button } from 'antd';
import type { ICrudToolbar } from '..';

export interface BatchOperationProps<T> {
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  options?: ICrudToolbar<T>[];
}

const BatchOperation = <T extends Object>(props: BatchOperationProps<T>) => {
  const { selectedRows, selectedRowKeys, options } = props;

  // const nextClassName = classnames(
  //   getClassName('batch-operation', prefixCls),
  //   className,
  // );

  // const columns = [
  //   getButton({
  //     type: 'primary',
  //     children: '新增',
  //     icon: <PlusOutlined />,
  //     key: 'add',
  //     onClick: onAddRow,
  //   }),
  //   getButton({
  //     type: 'primary',
  //     children: '批量删除',
  //     disabled: !selectedRowKeys?.length,
  //     danger: true,
  //     icon: <DeleteOutlined />,
  //     key: 'delete',
  //     onClick: onDeleteRows,
  //   }),
  //   getButton({
  //     children: '批量修改',
  //     icon: <EditOutlined />,
  //     disabled: !selectedRowKeys?.length,
  //     key: 'modify',
  //     onClick: onModifyRows,
  //   }),
  // ].filter(comp => comp);

  // const dynamicRender = render?.({
  //   selectedRowKeys,
  //   selectedRows,
  // });

  return (
    <div className="batch-operation">
      {/* {dynamicRender || columns.map(comp => comp)} */}
      {options?.map((it, idx) => {
        const {
          key,
          type,
          label,
          children,
          icon,
          danger,
          disabled,
          style,
          className,
          onClick,
          request,
        } = it;
        return (
          it.render || (
            <Button
              className={className}
              style={style}
              key={key || `${Date.now()}-${idx}`}
              onClick={
                onClick ||
                (request ? () => request(selectedRows, selectedRowKeys) : null)
              }
              type={type}
              icon={icon}
              danger={danger}
              disabled={disabled}
            >
              {label || children}
            </Button>
          )
        );
      })}
    </div>
  );
};

export default BatchOperation;
