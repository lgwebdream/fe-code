import React, { useMemo } from 'react';
import { Button } from 'antd';
import type { ICrudToolbar } from '..';

const { Group } = Button;

export interface BatchOperationProps<T> {
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  options?: ICrudToolbar<T>[];
}

const BatchOperation = <T extends Object>(props: BatchOperationProps<T>) => {
  const { selectedRows, selectedRowKeys, options } = props;

  const Buttons = useMemo(() => {
    return (
      <Group>
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
          return it.render ? (
            it.render()
          ) : (
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
          );
        })}
      </Group>
    );
  }, [options, selectedRows, selectedRowKeys]);

  return <div className="batch-operation">{Buttons}</div>;
};

export default BatchOperation;
