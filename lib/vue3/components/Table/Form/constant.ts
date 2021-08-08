// 支持的组件类型
export enum IFormComTypeEnum {
  Input = 'Input',
  InputNumber = 'InputNumber',
  Select = 'Select',
  DatePicker = 'DatePicker', // 日期选择器
  TimePicker = 'TimePicker', // 时间选择框
  RadioGroup = 'RadioGroup', // 单选框
  TreeSelect = 'TreeSelect',
  Cascader = 'Cascader',
  Switch = 'Switch',
  CheckboxGroup = 'CheckboxGroup',
  Slider = 'Slider',
  Rate = 'Rate',
  Checkbox = 'Checkbox',
}

/** 表单类型 */
export interface FormType {
  Input: IFormComTypeEnum.Input;
  InputNumber: IFormComTypeEnum.InputNumber;
  Select: IFormComTypeEnum.Select;
  DatePicker: IFormComTypeEnum.DatePicker;
  TimePicker: IFormComTypeEnum.TimePicker;
  RadioGroup: IFormComTypeEnum.RadioGroup;
  TreeSelect: IFormComTypeEnum.TreeSelect;
  Cascader: IFormComTypeEnum.Cascader;
  Switch: IFormComTypeEnum.Switch;
  CheckboxGroup: IFormComTypeEnum.CheckboxGroup;
  Slider: IFormComTypeEnum.Slider;
  Rate: IFormComTypeEnum.Rate;
  Checkbox: IFormComTypeEnum.Checkbox;
}

export interface IFormData {
  [key: string]: any;
}
