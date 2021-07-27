import { Input, InputNumber, Select, DatePicker, TimePicker } from 'antd';
import { IFormComTypeEnum } from './constant';
const Mapping = {
    [IFormComTypeEnum.Input]: Input,
    [IFormComTypeEnum.InputNumber]: InputNumber,
    [IFormComTypeEnum.Select]: Select,
    [IFormComTypeEnum.DatePicker]: DatePicker,
    [IFormComTypeEnum.TimePicker]: TimePicker, // 时间选择框
};
export default Mapping;
