import React from 'react';

import { Form } from 'antd';
import { IFormProps, IFormSchema } from './type';
import { findComByName } from './formUtils';

const { Item } = Form;

export interface IFFormProps {
  formProps: IFormProps;
  schema: IFormSchema[];
}

const FForm: React.FC<IFFormProps> = (props: IFFormProps) => {
  const { formProps, schema } = props;
  const [form] = Form.useForm();

  return (
    <Form {...formProps} form={form}>
      {schema.map(item => {
        const { itemProps, comType, comProps } = item;
        const FComponent = findComByName(comType);

        if (!item.itemProps.isList) {
          return (
            <Item {...itemProps}>
              {FComponent && <FComponent {...comProps} />}
            </Item>
          );
        }
        return null;
      })}
    </Form>
  );
};

export default FForm;
