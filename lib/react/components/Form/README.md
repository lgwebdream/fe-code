## form 支持组件

```js
export enum IFormComTypeEnum {
  Input = 'Input',
  InputNumber = 'InputNumber',
  Select = 'Select',
  DatePicker = 'DatePicker', // 日期选择器
  TimePicker = 'TimePicker', //时间选择框
  List = 'FormList'
}
```

## FormRender 入参

```js
{
    layout: '',
    initialValues: '',
    onValuesChange: '',
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}
```

## form schema数据格式

```js
    export const schema = [
        {
            comType: IFormComTypeEnum.Input,
            comProps: {

            },
            itemProps: {
                name: "email",
                label: "E-mail",
                rules: [
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!'
                    }
                ]
            }
        },
    ]

```


## FSelect (TODO)

- 支持动态Options
