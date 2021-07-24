import {
  FormProps,
  FormItemProps,
  InputProps,
  InputNumberProps,
  SelectProps,
  DatePickerProps,
  TimePickerProps,
} from 'antd';
import { IFormComTypeEnum } from './constant';

export { IFormComTypeEnum };

export interface IFormItemProps extends FormItemProps {
  // TODO
  isList?: boolean; // 是否是List
  // TODO
  visibleOn?: string; // 显示联动
  key?: string; // 唯一值
}

export type IFormComponentProps =
  | InputProps
  | InputNumberProps
  | SelectProps<any>
  | DatePickerProps
  | TimePickerProps;

export type IFormProps = FormProps;
