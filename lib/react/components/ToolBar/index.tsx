import React, { ReactElement, useCallback, useMemo } from 'react';
import { Button, ButtonProps } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { SearchProps } from 'antd/lib/input';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

type SearchPropType = SearchProps | React.ReactNode | boolean;

export type ListToolBarProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** 标题 */
  title?: React.ReactNode;
  /** 副标题 */
  subTitle?: React.ReactNode;
  /** 标题提示 */
  tooltip?: string | LabelTooltipType;
  /** 搜索输入栏相关配置 */
  search?: SearchPropType;
  /** 搜索回调 */
  onSearch?: (keyWords: string) => void;
  /** 工具栏右侧操作区 */
  actions?: React.ReactNode[];
  /** 是否多行展示 */
  multipleLine?: boolean;
  /** 过滤区，通常配合 LightFilter 使用 */
  filter?: React.ReactNode;
};

export type ToolBarProps<T = unknown> = {
  headerTitle?: React.ReactNode;
  tooltip?: string | LabelTooltipType;
  /** @deprecated 你可以使用 tooltip，这个更改是为了与 antd 统一 */
  tip?: string;
  toolbar?: ListToolBarProps;
  toolBarRender?: (rows: {
    selectedRowKeys?: (string | number)[];
    selectedRows?: T[];
  }) => ReactElement;
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  className?: string;
  onSearch?: () => void;
  onAddRow?: () => void;
  onDeleteRows?: () => void;
  onModifyRows?: () => void;
};

export default function ToolBar<T>(props: ToolBarProps<T>) {
  const {
    toolbar,
    selectedRowKeys,
    selectedRows,
    toolBarRender,
    onAddRow,
    onDeleteRows,
    onModifyRows,
  } = props;

  const getClassName = useCallback(
    (suffixCls: string, prefixCls?: string) =>
      prefixCls ? `${prefixCls}-${suffixCls}` : suffixCls,
    [],
  );

  const getButton = useCallback((props: ButtonProps & { key: string }) => {
    const { key, onClick, ...rest } = props;

    return onClick ? <Button {...rest} key={key} onClick={onClick} /> : null;
  }, []);

  const className = getClassName('toolbar', toolbar?.prefixCls);

  const rending = toolBarRender?.({ selectedRowKeys, selectedRows });

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
  ];

  const style = useMemo(
    () => ({
      padding: 10,
      ...(toolbar?.style ?? {}),
    }),
    [toolbar?.style],
  );

  return (
    <div className={className} style={style}>
      {rending ? rending : columns.map(comp => comp)}
    </div>
  );
}
