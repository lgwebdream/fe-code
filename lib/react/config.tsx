import React from 'react';
import {
  ICrud,
  ICrudFormTypeEnum,
  ICurdContainerTypeEnum,
  ICrudOperationTypeEnum,
} from './index.d';

const apiConfig = {
  add: '/mock/json/add',
  edit: '/mock/json/edit',
  delete: '/mock/json/delete',
  export: '/mock/json/export',
  list: '/mock/json/list',
};

export default memberCrudConfig;

// 人员管理配置中心
export const memberCrudConfig: Array<ICrud<{
  name: string;
  ang: number;
  title: string;
}>> = [
    {
      type: 'page',
      title: '人员管理',
      body: {
        batchOperations: [
          {
            label: '添加',
            operationType: ICrudOperationTypeEnum.Add,
            config: { url: apiConfig.add },
          },
          {
            label: '导出',
            operationType: ICrudOperationTypeEnum.Delete,
            config: { url: apiConfig.export },
          },
          {
            label: '删除',
            operationType: ICrudOperationTypeEnum.Export,
            config: { url: apiConfig.delete },
          },
          {
            render: row => {
              console.log(row);
              return <div>批量操作</div>;
            },
          },
        ],
        rowOperations: [
          {
            label: '编辑',
            operationType: ICrudOperationTypeEnum.Edit,
            config: { url: apiConfig.edit },
          },
          {
            render: row => {
              console.log(row);
              return <div>行级操作</div>;
            },
          },
        ],
        fields: [
          { label: 'ID', dataIndex: 'id', readonly: true },
          {
            label: '姓名',
            dataIndex: 'name',
            type: ICrudFormTypeEnum.Text,
            rules: [{ message: '姓名不能为空', required: true }],
            isFilter: true,
          },
          { label: '年龄', dataIndex: 'age', type: ICrudFormTypeEnum.Number },
          {
            label: '职位',
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
        listConfig: {
          primaryKey: 'id',
          url: apiConfig.list,
        },
        containerType: ICurdContainerTypeEnum.Modal,
      }
    }
  ]
