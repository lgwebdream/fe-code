import React from 'react';
import { Form } from 'antd';
import { findComByName } from './formUtils';
const { Item } = Form;
const formatColumn = (column) => {
    const item = { ...column };
    delete item.dataIndex;
    delete item.itemProps;
    delete item.fieldProps;
    return item;
};
const FForm = (props) => {
    const { schema, children } = props;
    return (<Form {...props}>
      {schema?.map(item => {
            const { type, fieldProps, itemProps } = item;
            const FComponent = findComByName(type);
            if (!FComponent)
                return null;
            const temp = formatColumn(item);
            return (<Item label={item.title} name={item.dataIndex} {...temp} {...itemProps} key={`${item.dataIndex}`}>
            {/* TODO 完善更多表单 */}
            <FComponent placeholder={temp.title} {...temp} {...fieldProps}/>
          </Item>);
        })}
      {children}
    </Form>);
};
export default FForm;
