import { FCrud, ICrudToolbar } from '@fe-code/react';
import { Button } from 'antd';

const toolbar: ICrudToolbar<{}>[] = [
  {
    label: '添加',
    type: 'primary',
  },
  {
    label: '导出',
    type: 'ghost',
  },
  {
    label: '删除',
    type: 'dashed',
  },
  {
    render: (row) => {
      console.log(row);
      return <Button type="text">自定义按钮</Button>;
    },
  },
];

export default function ToolBarPage() {
  return (
    <>
      {/* 内置增删改 */}
      <FCrud.ToolBar
        batchOptions={toolbar}
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
          onReset: () => console.log('onReset'),
          onSearch: () => console.log('onSearch'),
        }}
        // selectedRowKeys={selectedRowKeys}
      />
    </>
  );
}
