import { Input, InputNumber, Select, DatePicker, TimePicker } from 'antd';
import { IFormComTypeEnum } from './constant';

const Mapping = {
  [IFormComTypeEnum.Input]: Input,
  [IFormComTypeEnum.InputNumber]: InputNumber,
  [IFormComTypeEnum.Select]: Select,
  [IFormComTypeEnum.DatePicker]: DatePicker, // 日期选择器
  [IFormComTypeEnum.TimePicker]: TimePicker, // 时间选择框
};

export default Mapping;
