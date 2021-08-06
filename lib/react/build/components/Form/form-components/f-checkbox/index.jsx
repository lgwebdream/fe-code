import React from 'react';
import { Checkbox } from 'antd';
export default function FCheckbox(props) {
    const { value, onChange, ...rest } = props;
    const onCheckboxChange = (e) => {
        onChange(e.target.checked);
    };
    return <Checkbox checked={value} onChange={onCheckboxChange} {...rest}/>;
}
