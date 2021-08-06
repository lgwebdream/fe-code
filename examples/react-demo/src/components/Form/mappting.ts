import {
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Radio,
  TreeSelect,
  Cascader,
  Checkbox,
  Slider,
  Rate,
} from 'antd';
import { IFormComTypeEnum } from './constant';
import FCheckbox from './form-components/f-checkbox';
import FSwitch from './form-components/f-switch';

const Mapping = {
  [IFormComTypeEnum.Input]: Input,
  [IFormComTypeEnum.InputNumber]: InputNumber,
  [IFormComTypeEnum.Select]: Select,
  [IFormComTypeEnum.DatePicker]: DatePicker, // 日期选择器
  [IFormComTypeEnum.TimePicker]: TimePicker, // 时间选择框
  [IFormComTypeEnum.RadioGroup]: Radio.Group, // 单选
  [IFormComTypeEnum.TreeSelect]: TreeSelect,
  [IFormComTypeEnum.Cascader]: Cascader,
  [IFormComTypeEnum.Switch]: FSwitch,
  [IFormComTypeEnum.CheckboxGroup]: Checkbox.Group,
  [IFormComTypeEnum.Slider]: Slider,
  [IFormComTypeEnum.Rate]: Rate,
  [IFormComTypeEnum.Checkbox]: FCheckbox,
};

export default Mapping;
