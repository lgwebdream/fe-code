import React from 'react';
// @ts-ignore
import request from 'umi-request';
import { FCrud, IFormComTypeEnum } from '../components/index';

const apiConfig = '{crud.apiConfig}';
const crudProps = {
  title: '{crud.title}',
  // @ts-ignore
  containerType: '{crud.containerType}',
  tableProps: { size: 'middle' },
  // @ts-ignore
  request: params => request(apiConfig.list, { method: 'post', data: params }),
  // @ts-ignore
  batchToolbar: '{crud.batchToolbar}',
  // @ts-ignore
  rowToolbar: '{crud.rowToolbar}',
  columns: [
    { title: 'ID', dataIndex: 'id', readonly: true },
    {
      title: '姓名',
      dataIndex: 'name',
      type: IFormComTypeEnum.Input,
      rules: [{ message: '姓名不能为空', required: true }],
      isFilter: true,
    },
    { title: '年龄', dataIndex: 'age', type: IFormComTypeEnum.InputNumber },
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
export default function Page() {
  return <FCrud {...crudProps} />;
}
