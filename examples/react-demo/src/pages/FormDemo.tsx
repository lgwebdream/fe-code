import { FForm } from '@fe-code/react';
import { IFormComTypeEnum } from '@fe-code/react/components/Form/constant';
import { Alert, Button, Form } from 'antd';

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
    <div style={{width: 500}}>
    <Alert message="1. 基本使用" type="success" />
      <FForm
        formProps={{
          onFinish,
          form,
          ...formItemLayout
        }}
        schema={[
          {
            comType: IFormComTypeEnum.Input,
            comProps: {},
            itemProps: {
              label: '姓名',
              required: true,
              name: 'name',
              rules: [{ required: true }],
            },
          },
          {
            comType: IFormComTypeEnum.Input,
            comProps: {},
            itemProps: {
              label: '密码',
              required: true,
              name: 'pass',
              rules: [{ required: true, message: 'Please input your password!' }],
            },
          },
        ]}
      />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={()=>{
          form.submit()
        }}>
          Submit
        </Button>
      </Form.Item>
    </div>
  );
}
