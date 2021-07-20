import React from 'react';

import { Form } from 'antd'
import { IFormProps, IFormSchema } from './type';
import { findComByName } from './formUtils';

const Item = Form.Item

export interface IFFormProps {
  formProps: IFormProps,
  schema: IFormSchema[]
}

const FForm = (
  props: IFFormProps
) => {
  const { formProps, schema } = props
  return (
    <Form
      {...formProps}
    >
      {schema.map(item => {
        const { itemProps, comType, comProps } = item
        const FComponent = findComByName(comType)

        if (!item.itemProps.isList) {
          return <Item {...itemProps}>
            {FComponent && <FComponent {...comProps} />}
          </Item>
        } else {
          return null
        }
      })}
    </Form>
  );
};

export default FForm;