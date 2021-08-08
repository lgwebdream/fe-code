import axios from 'axios';
import { ICrud, ICurdFromItemTypeEnum } from '../../CrudTypes';
import TablePropsBase from '../config';

const apiConfig = {
  add: '/api/json/add',
  edit: '/api/json/edit',
  delete: '/api/json/delete',
  list: '/api/json/list',
};

const TableProps: ICrud = {
  ...TablePropsBase,
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

export default TableProps;
