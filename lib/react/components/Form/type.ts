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

export interface IFormItemProps extends FormItemProps {
  // TODO
  isList?: boolean; // 是否是List
  // TODO
  visibleOn?: string; // 显示联动
  key?: string; // 唯一值
}

export { IFormComTypeEnum };

export interface IFormSchema {
  comType: IFormComTypeEnum;
  comProps?:
    | InputProps
    | InputNumberProps
    | SelectProps<any>
    | DatePickerProps
    | TimePickerProps;
  itemProps?: IFormItemProps;
}

export type IFormProps = FormProps;
