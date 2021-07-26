import React, { useMemo } from 'react';
import { Button } from 'antd';
import type { ICrudToolbar } from '../CrudTypes';

const { Group } = Button;

export interface BatchOperationProps<T> {
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  options?: ICrudToolbar<T>[];
}

export function BatchButtonGroup<T>({
  options,
  args,
}: {
  options: ICrudToolbar<T>[];
  args: { row: T[] | T; rowKey?: (string | number)[] | number };
}) {
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
          <span key={key || `${Date.now()}-${idx}`.toString()}>
            {it.render(args.row, args.rowKey)}
          </span>
        ) : (
          <Button
            className={className}
            style={style}
            key={key || `${Date.now()}-${idx}`.toString()}
            onClick={
              onClick || (request ? () => request(args.row, args.rowKey) : null)
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
}

const BatchOperation = <T extends Object>(props: BatchOperationProps<T>) => {
  const { selectedRows, selectedRowKeys, options } = props;

  const Buttons = useMemo(() => {
    return (
      <BatchButtonGroup
        options={options}
        args={{ row: selectedRows, rowKey: selectedRowKeys }}
      />
    );
  }, [options, selectedRows, selectedRowKeys]);

  return <div className="batch-operation">{Buttons}</div>;
};

export default BatchOperation;
