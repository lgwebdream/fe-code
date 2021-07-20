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
  return (
    <Form {...formProps}>
      {schema.map(item => {
        const { itemProps, comType, comProps } = item;
        const FComponent = findComByName(comType);
        if (!FComponent) {
          return null;
        }
        if (!item?.itemProps?.isList) {
          return (
            <Item {...itemProps} key={itemProps.id || itemProps.key}>
              <FComponent {...comProps} />
            </Item>
          );
        }
        return null;
      })}
    </Form>
  );
};

export default FForm;
