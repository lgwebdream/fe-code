import { Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import FForm from '../Form';
import { ICrudModalProps } from './ModalTypes';

const FCrudModal = (props: ICrudModalProps): React.ReactElement => {
  const { data, columns, onOk, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [isInit, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (!isInit) return;

    if (visible) {
      form?.setFieldsValue(data);
    } else {
      form?.resetFields();
    }
  }, [data, visible]);

  return (
    <Modal
      okText="确定"
      cancelText="取消"
      {...props}
      onOk={() => {
        form.validateFields().then(() => {
          onOk && onOk({ ...form.getFieldsValue() });
        });
      }}
      onCancel={e => {
        onCancel && onCancel(e);
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
