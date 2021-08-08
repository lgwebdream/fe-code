import React from 'react';
import { Form } from 'antd';
import type { IFormProps } from './FormTypes';
import { findComByName } from './formUtils';
import { ICrudColumn } from '../CrudTypes';

const { Item } = Form;

const formatColumn = (column: ICrudColumn<unknown>) => {
  const item = { ...column };
  delete item.dataIndex;
  delete item.itemProps;
  delete item.fieldProps;
  return item;
};
export interface IFFormProps extends IFormProps {
  schema: ICrudColumn[];
  children?: React.ReactNode;
}

const FForm: React.FC<IFFormProps> = (props: IFFormProps) => {
  const { schema, children } = props;
  return (
    <Form {...props}>
      {schema?.map(item => {
        const { type, fieldProps, itemProps } = item;
        const FComponent = findComByName(type);

        if (!FComponent) return null;

        const temp = formatColumn(item);
        return (
          <Item
            label={item.title}
            name={item.dataIndex}
            {...temp}
            {...itemProps}
            key={`${item.dataIndex}`}
          >
            {/* TODO 完善更多表单 */}
            <FComponent placeholder={temp.title} {...temp} {...fieldProps} />
          </Item>
        );
      })}
      {children}
    </Form>
  );
};

export default FForm;
