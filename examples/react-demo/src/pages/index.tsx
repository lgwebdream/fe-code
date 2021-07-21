import {
  FCrud,
  ICrud,
  ICrudFormTypeEnum,
  ICurdContainerTypeEnum,
} from '@fe-code/react';
import { Button } from 'antd';
import request from 'umi-request';

const apiConfig = {
  add: '/api/json/add',
  edit: '/api/json/edit',
  delete: '/api/json/delete',
  export: '/api/json/export',
  list: '/api/json/list',
};

type IMember = {
  id?: number;
  title?: string;
  name?: string;
  age?: number;
};

const demoTable: ICrud<IMember> = {
  title: '人员管理',
  containerType: ICurdContainerTypeEnum.Modal,
  request: () =>
    request(apiConfig.list).then((res) => {
      return { rows: res.data.data };
    }),
  batchToolbar: [
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
  ],
  rowToolbar: [
    {
      label: '编辑',
    },
    {
      render: (row) => {
        console.log(row);
        return <div>行级操作</div>;
      },
    },
  ],
  columns: [
    { title: 'ID', dataIndex: 'id', readonly: true },
    {
      title: '姓名',
      dataIndex: 'name',
      type: ICrudFormTypeEnum.Text,
      rules: [{ message: '姓名不能为空', required: true }],
      isFilter: true,
    },
    { title: '年龄', dataIndex: 'age', type: ICrudFormTypeEnum.Number },
    { title: '地址', dataIndex: 'address', type: ICrudFormTypeEnum.Text },
    {
      title: '职位',
      dataIndex: 'title',
      type: ICrudFormTypeEnum.Select,
      isFilter: true,
      rules: [{ message: '职位不能为空', required: true }],
      config: {
        options: [
          { text: 'CTO', value: 'cto' },
          { text: 'COO', value: 'coo' },
          { text: 'CFO', value: 'cfo' },
        ],
      },
    },
  ],
};

export default function IndexPage() {
  return <FCrud {...demoTable} />;
}
