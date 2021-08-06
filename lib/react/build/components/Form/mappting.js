import { Input, InputNumber, Select, DatePicker, TimePicker, Radio, TreeSelect, Cascader, Checkbox, Slider, Rate, } from 'antd';
import { IFormComTypeEnum } from './constant';
import FCheckbox from './form-components/f-checkbox';
import FSwitch from './form-components/f-switch';
const Mapping = {
    [IFormComTypeEnum.Input]: Input,
    [IFormComTypeEnum.InputNumber]: InputNumber,
    [IFormComTypeEnum.Select]: Select,
    [IFormComTypeEnum.DatePicker]: DatePicker,
    [IFormComTypeEnum.TimePicker]: TimePicker,
    [IFormComTypeEnum.RadioGroup]: Radio.Group,
    [IFormComTypeEnum.TreeSelect]: TreeSelect,
    [IFormComTypeEnum.Cascader]: Cascader,
    [IFormComTypeEnum.Switch]: FSwitch,
    [IFormComTypeEnum.CheckboxGroup]: Checkbox.Group,
    [IFormComTypeEnum.Slider]: Slider,
    [IFormComTypeEnum.Rate]: Rate,
    [IFormComTypeEnum.Checkbox]: FCheckbox,
};
export default Mapping;
