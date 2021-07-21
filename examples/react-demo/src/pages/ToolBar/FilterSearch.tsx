import classnames from 'classnames';
import { Form, Button, Input } from 'antd';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { getClassName } from './utils';
import type { FormElementOptions, FormItemType, SearchOptions } from './typing';

const { useForm } = Form;

export interface FilterSearchProps<T, VT> {
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  options?: SearchOptions<T, VT>;
}

const FilterSearch = <T extends Object, VT>(
  props: FilterSearchProps<T, VT>,
) => {
  const { selectedRowKeys, selectedRows, options } = props;

  const {
    columns = [],
    style,
    className,
    prefixCls,
    render,
    onSearch,
    onReset,
  } = options || {};

  const [formReactElement, setFormReactElement] = useState<ReactElement>();

  const [formInstance] = useForm();

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

  const dynamicRender = render?.({
    selectedRowKeys,
    selectedRows,
  });

  const getAntdFormElement = useCallback(
    (type: FormItemType, formElementOptions: FormElementOptions<VT>) => {
      switch (type) {
        case 'input':
          return <Input {...formElementOptions} />;
        default:
          return null;
      }
    },
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

  useEffect(() => {
    const elements = columns.map((column) => {
      const { type, options: formElementOptions, ...rest } = column;
      return (
        <Form.Item {...rest} key={rest.name}>
          {getAntdFormElement(type, formElementOptions)}
        </Form.Item>
      );
    });
    elements.push(
      <Form.Item key="operation">
        <Button onClick={onResetClick}>重置</Button>
        <Button type="primary" onClick={onSearchClick}>
          搜索
        </Button>
      </Form.Item>,
    );
    setFormReactElement(
      <Form layout="inline" form={formInstance}>
        {elements}
      </Form>,
    );
  }, [columns, onReset, onSearch]);

  return (
    <div className={nextClassName} style={nextStyle}>
      {dynamicRender || formReactElement}
    </div>
  );
};

export default FilterSearch;
