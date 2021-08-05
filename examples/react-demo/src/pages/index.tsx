import { Button, message } from 'antd';
import request from 'umi-request';
import {
  FCrud,
  ICrud,
  ICrudToolbarTypeEnum,
  ICurdContainerTypeEnum,
  IFormComTypeEnum,
} from '@crud/components/index';

const apiConfig = {
  add: '/api/json/add',
  edit: '/api/json/edit',
  delete: '/api/json/delete',
  list: '/api/json/list',
};

const demoTable: ICrud = {
  title: '人员管理',
  containerType: ICurdContainerTypeEnum.Modal,
  tableProps: { size: 'middle' },
  request: (params) =>
    request(apiConfig.list, { method: 'post', data: params }),
  batchToolbar: [
    {
      label: '添加',
      type: 'primary',
      toolbarType: ICrudToolbarTypeEnum.Add,
      request: (row) =>
        request(apiConfig.add, { method: 'post', data: row }).then(() => {
          message.success('添加成功');
        }),
    },
    {
      label: '删除',
      type: 'ghost',
      danger: true,
      toolbarType: ICrudToolbarTypeEnum.Delete,
      request: (row) =>
        request(apiConfig.delete, { method: 'post', data: row }).then(() => {
          message.success('删除成功');
        }),
    },
    {
      label: '批量删除',
      type: 'dashed',
      danger: true,
      toolbarType: ICrudToolbarTypeEnum.DeleteBatch,
      request: (row) =>
        request(apiConfig.delete, { method: 'post', data: row }).then(() => {
          message.success('删除成功');
        }),
    },
    {
      render: (rows, rowKeys) => {
        return (
          <Button type="text" onClick={() => message.warning('自定义事件处理')}>
            自定义按钮
          </Button>
        );
      },
    },
  ],
  rowToolbar: [
    {
      label: '编辑',
      type: 'link',
      toolbarType: ICrudToolbarTypeEnum.Edit,
      request: (row) =>
        request(apiConfig.edit, { method: 'post', data: row }).then(() => {
          message.success('编辑成功');
        }),
    },
    {
      label: '删除',
      type: 'link',
      danger: true,
      toolbarType: ICrudToolbarTypeEnum.Delete,
      request: (row) =>
        request(apiConfig.delete, { method: 'post', data: row }).then(() => {
          message.success('删除成功');
        }),
    },
    {
      render: (row, index) => {
        return (
          <Button
            type="link"
            onClick={() => {
              message.warning('自定义事件处理');
              console.log(1111, row, index);
            }}
          >
            行级操作
          </Button>
        );
      },
    },
  ],
  columns: [
    { title: 'ID', dataIndex: 'id', readonly: true },
    {
      title: '姓名',
      dataIndex: 'name',
      type: IFormComTypeEnum.Input,
      rules: [{ message: '姓名不能为空', required: true }],
      isFilter: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      type: IFormComTypeEnum.InputNumber,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.age - b.age,
        multiple: 3,
      },
    },
    { title: '地址', dataIndex: 'address', type: IFormComTypeEnum.Input },
    {
      title: '职位',
      dataIndex: 'title',
      type: IFormComTypeEnum.Select,
      isFilter: true,
      rules: [{ message: '职位不能为空', required: true }],
      options: [
        { label: 'CTO', value: 'cto' },
        { label: 'COO', value: 'coo' },
        { label: 'CFO', value: 'cfo' },
      ],
    },
  ],
};

export default function IndexPage() {
  return <FCrud {...demoTable} />;
}
