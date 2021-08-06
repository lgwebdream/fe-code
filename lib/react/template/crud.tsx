import React from 'react';
import { FCrud, ICrud, IFormComTypeEnum } from '../components/index';

const apiConfig = '{crud.apiConfig}';

const crudProps: ICrud = {
  title: '{crud.title}',
  // @ts-ignore
  containerType: '{crud.containerType}',
  tableProps: { size: 'middle' },
  request: params =>
    // @ts-ignore
    fetch(apiConfig.list, {
      method: 'get',
    }).then(res => res.json()),

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
    {
      title: '部门',
      dataIndex: 'department',
      type: IFormComTypeEnum.TreeSelect,
      fieldProps: {
        treeData: [
          {
            title: '营销',
            value: 'light',
            children: [{ title: '运营', value: 'bamboo' }],
          },
          {
            title: '企划',
            value: 'light2',
            children: [{ title: '业务', value: 'bamboo2' }],
          },
        ],
      },
    },
    {
      title: '积分',
      dataIndex: 'score',
      type: IFormComTypeEnum.Slider,
    },
    {
      title: '评级',
      dataIndex: 'level',
      type: IFormComTypeEnum.Rate,
    },
    {
      title: '映像',
      dataIndex: 'mapping',
      type: IFormComTypeEnum.RadioGroup,
      options: [
        { label: '优秀', value: '优秀' },
        { label: '良好', value: '良好' },
        { label: '差', value: '差' },
      ],
    },
    {
      isHide: true,
      title: '标签',
      dataIndex: 'tags',
      type: IFormComTypeEnum.CheckboxGroup,
      options: [
        { label: '外向', value: '外向' },
        { label: '善于沟通', value: '善于沟通' },
        { label: '脾气差', value: '脾气差' },
      ],
    },
    {
      title: '是否上榜',
      dataIndex: 'flag',
      type: IFormComTypeEnum.Switch,
      render: value => (value ? '是' : '否'),
    },
  ],
};

export default function Page() {
  return <FCrud {...crudProps} />;
}
