import {
    ICrud,
    ICurdFromItemTypeEnum,
    ICrudToolbarTypeEnum,
  } from '../CrudTypes';
  
  import axios from 'axios';
  
  
  const apiConfig = '{crud.apiConfig}'
  
  
  const TableProps: ICrud = {
    title:'{crud.title}',
    columns: [
      { dataIndex: 'date', title: '日期', readonly: true },
      { dataIndex: 'name', title: '姓名' },
      { dataIndex: 'address', title: '地址' },
    ],
    // @ts-ignore
    request: async params => { return axios.get(apiConfig.list, { params });},
    // @ts-ignore
    batchToolbar: '{crud.batchToolbar}',
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
  