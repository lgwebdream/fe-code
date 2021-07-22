import { Button } from 'antd';
import { FCrud, ICrudToolbar, IFormComTypeEnum } from '@crud';

const toolbar: ICrudToolbar[] = [
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

const columns = [
  { title: 'ID', dataIndex: 'id', readonly: true },
  {
    title: '姓名',
    dataIndex: 'name',
    type: IFormComTypeEnum.Input,
    rules: [{ message: '姓名不能为空', required: true }],
  },
  {
    title: '年龄',
    dataIndex: 'age',
    type: IFormComTypeEnum.InputNumber,
  },
  { title: '地址', dataIndex: 'address', type: IFormComTypeEnum.Input },
  {
    title: '职位',
    dataIndex: 'title',
    type: IFormComTypeEnum.Select,
    rules: [{ message: '职位不能为空', required: true }],
    options: [
      { label: 'CTO', value: 'cto' },
      { label: 'COO', value: 'coo' },
      { label: 'CFO', value: 'cfo' },
    ],
  },
];

export default function ToolBarPage() {
  return (
    <FCrud.ToolBar
      batchOptions={toolbar}
      searchOptions={{
        columns,
        onReset: () => console.log('onReset'),
        onSearch: () => console.log('onSearch'),
      }}
    />
  );
}
