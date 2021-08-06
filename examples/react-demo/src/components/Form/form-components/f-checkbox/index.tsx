import React from 'react';
import { Checkbox } from 'antd';

interface IFCheckboxProps {
  onChange: (value: boolean) => void;
  value: boolean;
  [key: string]: any;
}

export default function FCheckbox(props: IFCheckboxProps) {
  const { value, onChange, ...rest } = props;

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    onChange(e.target.checked);
  };

  return <Checkbox checked={value} onChange={onCheckboxChange} {...rest} />;
}
