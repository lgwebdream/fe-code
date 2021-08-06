import React from 'react';
import { Switch } from 'antd';
export default function FSwitch(props) {
    const { value, onChange, ...rest } = props;
    const onSwitchChange = (e) => {
        onChange(e);
    };
    return <Switch checked={value} onChange={onSwitchChange} {...rest}/>;
}
