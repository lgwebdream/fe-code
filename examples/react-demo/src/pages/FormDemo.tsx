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
          { title: 'ID', dataIndex: 'id', readonly: true },
          {
            title: '姓名',
            dataIndex: 'name',
            type: IFormComTypeEnum.Input,
            rules: [{ message: '姓名不能为空', required: true }],
          },
          {
            title: '年龄',
            dataIndex: 'age',
            type: IFormComTypeEnum.InputNumber,
          },
          { title: '地址', dataIndex: 'address', type: IFormComTypeEnum.Input },
          {
            title: '职位',
            dataIndex: 'title',
            type: IFormComTypeEnum.Select,
            rules: [{ message: '职位不能为空', required: true }],
            options: [
              { label: 'CTO', value: 'cto' },
              { label: 'COO', value: 'coo' },
              { label: 'CFO', value: 'cfo' },
            ],
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
