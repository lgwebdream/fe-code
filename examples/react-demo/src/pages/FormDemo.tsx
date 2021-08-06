import { Alert, Button, Form } from 'antd';
import { FCrud, IFormComTypeEnum } from '@crud/components/index';

export default function FormDemo() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('values', values);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div style={{ width: 500 }}>
      <Alert message="1. 基本使用" type="success" />
      <FCrud.Form
        {...{
          onFinish,
          form,
          ...formItemLayout,
        }}
        schema={[
          {
            title: 'Input',
            dataIndex: 'Input',
            type: IFormComTypeEnum.Input,
            rules: [{ message: '姓名不能为空', required: true }],
          },
          {
            title: 'InputNumber',
            dataIndex: 'InputNumber',
            type: IFormComTypeEnum.InputNumber,
          },
          { title: '地址', dataIndex: 'address', type: IFormComTypeEnum.Input },
          {
            title: 'Select',
            dataIndex: 'Select',
            type: IFormComTypeEnum.Select,
            fieldProps: {
              options: [
                { label: 'CTO', value: 'cto' },
                { label: 'COO', value: 'coo' },
                { label: 'CFO', value: 'cfo' },
              ],
            },
            itemProps: {
              rules: [{ message: '职位不能为空', required: true }],
            }
          },
          {
            title: 'RadioGroup',
            dataIndex: 'RadioGroup',
            type: IFormComTypeEnum.RadioGroup,
            fieldProps: {
              options: [
                { label: '大', value: '大' },
                { label: '中', value: '中' },
                { label: '小', value: '小' },
              ],
            }
          },
          {
            title: 'TreeSelect',
            dataIndex: 'TreeSelect',
            type: IFormComTypeEnum.TreeSelect,
            fieldProps: {
              treeData:
                [
                  { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                ]
            }
          },
          {
            title: 'Cascader',
            dataIndex: 'Cascader',
            type: IFormComTypeEnum.Cascader,
            fieldProps: {
              options: [
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                    },
                  ],
                },
              ]
            }
          },
          {
            title: 'DatePicker',
            dataIndex: 'DatePicker',
            type: IFormComTypeEnum.DatePicker,
          },
          {
            title: 'Switch',
            dataIndex: 'Switch',
            type: IFormComTypeEnum.Switch,
          },
          {
            title: 'Slider',
            dataIndex: 'Slider',
            type: IFormComTypeEnum.Slider,
          }, {
            title: 'Rate',
            dataIndex: 'Rate',
            type: IFormComTypeEnum.Rate,
          }, {
            title: 'CheckboxGroup',
            dataIndex: 'CheckboxGroup',
            type: IFormComTypeEnum.CheckboxGroup,
            fieldProps: {
              options: [
                { label: '大', value: '大' },
                { label: '中', value: '中' },
                { label: '小', value: '小' },
              ],
            }
          },
          {
            title: 'Checkbox',
            dataIndex: 'Checkbox',
            type: IFormComTypeEnum.Checkbox,
          },
        ]}
      />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </div>
  );
}
