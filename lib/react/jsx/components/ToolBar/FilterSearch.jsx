import classnames from 'classnames';
import { Form, Button } from 'antd';
import React, { useMemo } from 'react';
import { getClassName } from './utils';
import FForm from '../Form/index';

const { useForm } = Form;
const FilterSearch = props => {
  const [formInstance] = useForm();
  const { columns, style, className, prefixCls, render, onSearch, onReset } =
    props;
  const nextClassName = classnames(
    getClassName('filter-search', prefixCls),
    className,
  );
  const nextStyle = useMemo(
    () => ({
      marginBottom: 10,
      ...(style || {}),
    }),
    [],
  );
  const onResetClick = () => {
    formInstance.resetFields();
    onReset?.();
  };
  const onSearchClick = async () => {
    const flag = await formInstance.validateFields();
    flag && onSearch?.(formInstance.getFieldsValue());
  };
  return (
    <div className={nextClassName} style={nextStyle}>
      {render ? (
        render()
      ) : (
        <>
          {columns.length ? (
            <FForm form={formInstance} layout="inline" schema={columns}>
              <Form.Item>
                <Button onClick={onResetClick}>重置</Button>
                <Button type="primary" onClick={onSearchClick}>
                  搜索
                </Button>
              </Form.Item>
            </FForm>
          ) : null}
        </>
      )}
    </div>
  );
};
export default FilterSearch;
