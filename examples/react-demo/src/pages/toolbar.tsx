import FCrud from '@fe-code/react';
import { useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

declare namespace API {
  type ListItem = {};
}

export default function ToolBarPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const onAddRow = () =>
    setSelectedRowKeys([Math.random()].concat(selectedRowKeys));

  const onDeleteRow = () =>
    setSelectedRowKeys(selectedRowKeys.slice(0, selectedRowKeys.length - 2));

  const onModifyRow = () => message.error('onModifyRow');

  const toolBarRender = (rows: {
    selectedRowKeys?: (string | number)[];
    selectedRows?: API.ListItem[];
  }) => {
    return (
      <>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddRow}>
          新增
        </Button>

        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          disabled={!rows.selectedRowKeys?.length}
          onClick={onDeleteRow}
        >
          批量删除
        </Button>

        <Button
          icon={<EditOutlined />}
          disabled={!rows.selectedRowKeys?.length}
          onClick={onModifyRow}
        >
          批量修改
        </Button>
      </>
    );
  };

  return (
    <>
      {/* 内置增删改 */}
      <FCrud.ToolBar<API.ListItem>
        onAddRow={onAddRow}
        onDeleteRows={onDeleteRow}
        onModifyRows={onModifyRow}
        selectedRowKeys={selectedRowKeys}
      />

      {/* 动态渲染 */}
      <FCrud.ToolBar<API.ListItem>
        toolBarRender={toolBarRender}
        selectedRowKeys={selectedRowKeys}
      />
    </>
  );
}
