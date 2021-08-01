import React from 'react';
import { Form } from 'antd';
import { findComByName } from './formUtils';

const { Item } = Form;
const formatColumn = column => {
  const item = { ...column };
  delete item.dataIndex;
  return item;
};
const FForm = props => {
  const { schema, children } = props;
  return (
    <Form {...props}>
      {schema?.map(item => {
        const { type } = item;
        const FComponent = findComByName(type);
        if (!FComponent) return null;
        const temp = formatColumn(item);
        return (
          <Item
            label={item.title}
            name={item.dataIndex}
            {...temp}
            key={`${item.dataIndex}`}
          >
            {/* TODO 完善更多表单 */}
            <FComponent placeholder={temp.title} {...temp} />
          </Item>
        );
      })}
      {children}
    </Form>
  );
};
export default FForm;
