import React from 'react';
import { Switch } from 'antd';

interface IFSwitchProps {
  onChange: (value: boolean) => void;
  value: boolean;
  [key: string]: any;
}

export default function FSwitch(props: IFSwitchProps) {
  const { value, onChange, ...rest } = props;

  const onSwitchChange = (e: boolean) => {
    onChange(e);
  };

  return <Switch checked={value} onChange={onSwitchChange} {...rest} />;
}
