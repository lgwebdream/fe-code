
import {
  ICrud,
  ICurdFromItemTypeEnum,
  ICrudToolbarTypeEnum,
} from '../CrudTypes';

import axios from 'axios';


const apiConfig = {'list':'/api/json/list','add':'/api/json/add','edit':'/api/json/edit','delete':'/api/json/delete','batchDelete':'/api/json/delete'}


const TableProps: ICrud = {
  title:'标题',
  columns: [
    { dataIndex: 'date', title: '日期', readonly: true },
    { dataIndex: 'name', title: '姓名' },
    { dataIndex: 'address', title: '地址' },
  ],
  
  request: async params => { return axios.get(apiConfig.list, { params })},
  
  batchToolbar: [{
    label: '添加',
    type: 'primary',
    toolbarType: ICrudToolbarTypeEnum.Add,
    request: (row) =>
    axios(apiConfig.add, { method: 'post', data: row }).then(() => {
      
    }),
  },{
    label: '删除',
    type: 'link',
    toolbarType: ICrudToolbarTypeEnum.Delete,
    request: (row) =>
    axios(apiConfig.delete, { method: 'post', data: row }).then(() => {
      
      }),
  },{
    label: '批量删除',
    type: 'dashed',
    toolbarType: ICrudToolbarTypeEnum.DeleteBatch,
    request: (row) =>
    axios(apiConfig.delete, { method: 'post', data: row }).then(() => {
      
      }),
  }],
  searchConfigs: [
    {
      type: ICurdFromItemTypeEnum.Input,
      label: '审批人',
      value: '',
      prop: 'user',
      placeholder: '审批人',
    },
    {
      type: ICurdFromItemTypeEnum.Select,
      label: '活动区域',
      value: '',
      prop: 'region',
      placeholder: '活动区域',
      data: [
        {
          label: '上海',
          value: 'shanghai',
        },
        {
          label: '北京',
          value: 'beijing',
        },
      ],
    },
  ],
};



export default TableProps
