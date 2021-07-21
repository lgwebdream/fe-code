import { useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ToolBar from './ToolBar/index';

declare namespace API {
  type ListItem = {};
}

export default function ToolBarPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const onAddRow = () =>
    setSelectedRowKeys([Math.random()].concat(selectedRowKeys));

  const onDeleteRows = () =>
    setSelectedRowKeys(selectedRowKeys.slice(0, selectedRowKeys.length - 2));

  const onModifyRows = () => message.error('onModifyRow');

  return (
    <>
      {/* 内置增删改 */}
      <ToolBar<API.ListItem, unknown>
        batchOperationOptions={{
          onAddRow,
          onDeleteRows,
          onModifyRows,
        }}
        searchOptions={{
          columns: [
            {
              type: 'input',
              name: 'name',
              label: '姓名',
              options: {
                size: 'middle',
                placeholder: '请输入信息',
              },
              rules: [{ required: true, message: '请输入姓名' }],
            },
          ],
          onReset: () => console.log("onReset"),
          onSearch: () => console.log("onSearch")
        }}
        selectedRowKeys={selectedRowKeys}
      />
    </>
  );
}
