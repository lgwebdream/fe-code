import { Form, Modal } from 'antd';
import React, { useEffect } from 'react';
import FForm from '../Form';
import { ICrudModalProps } from './Modal.d';

const FCrudModal = (props: ICrudModalProps): React.ReactElement => {
  const { data, columns, onOk } = props;
  const [form] = Form.useForm();

  useEffect(() => {}, [data]);

  return (
    <Modal
      okText="确定"
      cancelText="取消"
      {...props}
      onOk={() => {
        form.validateFields().then(() => {
          onOk && onOk(form.getFieldsValue());
        });
      }}
    >
      <FForm
        form={form}
        labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
        schema={columns}
      />
    </Modal>
  );
};

export default FCrudModal;